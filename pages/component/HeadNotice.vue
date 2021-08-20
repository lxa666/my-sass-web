<template>
	<view>
		<swiper v-if="swiperList.length" class="swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000"
		 style="height:416rpx">
			<swiper-item @click="advertisementUrl(item.carouselLink)" v-for="(item,index) in swiperList" :key="index">
				<view style="height: 100%;width: 100%;overflow: hidden">
					<image style="width: 100%;height: 100%;" mode="scaleToFill" :src="item.carouselUrl" />
				</view>
			</swiper-item>
		</swiper>
		<view v-if="noticeShow" style="padding:30rpx 20rpx 10rpx;">
			<view v-if="noticeList.length">
				<swiper class="vipswiper" :vertical="true" :indicator-dots="false" :autoplay="true" :circular="true" :interval="3000"
				 :duration="1000">
					<swiper-item @tap="actionNotice(item.id)" v-for="(item,index) in noticeList" :key="index" class="vipswiper_item">
						<view class="cuIcon-noticefill" style="font-size: 40rpx;color:#FF5733"></view>
						<view style="margin-left:10rpx;flex:1;color:#A6A6A6;font-size: 28rpx;">{{item.title}}</view>
						<view><text style="font-size: 28rpx;color:#FF5733">点击查看</text><text class="cuIcon-right"></text></view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="cu-modal" :class="noticedetail?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">公告</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="overflow: auto;max-height: 65vh;">
					<view v-html="noticedetail"></view>
				</view>
				<view v-if="isAutoShow" class="flex" style="text-align: left;padding: 24rpx;">
					<checkbox-group @change="checkboxChange">
						<view style="color: #A6A6A6;display: flex;align-items: center;">
							<checkbox style="font-size: 32rpx;transform:scale(0.7);color: #A6A6A6;" class='' :class="isAutoStatus?'checked':''"
							 :checked="isAutoStatus?true:false" value="true"></checkbox><span style="">不再提醒</span>
						</view>
					</checkbox-group>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn bg-green margin-left" style="background-color: #FF5733;" @tap="hideModal">关闭</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import store from '@/common/store.js'
	export default {
		components: {

		},
		props:{
			noticeShow:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				isAutoShow: '',
				isAutoStatus: false,
				noticedetail: '',
				cardCur: 0,
				dotStyle: false,
				towerStart: 0,
				direction: '',
				noticeList:[],
				swiperList:[]
			}
		},
		computed: {},
		onPullDownRefresh() {
			this.init()
			uni.stopPullDownRefresh(); //想显示上面加载图标时需注释该方法
		},
		mounted(){
			this.noticeList =  store.state.publicStore.noticeList;
			this.swiperList =  store.state.publicStore.swiperList;
			this.init();
		},
		onLoad() {
			console.log("组件")
		},
		onShow() {
			console.log("组件22")
		},
		created() {
			
			console.log("组件33")
		},
		methods: {
			...mapMutations(['settaskData', 'setdataDetail', 'setnoticeList', 'setswiperList']),
			advertisementUrl(url) {
				if (url.indexOf("http") != -1) {
					window.location.href = url;
				} else {
					this.topage(url)
				}
			},
			checkboxChange() {
				this.isAutoStatus = !this.isAutoStatus;
			},
			topage(url) {
				uni.navigateTo({
					url: url
				})
			},
			hideModal() {
				this.noticedetail = ''
				if (this.isAutoShow) {
					if (this.isAutoStatus) {
						//不再提醒
						uni.setStorageSync('noticedetailId', this.isAutoShow)
					}
					this.isAutoShow = ''; //仅限自动弹窗时使用
					this.isAutoStatus = false; //默认不选中
				}
			},
			actionNotice(id) {
				this.api.getnoticedetail({
					data: {
						id: id
					},
					success: (res) => {
						console.log("公告详情数据待修改")
						try {
							this.noticedetail = res.data.data.content
						} catch (e) {
							this.noticedetail = ''
						}

					}
				})
			},
			isShowNoticedetail() {
				let data = this.noticeList;
				if (data.length) {
					let id = data[0].id;
					if (id !== uni.getStorageSync('noticedetailId')) {
						this.isAutoShow = id
						this.actionNotice(id)
					}
				}
			},
			getCarousel(e = {}) {
				if (!this.swiperList.length) {
					this.api.getCarousel({
						data: {
							descs: 'create_time'
						},
						success: (res) => {
							if (res.data.code == 200) {
								this.swiperList = res.data.data.records
								this.setswiperList(res.data.data.records)
							}
						}
					})
				}
			},
			getnoticelist(e = {}) {
				if (!this.noticeList.length) {
					this.api.getnoticelist({
						data: {
							current: 1,
							size: 20,
							category: 1,
							descs: 'create_time'
						},
						success: (res) => {
							try {
								this.noticeList = res.data.data.records
								this.setnoticeList(res.data.data.records)
								this.isShowNoticedetail()
							} catch (e) {
								this.noticeList = []
							}
						}
					})
				}
			},
			init(e) {
				this.getnoticelist(e)
				this.getCarousel(e)
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
		height: 64rpx;
		background-color: #FFF;
		border-radius: 100rpx;
		color: #FF5733;
		font-size: .8em;
		padding: 0 24rpx;
	}

	.vipswiper_item {
		display: flex;
		align-items: center;
		background-color: #FFF;
	}

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
</style>
