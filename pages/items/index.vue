<template>
	<view>
		<HeadNotice :noticeShow='false' ref="child" />
		<view class="flex" style="font-size: 28rpx;height: 96rpx;align-items: center;background-color: #FFF;">
			<view @tap="getData" data-menu="national" class="flex" :style="menuVal=='national'?'':'opacity: .5'" style="flex: 1;justify-content: center;align-items: center;border-right: 1px solid #e5e5e5;">
				<image src="@/static/qg.png" style="width: 60rpx;" mode="widthFix" />
				<view :class="menuVal=='national'?'menuchecked':''" style="width: 140rpx;border-radius: 8rpx;text-align: center;">
					全国项目
				</view>
			</view>
			<view @tap="getData" data-menu="city" class="flex" :style="menuVal=='city'?'':'opacity: .5'" style="flex: 1;justify-content: center;align-items: center;border-left: 1px solid #e5e5e5;">
				<image src="@/static/city.png" style="width: 60rpx;" mode="widthFix" />
				<view :class="menuVal=='city'?'menuchecked':''" style="width: 140rpx;border-radius: 8rpx;text-align: center;">
					城市项目
				</view>
			</view>
		</view>

		<view v-if="menuVal=='city'" class="flex" style="justify-content: space-between;align-items: center;background-color:#FFF;margin: 20rpx;padding:20rpx;font-size: 28rpx ;border-radius: 100rpx;">
			<view style="flex: 1;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
				当前城市：{{province}}-{{city}}-{{district}}
			</view>
			<view @tap="getLocationFn(true)" class="cuIcon-refresh" style="color: #4fa8fe;padding-left: .5em;">
				重新获取定位
			</view>
		</view>

		<view style="padding:0 20rpx 20rpx;">
			<view v-for="(items,index) in (menuVal=='city'?cityactivitylist:nationalactivitylist)" :key="index" style="margin-top: 20rpx;background: #fff;border-radius: 20rpx;padding:20rpx;">
				<view class="flex" style="align-items: center;border-bottom: .5px solid #e5e5e5;padding-bottom: 12rpx;">
					<view>
						<image :src="items.logo||'../../static/user/logo.png'" style="width: 80rpx;height:80rpx;"></image>
					</view>
					<view style="font-weight: bold;font-size: 28rpx;color: #505050;padding-left: 12rpx;">{{items.name}}</view>
				</view>
				<view style="padding: 20rpx 0;font-size: 24rpx;text-align: center;">
					<view class="flex" style="align-items: center;justify-content: space-between;padding:12rpx 20rpx;color: #505050;background-color: #f0f5f6;border-radius: 100rpx;">
						<view style="flex: 1;">活动名称</view>
						<view style="flex: 1;">结算价</view>
						<view style="flex: 1;" v-if="items.data[0].sysReward">扶持奖励</view>
					</view>
					<view style="padding: 20rpx 0;border-bottom: .5px solid #e5e5e5;">
						<view v-for="item in items.data" class="flex" style="align-items: center;padding:12rpx 20rpx;font-weight: bold;">
							<view class="fonthidden" style="flex:1;color: #505050;">{{item.activityName}}</view>
							<view style="flex:1;color: #ff5733;">￥{{keepTwoDecimalFull(item.highPrice)}}</view>
							<view style="flex:1;color: #43cf7c;" v-if="item.sysReward">￥{{keepTwoDecimalFull(item.sysReward)}}</view>
						</view>
					</view>
				</view>

				<view class="flex" style="justify-content:center;">
					<view style="padding-right:48rpx;">
						<button @tap="actionTask(items)" class="cuIcon-qrcode" style="min-width: 7em;height: 60rpx;line-height: 60rpx;background: #4fa8fe;border-radius: 10rpx;font-size: 28rpx;color:#fff">
							推广码</button>
					</view>
					<view style="padding-left:48rpx;">
						<button class="cuIcon-rank" @tap="totab(items.data[0].id)" style="height: 60rpx;line-height: 60rpx;background: #4fa8fe;border-radius: 10rpx;font-size: 28rpx;color:#fff">
							数据明细</button>
					</view>
				</view>
			</view>

			<view v-if="menuVal=='city'&&!cityactivitylist.length&&!loading" style="text-align: center;">
				--暂无数据--
			</view>
		</view>

		<!-- <outer-ip></outer-ip> -->
	</view>

</template>

<script>
	import REGION from "@/common/getLocation";
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
				province: '',
				city: '',
				district: '',
				menuVal: 'national',
				isRefresh: false, //强制刷新
			}
		},
		onLoad(e) {
			if (e.id) {
				//判断活动是否已申请 接口 需要结束时间 及 logo				
				// this.init(e.id);//0705
				this.actionTask({
					data: [{
						id: e.id
					}]
				})
			} else {
				this.init();
			}
		},
		created() {},
		onPullDownRefresh() {
			this.isRefresh = true;
			this.init()
			this.$refs.child.init();
			uni.stopPullDownRefresh(); //想显示上面加载图标时需注释该方法
		},
		onShow() {

		},
		computed: {
			...mapState({
				loading: state => state.publicStore.loading,
				region: state => state.publicStore.region,
				activitylistS: state => state.publicStore.activitylistS,
				cityactivitylist: state => state.publicStore.cityactivitylist,
				nationalactivitylist: state => state.publicStore.nationalactivitylist,
			}),
		},
		methods: {
			...mapMutations(['settaskData', 'setdataDetail', 'setitemInfo', 'setactivityId', 'setactivitylistS',
				'setcityactivitylist', 'setregion', 'setnationalactivitylist'
			]),
			getData(e) {
				uni.hideLoading()
				this.menuVal = e.currentTarget.dataset.menu;
				this.init()
			},

			async getLocationFn(isrefresh) {
				let getdata = () => {
					let region = this.province + this.city + this.district
					if (!this.cityactivitylist.length || this.region != region || this.isRefresh) {
						this.setregion(region)
						this.setData()
					}
				}

				if (!this.city || isrefresh) {
					try {
						this.district = ''
						this.city = ''
						this.province = ''
						uni.removeStorageSync('longitude')
						uni.removeStorageSync('latitude')
						this.setcityactivitylist([])
						let position = await REGION.getCurrentPosition()
						let loc = await REGION.getLocation()
						if (!loc) {
							uni.showToast({
								title: '系统繁忙，请稍候重试',
								icon: 'none',
								duration: 3000
							});
							return
						}
						if (loc.status !== 0) {
							uni.showToast({
								title: loc.message,
								icon: 'none',
								duration: 2000
							});
						} else {
							this.district = loc.result.ad_info.district
							this.city = loc.result.ad_info.city
							this.province = loc.result.ad_info.province
							uni.setStorageSync('locationText', `${this.province}-${this.city}-${this.district}`)
							getdata()
						}
					} catch (e) {
						console.log("未知异常--", e)
					}
				} else {
					getdata()
				}
			},
			keepTwoDecimalFull(num) {
				num = num / 100
				var result = parseFloat(num);
				if (isNaN(result)) {
					return false;
				}
				result = Math.floor(num * 100) / 100;
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
			totab(id) {
				this.setactivityId(id)
				uni.switchTab({
					url: '/pages/stats/index'
				});
			},
			topage(url, item) {
				this.setitemInfo(item)
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
			actionTask(e) {
				let item = e.data[0]
				if (item.isRepeatApply) {					
					let val = JSON.stringify(e)
					console.log(val)
					uni.setStorageSync('itemsData',val)
					this.topage(`/pages/items/team`)
				} else {
					this.api.postisapply({
						data: {
							activityId: item.id
						},
						success: (res) => {
							let data = res.data.data
							this.settaskData(data)
							this.setdataDetail(item)
							if (data.status == 1 || data.status == 2) {
								this.topage(`/pages/order/task?id=${data.id}&time=${this.dayCha(data.activityEndtime)}`)
							} else if (data.status == 3) {
								this.topage(
									`/pages/center/dataDetail?menuVal=${this.menuVal}&status=3&id=${item.id}&price=${item.highPrice}`)
							} else {
								this.topage(`/pages/center/dataDetail?menuVal=${this.menuVal}&id=${item.id}&price=${item.highPrice}`)
							}
						}
					})
				}
			},
			setData() {
				if (!this.activitylistS.length || this.isRefresh) {
					this.postactivitylist()
					return;
				}
				let nationalactivitylist = [];
				let cityactivitylist = [];
				this.activitylistS.map(items => {
					items.data.map((item,index) => {
						//有活动组
						if(!index){
							//只拿第0个判断
							if (item.region) {
								if (this.province || this.district || this.city) {
									if (item.region.indexOf(this.province) != -1 && item.region.indexOf(this.city) != -1) {
										if (this.district) {
											if (item.region.indexOf(this.district) != -1) {
												cityactivitylist.push(items)
											}
										} else {
											cityactivitylist.push(items)
										}
									}
								}
							} else {
								nationalactivitylist.push(items)
							}
						}
						
					})
				})
				if (this.menuVal === 'city') {
					console.log(cityactivitylist)
					this.setcityactivitylist(cityactivitylist)
				} else {
					console.log(nationalactivitylist)
					this.setnationalactivitylist(nationalactivitylist)
				}
			},
			postactivitylist() {
				this.api.postactivitylist({
					data: {
						group: 1
					},
					success: (res) => {
						this.isRefresh = false;
						try {
							this.setactivitylistS(res.data.data);
							uni.setStorageSync('activitylistS', res.data.data)
							if (this.activitylistS.length) {
								this.setData()
							}
						} catch (e) {
							this.setactivitylistS([]);
						}
					}
				})
			},
			init() {
				if (this.menuVal === 'city') {
					this.getLocationFn();
					return
				}
				this.setData()
			}
		}
	}
</script>

<style>
	.menuchecked {
		height: 60rpx;
		line-height: 60rpx;
		background-color: #ffddd6;
		border: 1px solid #ff5733;
		color: #ff5733;
	}

	.fonthidden {
		white-space: nowrap;
		/*一行显示*/
		overflow: hidden;
		/*超出部分隐藏*/
		text-overflow: ellipsis;
		/*用...代替超出部分*/
	}
</style>
