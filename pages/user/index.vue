<template>
	<view style="padding:20rpx;background-color: #F0F5F6;min-height: 100vh;">
		<!-- 个人资料卡片start -->
		<view style="display: flex;padding:60rpx 30rpx 120rpx;border-radius: 20rpx;background: linear-gradient(to bottom,#FF6965,#FFA37D);box-shadow: 0px 7px 7px 0px rgba(255, 87, 51, 0.2);">
			<view style="display: inline-block;padding:20rpx;background: #fff;border-radius: 20rpx;">
				<image style="width:110rpx;height:100rpx;" src="../../static/user/logo.png" />
			</view>
			<view style="flex:1;margin-left:20rpx;line-height: 50rpx;">
				<view class="flex" style="justify-content: space-between;color:#fff;font-size: 32rpx;">
					<view>{{userInfo.agentName||'空'}}</view>
				</view>
				<view style="color:#fff;font-size: 32rpx;">{{userInfo.agentMobile||'空'}}</view>
				<view @tap="uniCopyFn(userInfo.promoCode)" style="color:#fff;font-size: 32rpx;display: flex;">推广码：{{userInfo.promoCode||'空'}}
					<view class="cuIcon-copy"></view>
				</view>
			</view>
		</view>
		<!-- 个人资料卡片end -->


		<view style="margin-top: -80rpx;padding: 20rpx;">
			<!-- 钱包余额start -->
			<view style="padding:20rpx 40rpx;background: #FFF;border-radius: 20rpx;box-shadow: 0px 7px 7px 0px rgba(153, 153, 153, 0.1);">
				<view style="display: flex;justify-content: space-between;align-items: flex-end;padding-bottom: 24rpx;border-bottom: .5px solid #e5e5e5;font-size: 1.2em;">
					<view style="color:#333">钱包余额
						<span style="color: #ff5733;font-size: 40rpx;font-weight: bold;padding-left: 12rpx;">￥{{keepTwoDecimalFull(accountData.accountBalance)}}</span>
					</view>
					<view>
						<button @tap="topage('/pages/user/accountRecord')" style="height: 60rpx;line-height: 60rpx;margin: 0;padding:0 40rpx;background: #ff5733;font-size: 26rpx;color: #FFF;">查看钱包</button>
					</view>
				</view>
				<view class="flex" style="padding-top: 24rpx;text-align: center;color: #383838;font-size: 28rpx;line-height: 50rpx;">
					<view style="flex:1;color: #333;">
						<view style="color: #ff5733;font-size: 32rpx;font-weight: bold;">￥{{keepTwoDecimalFull(accountData.unsettled)}}</view>
						<view>待结算入账</view>
					</view>
					<view style="flex:1;color: #333;">
						<view style="color: #ff5733;font-size: 32rpx;font-weight: bold;">￥{{keepTwoDecimalFull(accountData.cashouting)}}</view>
						<view>提现中</view>
					</view>
					<view style="flex:1;color: #333;">
						<view style="color: #ff5733;font-size: 32rpx;font-weight: bold;">￥{{keepTwoDecimalFull(accountData.allCashout)}}</view>
						<view>已提现</view>
					</view>
				</view>
			</view>
			<!-- 钱包余额end -->
			<view class="menu-list">
				<view @tap="topage('/pages/open/code')" class="item">
					<view class="lf">
						<image src="../../static/user/gzh.png"></image>
						<view style="font-size: 28rpx;color: #808080;">关注公众号接收重要通知</view>
					</view>
					<view class="cuIcon-right" style="font-size: 36rpx;"></view>
				</view>
			</view>
			<view class="flex" style="background-color: #FFF;box-shadow: 0px 7px 7px 0px rgba(153, 153, 153, 0.1);color: #505050;font-weight: bold;font-size: 28rpx;align-items: center;justify-content: center;text-align: center;padding: 20rpx 0;line-height: 70rpx;border-radius: 20rpx;">
				<view @tap="topage('/pages/user/team')" style="flex:1;color: #333;">
					<view>团队管理</view>
					<image src="../../static/user/td.png" style="width:96rpx;" mode="widthFix"></image>
				</view>
				<view @tap="topage('/pages/user/inviteInfo')" style="flex:1;color: #333;">
					<view>推广下级</view>
					<image src="../../static/user/tg.png" style="width:96rpx;" mode="widthFix"></image>
				</view>
				<view @tap="showAgent" style="flex:1;color: #333;">
					<view>联系上级</view>
					<image src="../../static/user/lx.png" style="width:96rpx;" mode="widthFix"></image>
				</view>
			</view>

			<view class="flex" style="margin-top: 20rpx;background-color: #FFF;box-shadow: 0px 7px 7px 0px rgba(153, 153, 153, 0.1);color: #505050;font-size: 28rpx;align-items: center;justify-content: center;text-align: center;padding: 40rpx 0;line-height: 40rpx;border-radius: 20rpx;">
				<view @tap="topage('/pages/user/accountBinding')" style="flex:1;color: #808080;">
					<image src="../../static/user/gzgzh.png" style="width:56rpx;" mode="widthFix"></image>
					<view>认证资料</view>
				</view>
				<view @tap="changePsw" style="flex:1;color: #808080;">
					<image src="../../static/user/xgmm.png" style="width:56rpx;" mode="widthFix"></image>
					<view>修改密码</view>
				</view>
				<view @tap="topage('/pages/user/myAdvice')" style="flex:1;color: #808080;">
					<image src="../../static/user/yjfk.png" style="width:56rpx;" mode="widthFix"></image>
					<view>意见反馈</view>
				</view>
				<view @tap="reLaunchFn('/pages/open/login')" style="flex:1;color: #808080;">
					<image src="../../static/user/tcdl.png" style="width:56rpx;" mode="widthFix"></image>
					<view>退出登录</view>
				</view>
			</view>
		</view>

		<!-- 联系上级start -->
		<view class="cu-modal" :class="relData.relAgentMobile?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">联系上级</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>

				<view class="padding-xl" style="overflow: auto;max-height: 80vh;line-height: 60rpx;">
					<view style="font-size: 32rpx;">
						<view><span style="color: #808080;">姓名：</span>{{relData.relAgentName}}</view>
						<view class="flex" style="align-items: center;justify-content: center;"><span style="color: #808080;">
								手机号：</span>{{relData.relAgentMobile}}
						</view>
					</view>
				</view>

				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn bg-green margin-left" style="background-color: #FF5733;" @tap="uniCopyFn(relData.relAgentMobile)">复制手机号</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 联系上级end -->
		<change-psw></change-psw>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
	} from 'vuex';
	import changePsw from "./components/changePsw.vue"
	import uniCopy from "@/common/uni-copy.js"
	export default {
		components: {
			changePsw,
		},
		data() {
			return {
				cardCur: 0,
				dotStyle: false,
				towerStart: 0,
				direction: '',
				userInfo: {},
				accountData: {},
				relData: {}
			}
		},
		onShow() {
			if (uni.getStorageSync('userdetail')) {
				this.userInfo = uni.getStorageSync('userdetail')
			} else {
				this.init()
			}
		},
		created() {
			this.init()
		},
		onPullDownRefresh() {
			this.init()
			uni.stopPullDownRefresh();
		},
		methods: {
			...mapMutations(['setpswShow']),
			
			keepTwoDecimalFull(num) {
				if(isNaN(num)||num<0){
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
			hideModal() {
				this.relData = {};
			},
			showAgent() {
				if (this.userInfo.relAgentMobile) {
					this.relData = {
						relAgentMobile: this.userInfo.relAgentMobile,
						relAgentName: this.userInfo.relAgentName
					}
				} else {
					uni.showToast({
						title: '缺少渠道电话~',
						icon: 'none'
					})
				}
			},
			getcashoutlist() {
				this.api.getcashoutlist({
					data: {
						date: this.date == '选择日期' ? '' : this.date,
						status: this.statusIndex ? this.statusIndex : '',
						type: this.typeIndex != 5 ? this.typeIndex : '',
						getDetail: 0
					},
					success: (res) => {
						console.log(333, res)
						try {
							this.accountData = res.data.data
							this.priceData = res.data.data.pages.records
						} catch (e) {
							this.accountData = {}
							this.priceData = []
						}
					}
				})
			},
			uniCopyFn(val) {
				uniCopy({
					content: val,
					success: (res) => {
						uni.showToast({
							title: '已复制到剪切板!'
						})
					},
					error: (e) => {
						uni.showToast({
							title: 'err!'
						})
					}
				})
			},
			reLaunchFn(url) {
				uni.removeStorageSync('setUserLogin')
				uni.reLaunch({
					url: url
				})
			},
			topage(url) {
				uni.navigateTo({
					url: url
				})
			},
			init() {
				this.getcashoutlist()
				this.api.getuserdetail({
					data: {},
					success: (res) => {
						uni.setStorageSync('userdetail', res.data.data)
						this.userInfo = res.data.data
					}
				})
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			changePsw() {
				this.setpswShow(true)
			},
		}
	}
</script>

<style scoped>
	.panel {
		background-image: url('http://z.52laxin.top/peasant/resource/image/user-center-profile-bg.gif');
		background-size: 100% 100%;
		border-radius: 20rpx;
		margin: 30rpx;

	}

	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}


	.menu-list {
		margin-top: 20rpx;
	}

	.menu-list .item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		padding: 12rpx 30rpx;
		background: #fff;
		border-radius: 60rpx;
		box-shadow: 0px 7px 7px 0px rgba(153, 153, 153, 0.1);
	}

	.menu-list .item .lf {
		display: flex;
		align-items: center;
	}

	.menu-list .item .lf image {
		margin-right: 20rpx;
		width: 48rpx;
		height: 48rpx;
	}
</style>
