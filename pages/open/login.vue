<template>
	<view style="padding:100rpx">
		<view style="display: flex;justify-content: center;">
			<view style="margin: 30rpx auto;display: inline-block;background: #fff;border-radius: 50%;">
				<image style="padding:60rpx 50rpx;width:300rpx;height:290rpx" src="../../static/user/logo.png"></image>
			</view>
		</view>
		<view class="flex" style="align-items: center;justify-content: center;">
			<form @submit="formSubmit" @reset="formReset">
				<view class="margin-top cu-form-group form-item">
					<view class="title">账号</view>
					<input type="number" placeholder="请输入注册手机号" name="mobile"></input>
					<!-- 	<text class='cuIcon-my text-red'></text> -->
				</view>
				<view class="margin-top cu-form-group form-item">
					<view class="title">密码</view>
					<input password placeholder="请输入密码" name="password"></input>
					<!-- <text class='cuIcon-lock text-orange'></text> -->
				</view>
				<!-- <view class="margin-top cu-form-group form-item">		
					<view @tap="getCode" style="width: 200rpx;height: 70rpx;">
						<image style="width: 200rpx;height: 70rpx;" :src="codeUrl"></image>
					</view>
					<input style="width: 6em;" placeholder="图片验证码" name="code"></input>
				</view> -->
				<button form-type="submit" style="border-radius: 60rpx;margin-top:40rpx;background: #FF5733;" class="margin-top cu-btn block bg-green margin-tb-sm lg lg-border">
					<text v-if="loading" class="cuIcon-loading2 cuIconfont-spin"></text>
					一键登录</button>
				<view style="margin-top:40rpx;text-align: center;color: #FF5733" @tap="topage('/pages/open/reg')">
					没有账号？前往注册
				</view>
				<view style="margin-top:40rpx;text-align: center;color: #FF5733" @tap="topage('/pages/user/resetPsw')">
					重置密码
				</view>
			</form>
		</view>

	</view>
</template>

<script>
	import Base64 from "@/common/base64.js"
	import md5 from 'js-md5'
	import WX from "@/common/getOpenId.js"
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		SERVER_URL
	} from "@/common/const.js"

	export default {
		data() {
			return {
				codeUrl: '../../static/tabbar/component_cur.png',
				codeKey: '',
				modalName: null,
			}
		},
		computed: {
			...mapState({
				loading: state => state.publicStore.loading,
			})
		},
		created() {

		},
		onShow() {
			var ua = window.navigator.userAgent;
			if (ua.indexOf("MicroMessenger") > 0) {
				WX.getWxCode((e) => {
					console.log('获取code')
				})
			}
		},
		methods: {
			...mapMutations(['setactivitylist']),
			topage(url) {
				uni.navigateTo({
					url: url
				})
			},
			getCode() {
				uni.request({
					url: `http://192.168.9.146:8080/blade-auth/oauth/captcha`,
					method: `GET`,
					data: {},
					header: {},
					success: (ret) => {
						if (ret.data.image) {
							this.codeUrl = ret.data.image
							this.codeKey = ret.data.key
						}
					},
				})
			},
			formSubmit(e) {
				let formdata = e.detail.value
				if (!formdata.password && !formdata.mobile) {
					uni.showToast({
						title: '账号、密码不可为空',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				formdata.password = md5(formdata.password)
				formdata.tenantId = this.tenantId

				let openId = uni.getStorageSync('openIdNew')
				if (openId) {
					formdata.openId = openId
				}

				this.api.postlogin({
					data: {
						...formdata
					},
					success: (ret) => {
						console.log("sss2", ret)
						if (ret.data.refresh_token) {
							this.setactivitylist([]);
							uni.setStorageSync(`refresh_token`, ret.data.refresh_token)
							uni.setStorageSync(`access_token`, ret.data.access_token)
							uni.setStorageSync('setUserLogin', formdata)
							uni.removeStorageSync('userdetail')
							uni.removeStorageSync('errNum'); //获取code判断
							uni.reLaunch({
								url: '/pages/index/index'
							})
						} else {
							uni.showToast({
								title: ret.data.error_description,
								icon: 'none',
								duration: 3000
							});
						}
					},
				})
			},
		}
	}
</script>

<style scoped>
	.form-item {
		border-radius: 60rpx;
		box-shadow: 0px 7px 7px 0px rgba(153, 153, 153, 0.1);
	}
</style>
