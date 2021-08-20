<template>
	<!-- 弃用 -->
	<view>
		<view class="cu-list menu-avatar" style="padding-right:12rpx;">
			<view @tap="activityInfo(item.id,item.activityEndtime)" v-for="(item,index) in activitylist" :key="item.id" class="cu-item">
				<view class="cu-avatar round lg" :style="`background-image:url(${item.brandLogo});`"></view>
				<view class="content">
					<view class="text-grey">{{item.activityName}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							{{item.activityDetail}}
						</view>
					</view>
				</view>
				<view class="" style="text-align: right;line-height: 1.6em;">
					<view class="text-grey text-xs" style="margin-right:-12rpx ;">
						<uniCountdown :time="endTime(item.activityEndtime)"></uniCountdown>
					</view>
					<view class="text-grey text-xs">
						<text class="cuIcon-price text-red  margin-right-xs"></text>￥{{switchB?item.highPrice:'--'}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				activitylist:[]
			}
		},
		created() {
			this.init()
		},
		methods:{
			init() {
				this.api.postactivitylist({
					success: (res) => {
						console.log(res)
						this.activitylist = res.data.data.records
					}
				})
			},
		}
	}
</script>

<style>
</style>
