<template>
	<view style="min-height: 100vh;padding: 24rpx;">

		<view style="padding:50rpx 40rpx;background: #3B3939;border-radius: 20rpx;">
			<view style="display: flex;justify-content: space-between;align-items: center;padding-bottom: 24rpx;border-bottom: 1px solid #808080;font-size: 1.2em;">
				<view style="color:#E5CF6F">钱包余额 ￥{{keepTwoDecimalFull(accountData.accountBalance)}}</view>
				<withdrawal :priceData="accountData" :init="init"></withdrawal>
			</view>
			<view class="flex" style="padding-top: 24rpx;text-align: center;">
				<view style="flex:1;color: #43cf7c;">
					<view>待结算入账</view>
					<view>￥{{keepTwoDecimalFull(accountData.unsettled)}}</view>
				</view>
				<view style="flex:1;color: #ff5733;">
					<view>已结算入账</view>
					<view>￥{{keepTwoDecimalFull(accountData.allSettled)}}</view>
				</view>
				<view style="flex:1;color: #ffeb3b;">
					<view>提现中</view>
					<view>￥{{keepTwoDecimalFull(accountData.cashouting)}}</view>
				</view>
				<view style="flex:1;color: #2a82e4;">
					<view>已提现</view>
					<view>￥{{keepTwoDecimalFull(accountData.allCashout)}}</view>
				</view>
			</view>
		</view>

		<view style="margin: 30rpx 0;">
			<view class="margin-top" style="display: flex;justify-content: space-between;">

				<view class="flex" style="flex:1;height: 72rpx;padding: 0 24rpx;border-radius: 72rpx;justify-content:space-between ;align-items: center;background-color: #FFF;margin-right: 24rpx;">
					<picker style="flex:1;" @change="typePickerChange" :value="typeIndex" :range="typePicker">
						<view class="flex" style="align-items: center;justify-content:space-between;">
							<view class="picker cuIcon-circle">
								{{typeIndex>-1?typePicker[typeIndex]:'全部类型'}}
							</view>
							<view class="cuIcon-right"></view>
						</view>
					</picker>
				</view>

				<view class="flex" style="flex:1;height: 72rpx;padding: 0 24rpx;border-radius: 72rpx;justify-content:space-between ;align-items: center;background-color: #FFF;margin-left: 24rpx;">
					<picker style="flex:1;" @change="statusPickerChange" :value="statusIndex" :range="statusPicker">
						<view class="flex" style="align-items: center;justify-content:space-between;">
							<view class="picker cuIcon-light">
								{{statusIndex>-1?statusPicker[statusIndex]:'全部状态'}}
							</view>
							<view class="cuIcon-right"></view>
						</view>
					</picker>
				</view>
			</view>
		</view>

		<view class="flex" style="flex:1;height: 72rpx;padding: 0 24rpx;border-radius: 72rpx;justify-content:space-between;align-items: center;background-color: #FFF;">
			<picker style="flex:1;" mode="date" :value="date" @change="DateChange">
				<view class="flex" style="align-items: center;justify-content:space-between;">
					<view class="picker cuIcon-time">
						{{date}}
					</view>
					<view v-if="date=='选择日期'" class="cuIcon-right"></view>
					<view v-else @tap.stop="delDate" class="cuIcon-close"></view>
				</view>
			</picker>
		</view>


		<view class="bg-white margin-top" style="padding:20rpx 10rpx;border-radius: 20rpx;">
			<view class="text-center" style="display: flex;padding:20rpx 10rpx;border-radius: 40rpx;background: #F0F5F6;">
				<view style="flex:1">创建时间</view>
				<view style="flex:1">金额</view>
				<view style="flex:1">钱包余额</view>
				<view style="flex:1">类型</view>
				<view style="flex:1">状态</view>
			</view>
			<scroll-view @scrolltolower="scrolltolower" :scroll-top="scrollTop" scroll-y style="margin-top:20rpx;height:50vh">
				<view v-for="(item,index) in priceData" :key="index">
					<view class="text-center" style="display: flex;padding:20rpx 0;border-bottom: 1px solid #f8f8f8;">
						<view style="flex:1">{{item.createTime}}</view>
						<view style="flex:1" :style="fontcolorFn(item.type)">￥{{item.tradeMoney/100}}</view>
						<view style="flex:1">￥{{item.remainBalance/100}}</view>
						<view style="flex:1;" :style="fontcolorFn(item.type)">{{item.type==-1?'下级扶持奖励':typePicker[item.type]}}</view>
						<view style="flex:1;">{{statusPicker[item.status]}}</view>
					</view>
					<view v-if="item.status==3&&item.remark" style="background-color: #f0f5f6;color: #ff5733;margin-bottom: 12rpx;padding: 0 12rpx;text-align: center;">
						{{item.remark}}
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
	import withdrawal from "../stats/components/withdrawal.vue"
	export default {
		components: {
			withdrawal
		},
		data() {
			return {
				date: '选择日期',
				statusIndex: 0,
				typePicker: ['扶持奖励', '结算', '分成', '提现', '对充', '全部类型'],
				statusPicker: ['全部状态', '待审', '成功', '无效', '处理中'],
				priceData: [],
				accountData: {},

				typeIndex: 5,
				pageNum: 1,
				flag: true,
				scrollTop: 0,
			}
		},
		mounted() {

		},
		created() {
			this.init()
		},
		onPullDownRefresh() {
			this.init()
			uni.stopPullDownRefresh();
		},
		computed: {
			...mapState({
				loading: state => state.publicStore.loading,
			})
		},
		methods: {
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
			fontcolorFn(type) {
				if (type == 2) {
					return 'color:#43cf7c'
				} else if (type == 3) {
					return 'color:#ff5733'
				}
			},
			delDate() {
				this.date = '选择日期';
				this.init()
			},
			getcashoutlist() {
				if (this.flag) {
					this.flag = false
					if (this.pageNum == 1) {
						this.scrollTop = 1;
						this.$nextTick(function() {
							this.scrollTop = 0;
						});
					}
					this.api.getcashoutlist({
						data: {
							getDetail: 1,
							date: this.date == '选择日期' ? '' : this.date,
							status: this.statusIndex ? this.statusIndex : '',
							type: this.typeIndex != 5 ? this.typeIndex : '',
							current: this.pageNum,
							size: 10
						},
						success: (res) => {
							console.log(333, res)


							try {
								this.accountData = res.data.data
								if (this.pageNum > 1) { //第二页起
									this.priceData = [...this.priceData, ...res.data.data.pages.records]
								} else if (this.pageNum == 1) { //首页
									this.priceData = res.data.data.pages.records
								}
								if (res.data.data.pages.records.length < 10) { //没下一页
									this.pageNum = null
								}
							} catch (e) {
								this.accountData = {}
								this.priceData = []
							}							
							this.flag = true
							console.log(this.priceData.length)
						}
					})
				}

			},
			init(t) {
				if (t != 'next') {
					this.pageNum = 1 //分页直接第一页
				}
				this.getcashoutlist()
			},
			DateChange(e) {
				this.date = e.detail.value;
				this.init()
			},
			typePickerChange(e) {
				this.typeIndex = e.detail.value;
				this.init()
			},
			statusPickerChange(e) {
				this.statusIndex = e.detail.value;
				this.init()
			},
			scrolltolower() { //列表滚动到底部
				if (this.pageNum && !this.loading) {
					this.pageNum++
					this.init('next')
				}
			},
		}
	}
</script>

<style scoped>
	.search-item {
		flex: 1;
		border-radius: 60rpx;
		height: 78rpx;
	}
</style>
