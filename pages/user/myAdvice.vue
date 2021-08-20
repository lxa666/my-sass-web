<template>
	<view style="padding:30rpx 20rpx 40rpx">
		<button @tap="showAdvice" class="margin-bottom text-white text-bold"
			style="background: rgb(255, 87, 51);border-radius: 60rpx;">我要反馈</button>
		<view v-if="adviceList.length">
			<view v-for="(item,index) in adviceList" :key="index" class="bg-white padding margin-bottom"
				style="border-radius: 20rpx;">
				<view class="flex" style="line-height: 42rpx;">
					<text class="text-bold">反馈时间：</text><text class="text-cut" style="flex:1">{{item.createTime}}</text>
				</view>
				<view class="flex" style="line-height: 42rpx;">
					<text class="text-bold">反馈标题：</text><text class="" style="flex:1">{{item.opinionTitle}}</text>
				</view>
				<view class="flex" style="line-height: 42rpx;">
					<text class="text-bold">反馈详情：</text><text class="" style="flex:1">{{item.opinionDetail}}</text>
				</view>
				<view class="flex" style="line-height: 42rpx;" v-if="item.opinionReply">
					<text class="text-bold " style="color: rgb(255, 87, 51)">反馈结果：</text><text class=""
						style="flex:1">{{item.opinionReply}}</text>
				</view>
				<view class="text-center color" style="line-height: 36rpx;" v-if="!item.opinionReply">
					<text class="cuIcon-service" style="padding-right: 10rpx;font-size: 36rpx;"></text>等待客服回复
				</view>
			</view>
		</view>
		<view v-else class="text-bold text-center text-xl" style="margin-top:50vh">
			暂无记录
		</view>

		<advice @rf="getList"></advice>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
	} from 'vuex';
	import advice from "./components/advice.vue"
	export default {
		data() {
			return {
				adviceList: []
			};
		},
		components: {
			advice
		},
		onLoad() {
			this.getList()
		},
		onPullDownRefresh(){
			this.getList()
			uni.stopPullDownRefresh()
		},
		methods: {
			...mapMutations(['setadviceShow']),
			getList() {
				this.api.getOpinion({
					data: {},
					success: (ret) => {
						console.log(ret)
						if (ret.data.code == 200) {
							this.adviceList = ret.data.data.records
						} else {
							console.log('数据异常')
						}
					}
				})
			},
			showAdvice() {
				this.setadviceShow(true)
			},

		}
	}
</script>

<style lang="less">

</style>
