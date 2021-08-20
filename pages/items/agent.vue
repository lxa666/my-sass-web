<template>
	<view style="background-color: #FFF;min-height: 100vh;">
		<view style="background-image: linear-gradient(to right, #368dfe , #56b7fe);">
			<view class="flex" style="align-items: flex-end;padding:70rpx 30rpx;border-bottom: 1px solid #e5e5e5;">
				<view style="background-color: #FFF;padding: 12rpx;border-radius: 20rpx;">
					<image src="../../static/user/logo.png" style="width: 100rpx;height: 100rpx;"></image>
				</view>
				<view style="margin-left: 12rpx;flex:1;line-height: 42rpx;">
					<view class="flex">
						<view style="font-size: 28rpx;color: #FFF;font-weight: 600;">
							{{agentlist.agentName}}{{agentlist.remarkName?`(${agentlist.remarkName})`:''}}
						</view>
						<view @tap.stop="showRemarkname(itemInfo)" class="margin-left" style="color:#FF5733;">
							修改备注
						</view>
					</view>
					<view style="font-size: 28rpx;color: #FFF;font-weight: 600;">
						{{agentlist.agentMobile}}
					</view>
					<view style="font-size: 28rpx;color: #FFF;font-weight: 600;">
						团队人数：{{agentlist.teamNum}}
					</view>
				</view>
			</view>
		</view>

		<view v-if="agentlist.pages.length" style="padding:0 20rpx 20rpx;">
			<view v-for="(item,index) in agentlist.pages" :key="index" style="margin-top: 20rpx;background: #fff;border-radius: 20rpx;padding:20rpx;">
				<view style="font-weight: bold;font-size: 28rpx;color: #505050;">{{item.activityName}}</view>
				<view class="flex" style="justify-content:space-between;align-items: center;padding: 20rpx 0;border-bottom: 1px solid #e5e5e5;">
					<view>
						<image :src="item.brandLogo" style="width: 130rpx;height: 130rpx;"></image>
					</view>
					<view style="min-height: 120rpx;display: flex;justify-content: space-between;flex-direction: column;font-size: 22rpx;color: #383838;">
						<view style="background-color: #f0f5f6;padding:6rpx 12rpx;border-radius: 10rpx;">
							结算价<span style="padding-left: 6rpx;color: #ff5733;font-weight: bold;font-size: 36rpx;">￥{{keepTwoDecimalFull(item.settleMoney)}}</span>
						</view>
						<view style="font-size: 28rpx;">
							扶持奖励：<span style="color: #43cf7c;font-size: 32rpx;">{{keepTwoDecimalFull(item.subReward)}}</span>元/单
						</view>
					</view>
					<view>
						<view style="height: 48rpx;line-height: 48rpx;color: #ff5733;font-size: 24rpx;border: 1px solid #ff5733;text-align: center;border-radius: 10rpx;">
							抽成比例{{item.radio}}%
						</view>
						<button class="margin-top" @tap.stop="actionShow(item.activityId,item.settleMoney,item.upperSysReward,item.upperHighestRadio)" size="mini"
						 style="background: #FF5733;color:#fff">修改价格</button>
					</view>
				</view>
				<view class="flex" style="margin-top: 20rpx;justify-content:space-between;background-color: #f0f5f6;border-radius: 28rpx;padding: 6rpx 24rpx;">
					<view>
						推广单量
					</view>
					<view>
						待结算收益
					</view>
					<view>
						累计贡献收益
					</view>
				</view>
				<view class="flex" style="justify-content:space-between;padding: 6rpx 24rpx;">
					<view>
						{{item.putNum}}
					</view>
					<view style="color: #ff5733;">
						￥{{item.allUnsettledMoney/100}}
					</view>
					<view style="color: #ff5733;">
						￥{{item.allSettledMoney/100}}
					</view>
				</view>
			</view>
		</view>
		<view v-else class="margin-top" style="text-align: center;">
			--该代理暂无参与任何活动--
		</view>

		<view class="cu-modal" :class="userId?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改抽成比例</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="font-weight: 600;">
					<view style="text-align: left;margin-bottom: 6rpx;">
						抽成比例
					</view>
					<view class="flex" style="align-items: center;">
						<input @input="subrateFn" style="border-radius: 20rpx;margin-right: 12rpx;background-color: #FFF;height: 70rpx;width: 200rpx;"
						 type="number" v-model="subrate" placeholder="" name="input"></input>%<span style="font-size: 20rpx;color: #ff5733;">(上限{{TeamRate}}%)</span>
					</view>
				</view>

				<view class="padding-xl" style="font-weight: 600;border-bottom: .5px solid #e5e5e5;">
					<view style="text-align: left;margin-bottom: 6rpx;">
						结算价格
					</view>
					<view class="flex" style="align-items: center;">
						<input @input="priceFn" style="border-radius: 20rpx;margin-right: 12rpx;background-color: #FFF;height: 70rpx;width: 200rpx;"
						 type="number" v-model="price" placeholder="" name="input"></input> 元/单<span style="font-size: 20rpx;color: #ff5733;">(上限{{keepTwoDecimalFull(settleMoney)}}元)</span>
					</view>
				</view>

				<view v-if="sysReward" class="padding-xl" style="font-weight: 600;">
					<view style="text-align: left;margin-bottom: 6rpx;">
						扶持奖励
					</view>
					<view class="flex" style="align-items: center;">
						<input style="border-radius: 20rpx;margin-right: 12rpx;background-color: #FFF;height: 70rpx;width: 200rpx;" type="number"
						 v-model="subReward" placeholder="" name="input"></input> 元/单<span style="font-size: 20rpx;color: #ff5733;">(上限{{keepTwoDecimalFull(sysReward)}}元)</span>
					</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn bg-green margin-left" style="background-color: #FF5733;border-radius: 60rpx;box-shadow: 0px 2px 6px 0px rgba(255, 87, 51, 0.3);"
						 @tap="posteditrate(subrate)">
							确认修改</button>
					</view>
				</view>
			</view>
		</view>
		<Remarkname :relAgentId="relAgentId" :hideRemarkname="hideRemarkname" />
	</view>

</template>

<script>
	import Remarkname from "./components/Remarkname.vue"
	import {
		mapState,
		mapMutations,
	} from 'vuex';
	
	// 由后台配置~~
	// import {
	// 	TeamRate
	// } from "@/common/const.js"
	export default {
		components: {
			Remarkname
		},
		data() {
			return {
				TeamRate:0,
				agentlist: {
					pages: []
				},
				userId: '',
				subrate: '',

				price: '',

				mobile: '',

				relAgentId: '',

				id: null,
				activityId: '',

				subReward: '',

				sysReward: '', //扶持奖励

				settleMoney: null, //修改价格需要用到
			}
		},
		computed: {
			...mapState({
				itemInfo: state => state.itemsStore.itemPriceInfo,
			})
		},
		onLoad(e) {
			console.log(3334, this.itemInfo.userId);
			this.id = e.userId || this.itemInfo.userId
		},
		onPullDownRefresh() {
			this.init()
			uni.stopPullDownRefresh();
		},
		mounted() {
			this.init()
		},
		methods: {
			//关闭备注
			hideRemarkname() {
				this.relAgentId = ''
				this.init()
			},
			showRemarkname(item) {
				this.relAgentId = this.id
			},

			close() {
				this.mobile = '';
				this.init()
			},

			subrateFn(e) {
				console.log(e.target.value)
				this.price = this.setDataFn(e.target.value)
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
			priceFn(e) {
				console.log(e.target.value);
				let highPrice = this.settleMoney / 100;
				let subrate = ((highPrice - e.target.value) / highPrice * 100).toFixed(1);
				subrate < 0 ? subrate = 0 : null;
				this.subrate = subrate
			},
			setDataFn(val, settleMoney) {

				let highPrice = settleMoney || this.settleMoney;
				return this.keepTwoDecimalFull((highPrice - highPrice * val / 100))
			},

			hideModal() {
				this.userId = ''
				this.subrate = ''
			},
			actionShow(id, settleMoney, sysReward,TeamRate) {
				this.TeamRate = TeamRate;
				this.sysReward = sysReward;
				let activitylist = uni.getStorageSync('activitylist');
				activitylist.map(item => {
					if (item.id == id) {
						settleMoney = item.highPrice
					}
				})
				this.price = '';
				this.subrate = '';
				this.settleMoney = settleMoney;
				this.activityId = id;
				this.userId = this.id
			},
			posteditrate() {
				let sysReward = this.sysReward / 100;
				if (sysReward) {
					if (this.subReward > sysReward) {
						uni.showToast({
							title: "可调整的最大扶持奖励为" + sysReward + "元，请修改后再提交",
							icon: 'none',
							duration: 2000
						});
						return
					}
					if (this.subReward < 0) {
						uni.showToast({
							title: "可调整的最小扶持奖励为0,请修改后再提交",
							icon: 'none',
							duration: 2000
						});
						return
					}
					if (this.subrate === '' && this.subReward === '') {
						return true;
					}
				} else {
					if (this.subrate === '') {
						return true;
					}
				}

				if (this.subrate > this.TeamRate) {
					uni.showToast({
						title: "可调整的最大比例为" + this.TeamRate + "%请修改后再提交",
						icon: 'none',
						duration: 2000
					});
					return
				}

				if (this.subrate < 0) {
					uni.showToast({
						title: "可调整的最小比例为0%请修改后再提交",
						icon: 'none',
						duration: 2000
					});
					return
				}
				
				let highPrice = this.settleMoney / 100;
				if (this.price > highPrice) {
					uni.showToast({
						title: "可调整的最高结算价为" + highPrice.toFixed(2) + '元',
						icon: 'none',
						duration: 2000
					});
					return
				}

				let rate = this.subrate,
					subReward;
				rate = rate ? Number(rate).toFixed(2) : '';
				subReward = this.subReward == '' ? '' : Number((this.subReward * 100).toFixed(0))

				this.api.posteditrate({
					data: {
						rate: rate,
						userIds: this.userId,
						subReward: subReward,
						activityId: this.activityId
					},
					success: (res) => {
						this.subReward = ''
						this.rate = ''
						this.subrate = ''
						this.userId = ''
						this.init()
					}
				})
			},
			init() {
				this.api.getAgentactivitylist({
					data: {
						userId: this.id
					},
					success: (res) => {
						this.agentlist = res.data.data
					}
				})

			}
		}
	}
</script>

<style>
</style>
