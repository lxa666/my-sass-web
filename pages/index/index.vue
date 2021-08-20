<template>
	<view style="">
		<HeadNotice ref="child" />
		<view style="padding:20rpx">
			<view style="display: flex;justify-content: space-between;flex-wrap: wrap;">
				<view v-for="(item,index) in activitylistFn" :key="index" class="text-center" style="padding:24rpx;width:46vw;background: #fff;border-radius: 20rpx;box-shadow: 0px 7px 7px 0px rgba(153, 153, 153, 0.1);">
					<view style="text-align: left;">
						<span style="font-style: italic;background-color: #d81e06;color: #FFF;padding: 2rpx 12rpx;font-size:22rpx;font-weight: 600;">
							热门
						</span>
					</view>
					<image :src="item.brandLogo" style="width: 100rpx;height: 100rpx;"></image>
					<view style="padding:12rpx;font-weight: bold;margin-top: 12rpx;min-height: 108rpx;display: flex;align-items: center;justify-content: center;">
						{{item.activityName}}
					</view>
					<view style="padding:12rpx;">
						<button @tap="actionTask(item)" style="height: 56rpx;line-height: 56rpx;background: #FF5733;border-radius: 40rpx;font-size: 28rpx;color:#fff">申请接单</button>
					</view>
					<view style="font-size: .8em;">
						已有<span style="color: #0081FF;padding: 0 6rpx;">{{item.putNum+13888}}</span>人推广中
					</view>
				</view>
			</view>


			<view v-if="noticeList.length" class="margin-top" style="background-color: #FFF;border-radius: 20rpx;padding: 24rpx;">
				<view class="flex">
					<text class="cuIcon-hotfill text-red" style="font-size: 1.4em;margin-right: 6rpx;"></text>
					<view style="font-size: 28rpx;font-weight: bold;color: ##383838;">行业热点</view>
				</view>
				<view @tap="actionNotice(item.id,item.title)" v-for="(item,index) in noticeList" :key="index">
					<view class="flex margin-top" style="align-items: center;">
						<view class="flex" style="align-items: center;background-color: #f0f5f6;border-radius: 22rpx;font-size: 26rpx;padding:6rpx 12rpx;">
							<span style="font-style: italic;color: #FF5733;padding: 2rpx 12rpx;font-size:22rpx;font-weight: 600;">
								热点
							</span>
							<view class="text-cut" style="max-width: 60vw;min-width: 40vw;">{{item.title}}</view>
						</view>
						<view style="flex: 1;text-align: right;width: 8em;">{{item.createTime.substring(5,11)}}</view>
					</view>
				</view>
				<view class="margin-top" style="font-size: 26rpx;text-align: center;color: #FF5733;">
					<span @tap="dataAdd">点击查看更多行业热点</span>
				</view>
			</view>
			<view class="cu-modal" :class="noticedetail?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">{{title}}</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl" style="overflow: auto;max-height: 80vh;">
						<view v-html="noticedetail"></view>
					</view>
					<view class="cu-bar bg-white justify-center">
						<view class="action">
							<button class="cu-btn bg-green margin-left" style="background-color: #FF5733;" @tap="hideModal">确定</button>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import HeadNotice from "../component/HeadNotice.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex';
	
	export default {
		components: {
			HeadNotice
		},
		data() {
			return {
				isRefresh: false, //强制刷新
				noticedetail: '',
				cardCur: 0,
				dotStyle: false,
				towerStart: 0,
				direction: '',
				noticeList: [], //行业热点
				title: '',
				pages: {

				}
			}
		},
		computed: {
			...mapState({
				activitylist: state => state.publicStore.activitylist,
			}),
			activitylistFn: function() {
				let arr= []
				this.activitylist.map(item=>{
					if(!item.region&&arr.length<2){
						arr.push(item)
					}
				})
				return arr
			},
		},
		onPullDownRefresh() {
			this.isRefresh = true;
			this.noticeList = []
			this.init()
			this.$refs.child.init();
			uni.stopPullDownRefresh(); //想显示上面加载图标时需注释该方法
		},
		onLoad() {

		},
		onShow() {
			this.init();
		},
		created() {

		},
		mounted() {
			//弥补初始化组件数据缺失BUG
			this.$refs.child.init({
				isData: true
			});
		},
		methods: {
			...mapMutations(['settaskData', 'setdataDetail', 'setactivitylist']),

			topage(url) {
				uni.navigateTo({
					url: url
				})
			},
			dayCha(time) {
				time = time.replace(/T/, " ")
				time = time.replace(new RegExp("-", "gm"), "/");
				var timeMiao = new Date(time).getTime()
				var thatTimeMiao = new Date().getTime();
				var chaTime = timeMiao - thatTimeMiao;
				return chaTime
			},
			actionTask(item) {
				this.api.postisapply({
					data: {
						activityId: item.id
					},
					success: (res) => {
						this.settaskData(res.data.data)
						this.setdataDetail(item)
						if (res.data.data.status == 1 || res.data.data.status == 2) {
							this.topage(`/pages/order/task?id=${item.id}&time=${this.dayCha(item.activityEndtime)}`)
						} else if (res.data.data.status == 3) {
							this.topage(`/pages/center/dataDetail?status=3&id=${item.id}&price=${item.highPrice}`)
						} else {
							this.topage(`/pages/center/dataDetail?id=${item.id}&price=${item.highPrice}`)
						}
					}
				})
			},
			groupCut(array, sub) {
				let index = 0;
				let newArray = [];
				while (index < array.length) {
					newArray.push(array.slice(index, index += sub));
				}
				return newArray;
			},
			handleLoad(arr) {
				try {					
					//存储活动列表
					this.setactivitylist(arr);
					//缓存
					uni.setStorageSync('activitylist', arr)
				} catch (e) {
					this.setactivitylist([]);
				}
			},
			hideModal() {
				this.noticedetail = ''
			},
			actionNotice(id, title) {
				this.api.getnoticedetail({
					data: {
						id: id
					},
					success: (res) => {
						this.title = title;
						console.log("公告详情数据待修改")
						try {
							this.noticedetail = res.data.data.content
						} catch (e) {
							this.noticedetail = '未获取到数据，请稍候重试'
						}

					}
				})
			},
			dataAdd() {
				let isGetData = this.pages.total / this.pages.size > this.pages.current;
				if (isGetData) {
					let current = this.pages.current + 1
					this.isRefresh = true
					this.getnoticelist(current, 5)
				} else {
					uni.showToast({
						title: '没有更多数据了',
						icon: 'none',
						duration: 2000
					});
				}
			},
			getnoticelist(current = 1, size = 5) {
				if (this.isRefresh || !this.noticeList.length) {
					this.api.getnoticelist({
						data: {
							current: current,
							size: size,
							category: 2,
							descs: 'create_time'
						},
						success: (res) => {
							this.isRefresh = false;
							//需要总条数
							this.pages = {
								current: current,
								size: size,
								total: res.data.data.total
							}
							this.noticeList = [...this.noticeList,...res.data.data.records]
						}
					})
				}
			},
			postactivitylist() {
				if (this.isRefresh || !this.activitylist.length) {
					this.api.postactivitylist({
						success: (res) => {
							this.isRefresh = false;
							this.handleLoad(res.data.data.records)
						}
					})
				}
			},
			init() {
				this.getnoticelist();
				this.postactivitylist()
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
		}
	}
</script>

<style>
	page {
		background: #F0F5F6;
	}
</style>
<style>
	.vipswiper {
		height: 96rpx;
		background-color: #FFF;
		border-radius: 100rpx;
		color: #FF5733;
		font-size: .8em;
		padding: 0 24rpx;
	}

	.vipswiper_item {
		display: flex;
		align-items: center;
	}

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
</style>
