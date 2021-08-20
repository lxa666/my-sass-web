<template>
	<view>
		<view class="flex" style="margin-top:80rpx;align-items: center;justify-content: center;">
			<form @submit="formSubmit">
				<view class="cu-form-group form-item">
					<view class="title">手机号</view>
					<input type="number" placeholder="请输入手机号" name="mobile" v-model="mobile"></input>
					<text class='cuIcon-mobile text-orange'></text>
				</view>
				<view class="cu-form-group form-item">
					<view class="title">验证码</view>
					<input type="number" placeholder="请输入验证码" name="smscode"></input>
					<button @tap="getCode" class='cu-btn bg-green shadow' style="background: #FF5733;">
						{{smsCodeNum<120?smsCodeNum+' s':'验证码'}}</button>
				</view>
				<view class="cu-form-group form-item">
					<view class="title">密码</view>
					<input placeholder="请输入密码" name="password"></input>
					<text class='cuIcon-lock text-orange'></text>
				</view>
				<view class="cu-form-group form-item">
					<view class="title">确认密码</view>
					<input placeholder="请输入确认密码" name="password1"></input>
					<text class='cuIcon-lock text-orange'></text>
				</view>

				<button form-type="submit" style="border-radius: 60rpx;margin-top:40rpx;background: #FF5733;" class="margin-top cu-btn block bg-green margin-tb-sm lg lg-border">
					<text v-if="loading" class="cuIcon-loading2 cuIconfont-spin"></text>
					提交</button>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				mobile: '',
				codeUrl: '',
				codeKey: '',
				codeVal: '',

				initTime: 120, //间隔发送时间
				smsCodeNum: 0,
				time: '',
				errall:{
					mobile:'手机号',
					smscode:'验证码',
					password:'密码',
					password1:'确认密码'
				}
			}
		},
		computed: {
			...mapState({
				loading: state => state.publicStore.loading,
			})
		},
		created() {
			// this.smsCodeNum = this.initTime
			// if (uni.getStorageSync('smsCodeNum') && uni.getStorageSync('smsCodeNum') > 0) {
			// 	this.smsCodeNum = uni.getStorageSync('smsCodeNum')
			// 	this.smscodeInterval();
			// }			
			if (uni.getStorageSync('smsCodeNum') && uni.getStorageSync('smsCodeNum') > 0) {
				clearInterval(uni.getStorageSync('timeSetInterval'))
				this.smsCodeNum = uni.getStorageSync('smsCodeNum')
				this.smscodeInterval();
			}else{
				this.smsCodeNum = this.initTime
			}
		},
		beforeDestroy() {
			// clearInterval(this.time)
		},
		methods: {
			topage() {
				uni.navigateTo({
					url: '/pages/open/login'
				})
			},
			formSubmit(e) {
				let formdata = e.detail.value
				let err = false
				for (let i in formdata) {
					if (!formdata[i] && i !== 'promocode') {
						err = i;
					}
				}
				
				if (!err) {
					if (formdata.password != formdata.password1) {
						uni.showModal({
							title: '提交失败',
							content: `两次输入的密码不一致`,
							showCancel: false,
						});
						return
					}
					this.api.postPswReset({
						data: {
							...formdata,
						},
						success: (ret) => {
							if (ret.data.code == 200) {
								uni.showModal({
									title: '修改成功',
									content: `点击确定后前往登录页`,
									showCancel: false,
									success: (res) => {
										this.topage()
									}
								});
							} else {
								console.log('数据异常')
							}
						}
					})
				} else {
					uni.showModal({
						title: '提交失败',
						content: `${this.errall[err]}不可为空`,
						showCancel: false,
						success: (res) => {
				
						}
					});
				}
			},
			smscodeInterval() {
				let timeSetInterval = setInterval(() => {
					if (this.smsCodeNum === 0) {
						clearInterval(timeSetInterval)
						this.smsCodeNum = this.initTime;
						uni.removeStorageSync('smsCodeNum')
						uni.removeStorageSync('timeSetInterval')
					} else {
						this.smsCodeNum--;
						uni.setStorageSync('smsCodeNum', this.smsCodeNum)
					}
				}, 1000)
				uni.setStorageSync('timeSetInterval',timeSetInterval)
			},
			getCode() {
				if (!this.mobile) {
					uni.showToast({
						title: `手机号不能为空`,
						icon: 'none',
						duration: 3000
					});
					return;
				}

				if (this.time || this.smsCodeNum < this.initTime) {
					uni.showToast({
						title: `验证码已发送，请留意短信`,
						icon: 'none',
						duration: 3000
					});
					return;
				}

				this.api.postsmsreg({
					data: {
						phone: this.mobile,
						tenantId: this.tenantId
					},
					success: (ret) => {
						if (ret.data.code == 200) {
							this.smscodeInterval()
						}
					},
				})
			},
		}
	}
</script>

<style scoped>
	.form-item {
		margin-bottom: 20rpx;
		border-radius: 50rpx;
	}
</style>
