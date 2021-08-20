<template>
	<view>
		<button @tap="showPop" style="height: 60rpx;line-height: 60rpx;margin: 0;padding:0 40rpx;background: #E5CF6F;font-size: 26rpx;">提现</button>
		<uni-popup :show="withdrawalShow" position="middle">
			<view style="position: relative;width:84vw;padding:30rpx 50rpx;background: #f8f8f8;border-radius: 30rpx;">
				<view @tap="closeShow" class="cuIcon-close" style="width: 60rpx;height: 60rpx;text-align: center;position: absolute;right:0rpx;top:-60rpx;border-radius: 50%;font-size: 44rpx;color:#ccc;border: 3px solid #ccc;"></view>
				<view class="text-center" style="font-size: 30rpx;">提现金额</view>


				<view class="text-center" style="width:40vw;display: flex;align-items: center;margin:40rpx auto">
					<input type="number" style="height:70rpx;line-height: 50rpx;background: #F0F5F6;" v-model="tradeMoney" />
					<text>元</text>
				</view>

				<view class="text-center" style="padding-bottom: 20rpx;border-bottom: 1px solid #E5E5E5;color:#FF5733">可提现金额：￥{{priceData.accountBalance/100}}</view>

				<view class="margin-top cu-form-group radius">
					<view v-if="bankCardNo" class="title">到账银行卡:{{bankCardNo}}</view>
				</view>
				<!-- <view class="margin-top cu-form-group radius">
					<view class="title">真实姓名</view>
					<input v-model="userName" placeholder="请输入真实姓名" name="input"></input>
				</view> -->

				<view style="margin-top:20rpx;padding:20rpx;border-radius: 20rpx;background: #F0F5F6;color:#FF5733">
					<view>注意事项</view>
					<view>1、提现手续费1%，最低收取手续费1元
					</view>
					<view>2、单笔最小提现金额为10元
					</view>
					<view>3、首次提现需完成身份信息验证</view>
				</view>

				<view>
					<button @tap="submit" form-type="submit" class="margin-top cu-btn block margin-tb-sm lg text-white" style="background: #FF5733;">
						<text v-if="loading" class="cuIcon-loading2 cuIconfont-spin"></text>
						申请提现</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
	} from 'vuex';
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		props: {
			priceData: {
				type: Object,
				default () {
					return {}
				}
			},
			init: {
				type: Function,
				default: null
			}
		},
		data() {
			return {
				amount: '',
				loading: false,
				tradeMoney: '',
				account: '',
				userName: '',

				bankCardNo: ''
			};
		},
		computed: {
			...mapState({
				withdrawalShow: state => state.statsStore.withdrawalShow,
			})
		},
		methods: {
			...mapMutations(['setwithdrawalShow']),
			resetNum(val) {
				var arr = String(val).split('');
				let str = ''
				arr.map((item, index) => {
					if (index > 3 && index < arr.length - 4) {
						str += '*'
					} else {
						str += item
					}
				})
				return str;
			},
			showPop() {
				this.api.getsalarydetail({
					success: (res) => {
						console.log(3333, res)
						const noData = () => {
							uni.showModal({
								title: '温馨提示',
								content: '需要完善资料后才可提现',
								showCancel: false,
								success: (res) => {
									this.topage()
								}
							});
						}
						// 0-未提交认证 1-认证审核中 2-认证失败 3认证成功
						
						try {
							let status = res.data.data.status;
							if (status === 3) {
								this.bankCardNo = this.resetNum(res.data.data.bankCardNo);
								this.setwithdrawalShow(true)
							} else if (status === 1) {
								uni.navigateTo({
									url: '/pages/stats/review?index=1'
								})
							} else if (status === 0) {
								noData()
							} else if (status === 2) {
								uni.navigateTo({
									url: '/pages/stats/review?index=2&remark='+res.data.data.remark
								})
							}else{
								//未提审时data为空-现在默认status为0
								noData()
							}
						} catch (e) {
							uni.showToast({
								title: '未知异常，请稍候重试或联系客服',
								icon: 'none',
								duration: 2000
							});
						}
					}
				})
			},
			closeShow() {
				this.setwithdrawalShow(false)
			},
			
			dayCha(time) {
				time = time.replace(new RegExp("-", "gm"), "/");
				var timeMiao = new Date(time).getTime()
				var thatTimeMiao = new Date().getTime();
				var chaTime = timeMiao - thatTimeMiao;
				return chaTime
			},
			
			postData() {
				let tradeMoney = this.tradeMoney * 100;
				if (tradeMoney < 999) {
					uni.showToast({
						title: '提现金额不能小于10',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (this.priceData.accountBalance < 999) {
					uni.showToast({
						title: '可提现金额不足10元不能申请提现',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (tradeMoney > this.priceData.accountBalance) {
					uni.showToast({
						title: `可提现金额不能大于${this.priceData.accountBalance/100}`,
						icon: 'none',
						duration: 2000
					});
					return
				}
				this.loading = true;
				this.api.postcashoutsubmit({
					data: {
						tradeMoney: this.tradeMoney * 100,
						// remark: `支付宝姓名：${this.userName}<br/>支付宝账号：${this.account}`
					},
					success: (res) => {
						console.log('提现结果', res)
						this.loading = false;
						if (res.data.code == 200) {
							//提现成功十分钟内禁止发起提现
							var tradeMoneyTime = new Date().getTime();
							uni.setStorageSync('tradeMoneyTime',tradeMoneyTime)
							
							this.init(); //更新列表
							uni.showModal({
								title: '温馨提示',
								content: '申请成功',
								showCancel: false,
								success: (res) => {
									this.closeShow()
									uni.navigateTo({
										url: '/pages/user/accountRecord'
									})
								}
							});
						}
					}
				})
			},
			submit() {
				if(!this.loading){
					if(uni.getStorageSync('tradeMoneyTime')){
						var thatTimeMiao = new Date().getTime();
						var chaTime = thatTimeMiao - uni.getStorageSync('tradeMoneyTime');
						if(chaTime<600000){
							uni.showToast({
								title: '提现时间间隔不能小于10分钟，请稍候重试',
								icon: 'none',
								duration: 2000
							});
						}else{
							this.postData()
						}
					}else{
						this.postData()
					}
				}else{
					uni.showToast({
						title: '正在提现中，请耐心等待',
						icon: 'none',
						duration: 2000
					});
				}
			},
			topage() {
				uni.navigateTo({
					url: '/pages/stats/idCard'
				})
			}
		}
	}
</script>

<style lang="less">
	.form-item {
		border-radius: 60rpx;
	}
</style>
