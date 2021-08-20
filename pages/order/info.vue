<template>
	<view style="min-height: 100vh;background-color: #F0F5F6;">
		<view style="line-height: 50rpx;color: #ff5733;font-size: 26rpx;padding:10rpx 20rpx;">
			<view>1、“首购”即为有效的新客订单；</view>
			<view>2、订单明细30分钟更新一次，非实时</view>
		</view>
		<view style="background-color: #FFF;padding: 10rpx 0;">
			<view style="margin: 20rpx;">
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

				<view class="margin-top" style="display: flex;justify-content: space-between;">
					<view class="flex" style="flex:1;height: 72rpx;padding: 0 24rpx;border-radius: 72rpx;justify-content:space-between ;align-items: center;background: #F0F5F6;margin-right: 24rpx;">
						<picker style="flex: 1;" @change="typePickerChange" :value="typeIndex" :range="typePicker">
							<view class="flex " style="align-items: center;justify-content:space-between;">
								<view class="picker cuIcon-light flex" style="align-items: center;">
									{{typeIndex>-1?typePicker[typeIndex]:'全部类型'}}
								</view>
								<view class="cuIcon-right"></view>
							</view>
						</picker>
					</view>
					<view class="flex" style="flex:1;height: 72rpx;padding: 0 24rpx;border-radius: 72rpx;justify-content:space-between ;align-items: center;margin-left: 24rpx;">

					</view>
				</view>
			</view>
		</view>
		<view>
			<view class="bg-white" style="padding:20rpx 10rpx;border-radius: 20rpx;">
				<view class="text-center" style="display: flex;padding:20rpx 10rpx;border-radius: 40rpx;background: #F0F5F6;">
					<view style="flex:1">门店名称</view>
					<view style="flex:1">支付时间</view>
					<view style="flex:1">订单交易额</view>
					<view style="flex:1">订单类型</view>
					<view style="flex:1">状态</view>
				</view>
				<view v-if="list.length">
					<view v-for="(item,index) in list" :key='index'>
						<view class="text-center" style="padding:20rpx;border-bottom: 1px solid #f8f8f8;">
							<view style="display: flex;">
								<view class="text-cut" style="flex:1">{{item.smstitle}}</view>
								<view style="flex:1">{{item.paytime}}</view>
								<view style="flex:1">￥{{item.payprice/100}}</view>
								<view style="flex:1">{{item.tradeTypeList}}</view>
								<view style="flex:1;text-align: right;">{{statusFn(item.status)}}</view>
							</view>
						</view>
					</view>
				</view>

				<view v-if="listLoading">
					<view class="cu-load loading"></view>
				</view>
				<view v-else class="text-center margin-top">--暂无更多数据--</view>

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: '选择日期',
				typeIndex: 0,
				statusIndex: 0,


				typePicker: ['全部类型', '首购'],
				typeVal: ['', 3],

				statusPicker: ['全部状态', '已付款', '已完成', '已退款&风控'],
				statusVal: ['', 1, 8, 9],
				sid: '',
				teamNum: 0,			
				current: 1,

				list: [],

				listLoading: false
			}
		},
		onLoad(e) {
			this.sid = e.sid
			this.init()
		},
		onReachBottom(e) {
			if (this.current < this.teamNum / 20) {
				this.current += 1;
				this.init()
			}
		},
		methods: {
			statusFn(val) {
				let text = '';
				if (val == 9) {
					text = '已退款&风控'
				} else if (val == 8) {
					text = '已完成'
				} else if (val == 1) {
					text = '已付款'
				}
				return text;
			},
			delDate() {
				this.date = '选择日期';
				this.current = 1
				this.list = []
				this.init()
			},
			DateChange(e) {
				this.date = e.detail.value;
				this.current = 1
				this.list = []
				this.init()
			},
			typePickerChange(e) {
				this.typeIndex = e.detail.value;
				this.current = 1
				this.list = []
				this.init()
			},
			statusPickerChange(e) {
				this.statusIndex = e.detail.value;
				this.current = 1
				this.list = []
				this.init()
			},
			init() {
				let statusIndex = this.statusIndex || '';
				if (this.statusIndex == 2) {
					statusIndex = 8
				} else if (this.statusIndex == 3) {
					statusIndex = 9
				}
				this.api.getMtOrderList({
					data: {
						current: this.current,
						size: 20,
						sid: this.sid,
						date: this.date == '选择日期' ? '' : this.date,
						status: statusIndex,
						type: this.typeVal[this.typeIndex]
					},
					success: (e) => {
						console.log("332423", e)
						this.teamNum = e.data.data.total
						this.list = [...this.list,...e.data.data.records]
					}
				})
			}
		}
	}
</script>

<style>
</style>
