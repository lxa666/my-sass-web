<template>
	<view style="">
		<view style="color: #ff0000;font-size: 28rpx;padding: 30rpx;line-height: 40rpx;">
			请保管好账号密码，若因帐户密码泄露造成的损失由用户自己承担，平台无责！
		</view>
		<view v-if="userInfo.certNo">
			<view class="cu-form-group  radius">
				<view class="title">真实姓名</view>
				<input style="color: ##808080;" v-model="userInfo.certName" disabled placeholder="" name="input"></input>
			</view>
			<view class="cu-form-group radius">
				<view class="title">身份证号</view>
				<input style="color: ##808080;" v-model="userInfo.certNo" disabled placeholder="" name="input"></input>
			</view>
			<view class="cu-form-group radius">
				<view class="title">银行卡号</view>
				<input style="color: ##808080;" v-model="userInfo.bankCardNo" disabled placeholder="" name="input"></input>
			</view>
			<view class="cu-form-group radius">
				<view class="title">预留手机号</view>
				<input style="color: ##808080;" v-model="userInfo.preMobile" disabled placeholder="" name="input"></input>
			</view>
		</view>
		<view v-else style="text-align: center;padding: 30rpx;">
			--暂无认证信息--
		</view>
		<view style="padding:24rpx">
			<button @tap="topage('/pages/stats/idCard')" class="cu-btn block bg-blue margin-tb-sm lg">
				更改绑定资料</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		created() {
			this.init();
		},
		methods: {
			topage(url) {
				uni.navigateTo({
					url: url
				})
			},
			init() {
				this.api.getsalarydetail({
					data: {},
					success: (res) => {
						console.log(333, res)
						this.userInfo = res.data.data
					}
				})
			}
		}
	}
</script>

<style>

</style>
