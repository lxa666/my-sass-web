<template>
	<!-- 弃用 -->
	<view style="background-color: #FFF;min-height: 100vh;">
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 显示价格
			</view>
			<view class="action">
				<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false" color="#e54d42"></switch>
			</view>
		</view>

		<view class="cu-list menu-avatar" style="padding-right:12rpx;">
			<view @tap="activityInfo(item)" v-for="(item,index) in activitylist" :key="item.id" class="cu-item">
				<view class="cu-avatar round lg" :style="'background-image:url('+item.brandLogo+');'"></view>
				<view class="content">
					<view class="text-grey" style="min-height: 70rpx;">{{item.activityName}}</view>
					<view class="text-gray  flex">
						<view class="text-cut">
							{{activityStatus[item.activityStatus]}}
						</view>
					</view>
				</view>
				<view class="" style="text-align: right;line-height: 1.6em;">
					<view class="text-grey text-xs" style="margin-right:-12rpx ;">
						<uniCountdown :time="endTime(item.activityEndtime)"></uniCountdown>
					</view>
					<view class="text-grey" style="color: #E54D42;">
						<text class="cuIcon-price text-red  margin-right-xs"></text>￥{{switchB?keepTwoDecimalFull(item.highPrice):'--'}}</view>
				</view>
			</view>
		</view>
		<view style="text-align: center;padding: 24rpx;">
			--暂无更多数据--
		</view>

		<view class="cu-bar tabbar bg-white shadow foot" style="min-height: 164rpx;bottom:94rpx;background-color: #FFF;">
			<view @tap="init" class="action" style="">
				<view style="margin: 0 auto;height: 100rpx;width: 100rpx;background-size: 100% 100%;background-image: url('http://z.52laxin.top/peasant/resource/image/refresh.gif');">
				</view>
			</view>
			<view @tap="GrabSingle" class="action">
				<view style="margin: 0 auto;height: 140rpx;width: 140rpx;background-size: 100% 100%;background-image: url('http://z.52laxin.top/peasant/resource/image/quick.gif');">
				</view>
			</view>
			<view @tap="topage('/pages/order/guide')" class="action">
				<view style="margin: 0 auto;height: 100rpx;width: 100rpx;background-size: 100% 100%;background-image: url('http://z.52laxin.top/peasant/resource/image/tutorial.gif');">
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
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	export default {
		components: {
			uniCountdown
		},
		data() {
			return {
				seconds: 0,

				activitylist: [],
				activityStatus:['','进行中','暂停','完成'],

				switchB: false,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
			}
		},
		onShow() {
			this.init()
		},
		computed: {
			endTime() {
				return function(time) {
					let endtime = this.dayCha(time)
					return endtime
				}
			}
		},
		methods: {
			...mapMutations(['settaskData']),
			keepTwoDecimalFull(num) {
				var result = parseFloat(num);
				if (isNaN(result)) {
					return false;
				}
				result = Math.floor(num * 100) / 10000;
				var s_x = result.toString();
				var pos_decimal = s_x.indexOf('.');
				if (pos_decimal < 0) {
					pos_decimal = s_x.length;
					s_x += '.';
				}
				while (s_x.length <= pos_decimal + 2) {
					s_x += '0';
				}
				return s_x;
			},
			GrabSingle() {
				this.topage('/pages/order/task');
			},
			activityInfo(item) {
				this.api.postisapply({
					data: {
						relActivityId: item.id
					},
					success: (res) => {
						console.log('是否已申请', res)
						if (res.data.data.id) {
							this.settaskData(res.data.data)
							this.topage(`/pages/order/task?id=${item.id}&time=${this.dayCha(item.activityEndtime)}`)
						} else {
							this.topage(`/pages/center/dataDetail?id=${item.id}&price=${item.highPrice}`)
						}
					}
				})
			},
			dayCha(time) {
				time = time.replace(new RegExp("-", "gm"), "/");
				var timeMiao = new Date(time).getTime()
				var thatTimeMiao = new Date().getTime();
				var chaTime = timeMiao - thatTimeMiao;
				return chaTime
			},
			init() {
				this.api.postactivitylist({
					success: (res) => {
						console.log(res)
						this.activitylist = res.data.data.records
					}
				})
			},
			SwitchB(e) {
				console.log("e", e)
				this.switchB = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
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
