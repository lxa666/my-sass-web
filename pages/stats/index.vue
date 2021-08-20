<template>
	<view>
		<!-- 看板 -->
		<view style="background:#F0F5F6;padding:20rpx">
			<view style="padding:0 20rpx;background: #fff;border-radius: 20rpx;">
				<view class="flex align-center justify-between" style="padding:20rpx 0">
					<view class="" style="flex:1;margin-right: 24rpx;;font-size: 34rpx;">
						<picker style="flex:1;" mode="date" :value="statsDate" @change="statsDateChange">
							<view class="flex align-center justify-between" style="padding:20rpx 16rpx;background: #F0F5F6;border-radius: 20rpx;font-size: 32rpx;">
								<view class="picker">
									{{statsDate}}
								</view>
								<view class="cuIcon-right"></view>
							</view>
						</picker>
					</view>
					
					<view v-if="activitylist.length" class="flex" style="flex:1;height: 72rpx;padding: 0 24rpx;border-radius: 72rpx;justify-content:space-between ;align-items: center;margin-left: 24rpx;background: #F0F5F6;">
						<picker style="flex:1;" range-key="activityName" @change="activitylistChange2" :value="typeIndex2" :range="activitylist">
							<view class="flex " style="align-items: center;justify-content:space-between;">
								<view class="picker cuIcon-apps flex" style="align-items: center;">
									{{activitylist[typeIndex2].activityName}}
								</view>
								<view class="cuIcon-right"></view>
							</view>
						</picker>
					</view>
					
				</view>
				
				<view class="flex" style="justify-content: space-between;">
					<view style="flex: 1;">
						<view class="flex" style="padding:10rpx 0 30rpx 10rpx;">
							<view style="flex:1"><text>待结算单量</text><text style="padding-left:14rpx;font-size: 38rpx;color:#FF5733" class="text-bold">{{statsData.forSettleCount}}</text></view>
							<view style="flex:1"><text>已结算单量</text><text style="padding-left:14rpx;font-size: 38rpx;color:#FF5733" class="text-bold">{{statsData.isSettleCount}}</text></view>
						</view>
						<view class="flex" style="padding:10rpx 0 10rpx 10rpx;">
							<view style="flex:1"><text>待结算</text><text style="padding-left:14rpx;font-size: 38rpx;color:#FF5733" class="text-bold">¥{{keepTwoDecimalFull(statsData.forSettleMoney)}}</text></view>
							<view style="flex:1"><text>已结算</text><text style="padding-left:14rpx;font-size: 38rpx;color:#FF5733" class="text-bold">¥{{keepTwoDecimalFull(statsData.isSettleMoney)}}</text></view>
						</view>
					</view>
					<view class="flex align-center"  >
						<text style="font-size: 20rpx;color: #a6a6a6;">显<br/>示</text>
						<view style="transform:rotate(90deg);">
							<switch style="transform:scale(0.8);" class='red' :class="showStats?'checked':''" color="#FF5733" :checked="showStats" @change="showStatsChange"/>
						</view>
					</view>
				</view>
				

				<view v-if="showStats" class="flex text-center" style="padding-bottom: 10px;border-top: 1px solid #E5E5E5;">
					<view style="flex:1">
						<view class="margin-tb-sm">
							<view class="text-bold" style="display: inline-block;padding:6rpx 14rpx;background: #F0F5F6;border-radius: 20rpx;color:#FF5733;">{{statsData.myLaxinCount}}</view>
							<view>个人推广单量</view>
						</view>
						<view>
							<view class="text-bold" style="display: inline-block;padding:6rpx 14rpx;background: #F0F5F6;border-radius: 20rpx;color:#FF5733;">¥{{keepTwoDecimalFull(statsData.myLaxinMoney)}}</view>
							<view>个人推广收益</view>
						</view>
					</view>
					<view style="flex:1">
						<view class="margin-tb-sm">
							<view class="text-bold" style="display: inline-block;padding:6rpx 14rpx;background: #F0F5F6;border-radius: 20rpx;color:#FF5733;">{{statsData.teamLaxinCount}}</view>
							<view>代理推广单量</view>
						</view>
						<view>
							<view class="text-bold" style="display: inline-block;padding:6rpx 14rpx;background: #F0F5F6;border-radius: 20rpx;color:#FF5733;">¥{{keepTwoDecimalFull(statsData.teamLaxinMoney)}}</view>
							<view>代理推广收益</view>
						</view>
					</view>
					<view style="flex:1">
						<view class="margin-tb-sm">
							<view class="text-bold" style="display: inline-block;padding:6rpx 14rpx;background: #F0F5F6;border-radius: 20rpx;color:#FF5733;">{{statsData.rewardCount}}</view>
							<view>扶持单量</view>
						</view>
						<view>
							<view class="text-bold" style="display: inline-block;padding:6rpx 14rpx;background: #F0F5F6;border-radius: 20rpx;color:#FF5733;">¥{{keepTwoDecimalFull(statsData.rewardMoney)}}</view>
							<view>扶持奖励</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<view style="margin: 20rpx;">
			<view style="display: flex;justify-content: space-between;">
				<view class="flex" style="flex:1;height: 72rpx;padding: 0 24rpx;border-radius: 72rpx;justify-content:space-between ;align-items: center;margin-right: 24rpx;background: #F0F5F6;">
					<view class="cuIcon-search"></view>
					<input @confirm="mobileconfirm(mobile)" placeholder="搜索手机号、渠道" placeholder-style="color:#333;font-size:28rpx"
					 v-model="mobile" />
					<text @tap="cancelSearch" v-if="mobile" class='cuIcon-close text-bold'></text>
				</view>

				<view v-if="activitylist.length" class="flex" style="flex:1;height: 72rpx;padding: 0 24rpx;border-radius: 72rpx;justify-content:space-between ;align-items: center;margin-left: 24rpx;background: #F0F5F6;">
					<picker style="flex:1;" range-key="activityName" @change="activitylistChange" :value="typeIndex" :range="activitylist">
						<view class="flex " style="align-items: center;justify-content:space-between;">
							<view class="picker cuIcon-apps flex" style="align-items: center;">
								{{activitylist[typeIndex].activityName}}
							</view>
							<view class="cuIcon-right"></view>
						</view>
					</picker>
				</view>
			</view>

			<view class="margin-top" style="display: flex;justify-content: space-between;">
				<view class="flex" style="flex:1;height: 72rpx;padding: 0 24rpx;border-radius: 72rpx;justify-content:space-between ;align-items: center;margin-right: 24rpx;background: #F0F5F6;">
					<picker style="flex:1;" mode="date" :value="date" @change="DateChange">
						<view class="flex " style="align-items: center;justify-content:space-between;">
							<view class="picker cuIcon-time flex" style="align-items: center;">
								{{date}}
							</view>
							<view v-if="date=='选择日期'" class="cuIcon-right"></view>
							<view v-else @tap.stop="delDate" class="cuIcon-close"></view>
						</view>
					</picker>
				</view>

				<view class="flex" style="flex:1;height: 72rpx;padding: 0 24rpx;border-radius: 72rpx;justify-content:space-between ;align-items: center;margin-left: 24rpx;background: #F0F5F6;">
					<picker style="flex: 1;" @change="statusPickerChange" :value="statusIndex" :range="statusPicker">
						<view class="flex " style="align-items: center;justify-content:space-between;">
							<view class="picker cuIcon-light flex" style="align-items: center;">
								{{statusIndex>-1?statusPicker[statusIndex]:'全部状态'}}
							</view>
							<view class="cuIcon-right"></view>
						</view>
					</picker>
				</view>
			</view>
		</view>
		
		<view v-if="priceData&&priceData.length" class="bg-white" style="padding:20rpx 10rpx;border-radius: 20rpx;">
			<view class="text-center" style="display: flex;padding:20rpx 10rpx;border-radius: 40rpx;background: #F0F5F6;">
				<view style="flex:1">渠道名</view>
				<view style="flex:1">日期</view>
				<view style="flex:1">订单量</view>
				<view style="flex:1">结算金额</view>
				<view style="flex:1">类型</view>
				<view style="flex:1">状态</view>
			</view>
			<scroll-view @scrolltolower="scrolltolower" :scroll-top="scrollTop" scroll-y style="margin-top:20rpx" :style="{'height':showStats?'40vh':'50vh'}">
				<view v-for="(item,index) in priceData" :key='item.id'>
					<view class="text-center" style="padding:20rpx 0;border-bottom: 1px solid #f8f8f8;">
						<view style="display: flex;">
							<view class="text-cut" style="flex:1">{{item.agentName}}</view>
							<view style="flex:1">{{item.createTime}}</view>
							<view style="flex:1">{{item.orderNum}}</view>
							<view style="flex:1">￥{{item.settleMoney/100}}</view>
							<view style="flex:1;padding:0 6rpx;height:50rpx;line-height: 50rpx;color:#2A82E4;background:rgba(42, 130, 228, 0.3);"
							 :style="{'color':settleTypeColor(item.settleType),'background':settleTypeBg(item.settleType)}">{{item.settleType==-1?'扶持奖励':typePicker[item.settleType]}}</view>
							<view style="flex:1;" :style="{'color':item.status==2?'#FF5733':''}">{{statusPicker[item.status]}}</view>
						</view>
					</view>
				</view>
				<!-- 加载提示 -->
				<view v-if="loading">
					<view class="cu-load loading"></view>
				</view>
				<view class="text-center" v-if="!pageNum&&priceData.length">到底啦</view>
			</scroll-view>
		</view>


	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
	} from 'vuex';
	import withdrawal from "./components/withdrawal.vue"
	export default {
		components: {
			withdrawal
		},
		data() {
			return {
				isRefresh: false,
				mobile: '',
				date: '选择日期',
				typeIndex: 0,
				statusIndex: 0,

				typePicker: ['扶持奖励', '个人推广', '团队推广', '提现', '对充'],
				statusPicker: ['全部状态', '待结算', '已结算'],

				priceData: [],

				activitylist: [],
				activityId: '',
				pageNum: 1,
				showStats: false,
				flag: true,
				statsData: {},
				scrollTop: 0,
				statsDate: this.getDate(),
				
				typeIndex2:0,
				activityId2:''
			}
		},
		onPullDownRefresh() {
			this.isRefresh = true;
			this.pageNum = 1
			this.init()
			uni.stopPullDownRefresh(); //想显示上面加载图标时需注释该方法
		},
		computed: {
			...mapState({
				withdrawalShow: state => state.statsStore.withdrawalShow,
				activityIds: state => state.itemsStore.activityId,
				
				loading: state => state.publicStore.loading,
				
				//活动数据结构需改动
				activitylists: state => state.publicStore.activitylist,
			})
		},
		onShow() {
			if (this.activityIds) {
				this.activityId = this.activityIds
				this.activityId2 = this.activityIds
				this.setactivityId('')
				this.pageNum = 1
				this.init()
			}
			
			let showStats = uni.getStorageSync("showStats")
			if (showStats) { //显示看板数据
				this.showStats = true
			}
		},
		created() {
			if(!this.activityId){
				this.init()
			}
		},
		methods: {
			...mapMutations(['setactivityId', 'setactivitylist']),
			keepTwoDecimalFull(num) {
				if (isNaN(num) || num < 0) {
					return '--'
				}
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
			delDate() {
				this.date = '选择日期';
				this.pageNum = 1
				this.getstatistics()
			},
			cancelSearch() {
				this.mobile = '';
				this.pageNum = 1
				this.getstatistics()
			},
			activitylistChange2(e) {
				this.pageNum = 1
				this.typeIndex2 = e.detail.value
				this.activityId2 = this.activitylist[e.detail.value].id
				this.getStats()
			},
			activitylistChange(e) {
				this.pageNum = 1
				this.typeIndex = e.detail.value
				this.activityId = this.activitylist[e.detail.value].id				
				this.priceData = [];
				this.getstatistics()
				
			},
			getstatistics() {
				if (this.flag) { //防止滚动抖动
					this.flag = false
					if (this.pageNum == 1) {
						this.scrollTop = 1;
						this.$nextTick(function() {
							this.scrollTop = 0;
						});
					}
					this.api.getstatistics({
						data: {
							isRefreshTime:this.isRefresh,
							mobile: this.mobile,
							date: this.date == '选择日期' ? '' : this.date,
							status: this.statusIndex ? this.statusIndex : '',
							activityId: this.activityId,
							current: this.pageNum,
							size: 10,
						},
						success: (res) => {
							console.log('统计列表', res.data.data.listProfit)
							console.log('请求后', this.pageNum)
							if (this.pageNum > 1 && res.data.data.listProfit.length) {
								this.priceData = [...this.priceData, ...res.data.data.listProfit]
							} else if (this.pageNum == 1) {
								this.priceData = res.data.data.listProfit
							}
							if (res.data.data.listProfit.length != 10) {
								this.pageNum = null //没下一页
							}
							console.log(9999,this.priceData)
							this.flag = true
						},
						complete: () => {
							this.flag = true
						}
					})
				}

			},
			mobileconfirm() {
				this.pageNum = 1
				this.getstatistics()
			},

			postactivitylist() {
				//特殊处理，无特殊需求请参考首页及项目页的活动数据
				const typeIndexFn = () => {
					if (this.activityId) {
						this.activitylist.map((item, index) => {
							if (this.activityId == item.id) {
								console.log('当前活动下标', index)
								this.typeIndex = index;
								this.typeIndex2 = index;
							}
						})
					}
				}
				if (!this.activitylists.length || this.isRefresh) {
					this.api.postactivitylist({ //获取所有活动
						success: (res) => {
							this.isRefresh = false;
							this.setactivitylist(res.data.data.records);
							this.activitylist = [{
								activityName: '全部项目',
								id: '',
							}, ...res.data.data.records]
							typeIndexFn()
						}
					})
				} else {
					this.activitylist = [{
						activityName: '全部项目',
						id: '',
					}, ...this.activitylists]
					typeIndexFn()
				}
			},
			init() {
				this.postactivitylist()
				this.getStats()
				this.getstatistics()
			},
			getStats() { //获取看板数据
				if (this.isRefresh || this.statsDate){
					this.api.getLaxinStats({
						data: {
							isRefreshTime:this.isRefresh,
							relActivityId:this.activityId2,
							settleTime: this.statsDate
						},
						success: (res) => {
							this.isRefresh = false;
							console.log('统计', res)
							this.statsData = res.data.data
						}
					})
				}
			},
			topage(url) {
				uni.navigateTo({
					url: url
				})
			},
			statusPickerChange(e) {
				this.statusIndex = e.detail.value;
				this.pageNum = 1
				this.getstatistics()
			},
			DateChange(e) {
				this.date = e.detail.value;
				this.pageNum = 1
				this.getstatistics()
			},
			typePickerChange(e) {
				this.typeIndex = e.detail.value
			},
			scrolltolower(e) { //列表滚动到底部
				if (this.pageNum && !this.loading) {
					this.pageNum++
					this.getstatistics()
				}
			},
			statsDateChange(e) {
				this.statsDate = e.detail.value;
				this.getStats()
			},
			getDate() { //获取年月日
				var date = new Date();
				var mon = date.getMonth() + 1;
				var day = date.getDate();
				return date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
			},
			showStatsChange(e) {
				this.showStats = e.detail.value
				uni.setStorageSync("showStats", e.detail.value)
			},
			getYesterdayDate(date) { //获取早一天
				var nowdate = new Date(date);
				nowdate.setDate(nowdate.getDate() - 1);
				var y = nowdate.getFullYear();
				var m = nowdate.getMonth() + 1 < 10 ? "0" + (nowdate.getMonth() + 1) : nowdate.getMonth() + 1;
				var d = nowdate.getDate() < 10 ? "0" + nowdate.getDate() : nowdate.getDate();
				var formatwdate = y + '-' + m + '-' + d;
				return formatwdate;
			},
			settleTypeColor(t) {
				let color = ''
				if (t == 0) { //扶持奖励
					color = 'rgba(67, 207, 124, 1)'
				} else if (t == 1) { //拉新结算
					color = 'rgba(227, 60, 100, 1)'
				} else { //代理分成
					color = 'rgba(42, 130, 228, 1)'
				}
				return color
			},
			settleTypeBg(t) {
				let bg = ''
				if (t == 0) { //扶持奖励
					bg = 'rgba(67, 207, 124, 0.3)'
				} else if (t == 1) { //拉新结算
					bg = 'rgba(227, 60, 100, 0.3)'
				} else { //代理分成
					bg = 'rgba(42, 130, 228, 0.3)'
				}
				return bg
			},
		}
	}
</script>

<style>
	page {
		background: #fff;
	}
</style>
<style scoped>
	.search-item {
		flex: 1;
		border-radius: 60rpx;
	}
</style>
