<template>
	<view style="padding: 30rpx;">
		<form @submit="formSubmit" @reset="formReset">
			<view v-if="!inviter" class="cu-form-group form-item">
				<view class="title">推荐码</view>
				<input placeholder="请输入推荐码" name="promocode"></input>
				<text class='cuIcon-share text-orange'></text>
			</view>
			<view class="cu-form-group form-item">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" name="username"></input>
				<text class='cuIcon-my text-orange'></text>
			</view>
			<view v-if="regionlist.length">
				<view class="cu-form-group form-item" style="border-radius: 100rpx;">
					<view class="title">省份</view>
					<picker mode="selector" @change="provinceNameChange" :value="provinceName" :range="regionlist" range-key="provinceName">
						<view>{{regionlist[provinceIndex].provinceName||'请选择省份'}}</view>
					</picker>
				</view>
				<view v-if="provinceName">
					<view class="cu-form-group form-item" style="border-radius: 100rpx;">
						<view class="title">城市</view>
						<picker mode="selector" @change="cityNameChange" :value="index" :range="regionlist[provinceIndex].children"
						 range-key="cityName">
							<view>{{regionlist[provinceIndex].children[cityIndex].cityName||'请选择城市'}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="cu-form-group form-item">
				<view class="title">手机号</view>
				<input type="number" placeholder="请输入手机号" name="mobile" v-model="mobile"></input>
				<text class='cuIcon-mobile text-orange'></text>
			</view>
			<view class="cu-form-group form-item">
				<view class="title">验证码</view>
				<input type="number" placeholder="请输入验证码" name="smscode"></input>
				<CodeTime :mobile='mobile'/>
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
			<button form-type="submit" class="margin-top cu-btn block margin-tb-sm lg text-white" style="background: #FF5733;">
				<text v-if="loading" class="cuIcon-loading2 cuIconfont-spin"></text>
				提交</button>
		</form>


		<view style="color: #FF5733;" @tap="topage('/pages/open/login')">
			已有账号？前往登录
		</view>
	</view>
</template>

<script>
	import Base64 from "@/common/base64.js"
	import {address} from "@/common/address.js"
	import CodeTime from '../component/CodeTime.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components:{
			CodeTime
		},
		data() {
			return {
				address,
				inviter: '', //邀请人
				mobile: '',
				codeUrl: '',
				codeKey: '',
				codeVal: '',
				regionlist: [],
				index: 0,
				provinceIndex: 0, //省下标
				cityIndex: 0,
				districtIndex: 0,
				provinceName: '',
				cityName: '',
				districtName: '',

				errall: {
					username: '姓名',
					mobile: '手机号',
					smscode: '验证码',
					password: '密码',
					password1: '确认密码'
				}
			}
		},
		computed: {
			...mapState({
				loading: state => state.publicStore.loading,
			})
		},
		created() {},
		beforeDestroy() {},
		onLoad(e) {
			if (e.inviter) {
				uni.setStorageSync('inviter', e.inviter)
				this.inviter = e.inviter;
			} else {
				this.inviter = uni.getStorageSync('inviter') || '';
			}
		},
		onShow() {
			console.log('address',address)
			if(!this.regionlist.length){
				this.regionlist = [...this.address];
			}
		},
		methods: {
			topage(url) {
				uni.navigateTo({
					url: url
				})
			},
			formSubmit: function(e) {
				let formdata = e.detail.value
				formdata.tenantId = this.tenantId
				console.log(formdata, this.provinceName, this.cityName)
				if (this.inviter) {
					uni.setStorageSync('inviter', this.inviter)
					formdata.promocode = this.inviter;
				}

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
					if (!this.provinceName || !this.cityName || this.cityName=='请选择城市') {
						uni.showModal({
							title: '提交失败',
							content: `请选择省份/城市`,
							showCancel: false,
						});
						return
					}
					this.api.postregist({
						header: {
							'Authorization': `Basic ${Base64.encode(`miniapp:miniapp_secret`)}`,
							'Captcha-Code': this.codeVal,
							'Captcha-Key': this.codeKey,
						},
						data: {
							...formdata,
							region: `${this.provinceName}-${this.cityName}`
						},
						success: (ret) => {
							if (ret.data.code == 200) {
								this.topage('/pages/open/code')
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
			formReset: function(e) {
				console.log('清空数据')
			},
			provinceNameChange(e) {
				this.provinceIndex = e.detail.value
				this.provinceName = this.regionlist[e.detail.value].provinceName
				let obj = {
					cityName: '请选择城市',
					children: [{
						districtName: '请选择地区'
					}]
				}
				if(this.regionlist[this.provinceIndex].children[0].cityName!='请选择城市'){
					this.regionlist[this.provinceIndex].children.unshift(obj)
				}
				this.cityIndex = 0
				this.cityName = ''
				this.districtIndex = 0
				this.districtName = ''
			},
			cityNameChange(e) {
				this.cityIndex = e.detail.value
				let cityData = this.regionlist[this.provinceIndex].children[e.detail.value]
				this.cityName = cityData.cityName
				if(cityData.children[0].districtName!='请选择地区'){
					cityData.children.unshift({
						districtName: '请选择地区'
					})
				}	
				this.districtIndex = 0
				this.districtName = ''
			},
			districtNameChange(e) {
				this.districtIndex = e.detail.value
				this.districtName = this.regionlist[this.provinceIndex].children[this.cityIndex].children[e.detail.value].districtName
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
