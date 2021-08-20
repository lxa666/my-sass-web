<template>
	<view style="padding: 24rpx;">
		<view class="cu-bar bg-white solid-bottom bg-gradual-blue radius">
			<view class="action">
				您的余额：0.00元
			</view>
		</view>
		<view>
			<view class="margin-top cu-form-group  radius">
				<view class="title">提现金额</view>
				<input v-model="tradeMoney" placeholder="输入提现金额" type="number" name="input"></input>
			</view>
			<!-- <view class="margin-top cu-form-group radius">
				<view class="title">支付宝账号</view>
				<input placeholder="收款支付宝账号" name="input"></input>
			</view> -->
		</view>
		
		<!-- <view class="margin-top cu-bar bg-white solid-bottom  radius">
			<view class="action">
				手续费：--元，到账：--元
			</view>
		</view> -->
		
		<button @tap="postcashout" class="cu-btn block bg-green margin-tb-sm lg">
			提交</button>
		
		<view class="margin-top" style="line-height: 60rpx;font-size: 1em;padding: 24rpx;">		
			<view style="color: #e54d42;">				
				<p>1、支付宝姓名和账户不匹配将无法到账</p>
				<p>2、提款手续费1%，最低收取手续费1元</p>
				<p>3、单笔最低申请提款金额为10元</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tradeMoney:''
			}
		},
		methods:{
			postcashout(){
				this.api.postcashout({
					data:{
						tradeMoney:this.tradeMoney
					},
					success:(res)=>{
						console.log(res)
					}				
				})
			}
		}
	}
</script>

<style>
</style>
