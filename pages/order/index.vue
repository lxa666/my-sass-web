<template>
	<view class="list">
		<view class="cu-list menu card-menu sm-border margin-top" v-for="item in list" :key="item.id" @tap="topage(item.id)">
			<view class="cu-item" :style="'background-image:url('+item.url+');'" style="background-size: 100% 100%;height: 180rpx;background-color: #f1f1f1;">
				<view class="content" style="display: flex;">
					<text style="padding-left: 300rpx;flex: 1;color: #FFF;font-size: 1.2rem;">{{item.status}}</text>
					<text style="display: inline-block;height: 24px;line-height: 24px;width: 60px;text-align: center;font-size: 14px;border-radius: 13px;border: none;outline: none;box-shadow: 0 3px 5px rgb(0 0 0 / 20%);background: linear-gradient(180deg, rgb(255, 255, 255), rgb(210, 237, 255));">
						{{item.title}}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const list = [{
			title: '查看',
			url: 'http://z.52laxin.top/peasant/resource/image/cate01.png',
			status: '进行中',
			id: 1
		},
		{
			title: '查看',
			url: 'http://z.52laxin.top/peasant/resource/image/cate02.png',
			status: '等待审核',
			id: 2
		},
		{
			title: '查看',
			url: 'http://z.52laxin.top/peasant/resource/image/cate03.png',
			status: '订单成功',
			id: 3
		},
		{
			title: '查看',
			url: 'http://z.52laxin.top/peasant/resource/image/cate04.png',
			status: '订单失败',
			id: 4
		},
		{
			title: '查询',
			url: 'http://z.52laxin.top/peasant/resource/image/cate05.png',
			status: '订单查询',
			id: 5
		}
	]
	export default {
		data() {
			return {
				list,
			}
		},
		methods:{
			topage(id){
				uni.navigateTo({
					url:`/pages/order/task?id=${id}`
				})
			}
		}
	}
</script>

<style scoped>

</style>
