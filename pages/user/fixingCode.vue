<template>
	<view>
		<view v-for="it in 6" @tap="topage" class="cu-form-group" style="background-color: #FFF;padding: 24rpx;margin: 24rpx;border-radius: 12rpx;">
			<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg);"></view>
			<view  style="flex:1;display: flex;flex-direction:column;padding-left: 12rpx;">
				<view style="flex: 1;">
					<view class="">淘宝特价版</view>					
				</view>
				<view class="text-gray"> 
					<view class="">固定抢单码</view>
				</view>
			</view>
			<view class="action">
				<button class='cu-btn bg-green shadow'>查看</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		methods:{
			topage(){
				uni.navigateTo({
					url:'/pages/user/fixingCodeInfo'
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		height: 100Vh;
		width: 100vw;
	}
	
	.page.show {
		overflow: hidden;
	}
</style>
