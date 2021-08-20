<template>
	<veiw>
		<view v-if="taskData&&taskData.status==1">
			<view style="margin: 24rpx;padding: 48rpx;border-radius: 24rpx;background-color: #FFF;">
				<view>
					<view class="flex" style="align-items: center;">
						<view v-if="taskData.logo">
							<image :src="taskData.logo" style="width: 100rpx;max-height: 150rpx;" mode="widthFix" />
						</view>
						<view style="padding: 12rpx;font-size: 1.2em;font-weight: 600;">
							{{taskData.activityName}}
						</view>
					</view>
					<view style="text-align: center;">
						<view v-if="taskData.agentName" class="flex margin-top" style="font-size: 1.2em;align-items: center;">
							<view style="width: 5em;text-align: right;">姓名:</view>
							<view style="background-color: #e5e5e5;margin-left: 24rpx;padding: 12rpx;border-radius: 100rpx;width: 10em;">{{taskData.agentName}}</view>
						</view>
						<view v-if="taskData.applyMobile" class="flex margin-top" style="font-size: 1.2em;align-items: center;">
							<view style="width: 5em;text-align: right;">电话:</view>
							<view style="background-color: #e5e5e5;margin-left: 24rpx;padding: 12rpx;border-radius: 100rpx;width: 10em;">{{taskData.applyMobile}}</view>
						</view>
						<view class="flex margin-top" style="font-size: 1.2em;align-items: center;">
							<view style="width: 5em;text-align: right;">所在地区:</view>
							<view style="background-color: #e5e5e5;margin-left: 24rpx;padding: 12rpx;border-radius: 100rpx;min-width: 4.5em;">{{taskData.relRegionCode}}</view>
						</view>
					</view>

					<view class="margin-top" style="text-align: center;display: flex;justify-content: center;">
						<view class="margin-top" style="background-color: #e5e5e5;margin-left: 24rpx;padding: 12rpx;border-radius: 100rpx;width: 9em;">资料审核中</view>
					</view>
					<view class="margin-top" style="color: #a6a6a6;text-align: center;">资料审核需要5-20分钟，请耐心等待</view>

					<view class="margin-top">
						<view style="background-color: #f0f5f6;padding: 24rpx;border-radius: 24rpx;min-height: 8em;color: red;line-height: 60rpx;">
							<view v-html="taskData.activityGuide" class="margin-top" style="color: #FF5733;">

							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view v-else>
			<view v-if="time" class="flex" style="font-weight: bold;font-size: 28rpx;color: #505050;background-color: #FFF;margin: 24rpx;padding:0 20rpx;line-height: 72rpx;align-items: center;justify-content: space-between;border-radius: 40rpx;">
				<view class="cuIcon-time flex" style="align-items: center;color: #FF5733;font-weight: 600;font-size: 38rpx;">
					<span style="color: #a6a6a6;padding-left: 6rpx;font-size: 28rpx;">
						截止时间
					</span>
				</view>
				<view style="display: flex;justify-content: center;">
					<uni-countdown color="#FF5733" splitorColor="#FF5733" :time="time" :showColon="false"></uni-countdown>
				</view>
			</view>

			<view style="margin: 24rpx;background: #fff;border-radius: 20rpx;padding:20rpx;">
				<view class="flex" style="justify-content:space-between;padding: 20rpx 0;">
					<view>
						<image :src="taskData.logo||'../../static/user/logo.png'" style="width: 128rpx;height: 128rpx;" />
					</view>
					<view class="flex" style="flex: 1;padding-left: 12rpx;align-items: center;">
						<view style="font-weight: bold;font-size: 28rpx;color: #505050;">{{taskData.activityName}}</view>
					</view>
					<view class="flex" style="flex-direction:column;justify-content: space-between;">
						<view>
							<button @tap="laxinCodeFn(taskData.laxinCode)" class="cuIcon-qrcode" style="min-width: 7em;height: 60rpx;line-height: 60rpx;background: #FF5733;border-radius: 10rpx;font-size: 28rpx;color:#fff">
								查看推广码</button>
						</view>

						<view v-if="showbt()">
							<button @tap="actionTask(taskData)" style="min-width: 7em;height: 60rpx;line-height: 60rpx;background: #4fa8fe;border-radius: 10rpx;font-size: 28rpx;color:#fff">
								查看订单明细</button>
						</view>

					</view>
				</view>
			</view>

			<view style="text-align: center;background-color: #FFF;margin: 24rpx;border-radius: 20rpx;padding:30rpx 20rpx;">
				<view v-if="taskData.agentName" class="flex" style="font-size: 28rpx;align-items: center;">
					<view style="width: 5em;text-align: right;">姓名:</view>
					<view style="background-color: #e5e5e5;margin-left: 24rpx;padding: 12rpx;border-radius: 100rpx;width: 10em;">{{taskData.agentName}}</view>
				</view>
				<view v-if="taskData.applyMobile" class="flex margin-top" style="font-size: 28rpx;align-items: center;">
					<view style="width: 5em;text-align: right;">电话:</view>
					<view style="background-color: #e5e5e5;margin-left: 24rpx;padding: 12rpx;border-radius: 100rpx;width: 10em;">{{taskData.applyMobile}}</view>
				</view>
				<view class="flex margin-top" style="font-size: 28rpx;align-items: center;">
					<view style="width: 5em;text-align: right;">所在地区:</view>
					<view style="background-color: #e5e5e5;margin-left: 24rpx;padding: 12rpx;border-radius: 100rpx;min-width: 4.5em;">{{taskData.relRegionCode}}</view>
				</view>
			</view>

			<view style="margin: 24rpx 24rpx 120rpx;background-color: #FFF;padding: 24rpx;border-radius: 24rpx;">
				<view style="padding: 24rpx;background-color: #f0f5f6;border-radius: 24rpx;min-height: 8em;color: red;line-height: 60rpx;">
					<view v-html="taskData.activityGuide">

					</view>
				</view>
			</view>

			<view class="cu-modal" :class="laxinCode?'show':''">
				<view class="cu-dialog" style="background-color: unset;">
					<view class="margin-top" @tap="hideModal">
						<image style="width: 600rpx;height: 600rpx;" :src="laxinCode" />
					</view>
					<view style="color: #FFF;">
						长按图片保存
					</view>
				</view>
			</view>

			<view @tap="topage('/pages/order/guide')" data-target="Image" class="cu-bar tabbar bg-white shadow foot" style="z-index: 888;background: #FF5733;color:#fff;display: flex;justify-content: center;">
				<span>查看详细教程</span>
			</view>
		</view>
	</veiw>

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
				id: '',
				time: '',
				laxinCode: ''
			}
		},
		computed: {
			...mapState({
				taskData: state => state.publicStore.taskData,
				dataDetail: state => state.publicStore.dataDetail,
			})
		},
		onUnload() {

		},
		onLoad(e) {
			this.time = Number(e.time) || 0
		},
		methods: {
			actionTask(e) {
				uni.showToast({
					title: '暂无数据' + e.sid,
					icon: 'none',
					duration: 2000
				});
				uni.navigateTo({
					url: "/pages/order/info?sid=" + e.sid
				})
			},
			showbt() {
				let activityName = this.taskData.activityName
				if (activityName.indexOf("美团") != -1) {
					return true
				} else {
					return false
				}
			},
			laxinCodeFn(val) {
				let activityName = this.taskData.activityName
				if (activityName.indexOf("京东") != -1) {
					this.laxinCode = '../../static/order/jd.jpg'
				} else {
					this.laxinCode = val
				}
			},
			hideModal() {
				this.laxinCode = ''
			},
			back() {
				uni.navigateBack({})
			},
			topage(url) {
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style>
</style>
