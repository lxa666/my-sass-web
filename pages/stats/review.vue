<template>
	<view style="text-align: center;display: flex;align-items: center;justify-content: center;margin-top: 300rpx;">
		<view v-if="index==1">
			<view style="width: 600rpx;min-height: 400rpx;background-color: #FFF;border-radius: 12rpx;">
				<view style="padding-top: 70rpx;">
					<text class="cuIcon-info" style="font-size: 96rpx;color: #2a82e4;"></text>
				</view>
				<view class="margin-top" style="font-size: 36rpx;color: #000;">
					<view>已成功提交信息</view>
					<view>正在审核中</view>
				</view>
				<view class="margin-top" style="color:#a6a6a6;font-size: 28rpx;">
					预计30分钟审核完成
				</view>
			</view>
			<button @tap="topageTab('/pages/stats/index')" style="margin-top: 48rpx;" class="cu-btn block bg-blue margin-tb-sm lg">
				立即返回</button>
		</view>
		<view v-if="index==2">
			<view style="width: 600rpx;min-height: 450rpx;background-color: #FFF;border-radius: 12rpx;">				
				<view style="font-size: 36rpx;font-weight: bold;color: #000;padding-top: 30rpx;">
					<view>认证失败</view>
				</view>
				<view class="margin-top"  style="padding: 24rpx;">
					<view style="text-align: left;">
						请查看驳回原因，重新提交认证！
					</view>
					<view class="margin-top" style="min-height: 5em;background-color: #f0f5f6;;border-radius: 20rpx;text-align: left;padding: 12rpx;color: #FF5733;">
						{{remark}}
					</view>
				</view>
				<view  style="color:#a6a6a6;font-size: 28rpx;text-align: left;padding: 0 24rpx 24rpx;">
					常见问题及解决方法：<br />
					1、身份证格式错误：身份证号错误，请确认身份证号输入无误、若有字母请输入大写字母<br />
					2、银行卡格式错误：银行卡号号错误，请确认银行卡号输入无误<br />
					3、年龄不符合：请提交满18岁的认证资料，暂不支持向未成年人打款<br />
				</view>
			</view>
			<button @tap="topage('/pages/stats/idCard')" style="margin-top: 48rpx;" class="cu-btn block bg-blue margin-tb-sm lg">
				重新认证</button>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 1,
				remark:''
			}
		},
		onLoad(e) {
			this.index = e.index || 1
			if(e.remark){
				this.remark = e.remark
			}else{
				this.remark = ''
			}
		},
		methods: {
			topageTab(url) {
				uni.switchTab({
					url: url
				})
			},
			topage(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
</style>
