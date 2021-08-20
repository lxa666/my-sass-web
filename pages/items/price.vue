<template>
	<view>
		<view style="background-image: linear-gradient(to right, #368dfe , #56b7fe);">
			<view class="cu-bar search " style="padding-top: 30rpx;">
				<view class="search-form round" style="background-color: #FFF;">
					<text class="cuIcon-search"></text>
					<input v-model="mobile" :adjust-position="false" type="text" placeholder="请输入手机号搜索账户" confirm-type="search"></input>
					<text @tap="close" v-if="mobile" class='cuIcon-close text-bold'></text>
				</view>
				<view class="action">
					<button @tap="init(mobile)" class="cu-btn  shadow-blur round" style="background-color: #FF5733;color: #FFF;">搜索</button>
				</view>
			</view>

			<view class="flex margin-top" style="align-items: flex-end;padding: 30rpx;border-bottom: 1px solid #e5e5e5;">
				<view>
					<image :src="itemInfo.brandLogo" style="width: 120rpx;height: 120rpx;border-radius: 20rpx;"></image>
				</view>
				<view style="margin-left: 12rpx;flex:1;font-weight: bold;padding-bottom: 12rpx;">
					<view style="color: #FFF;">
						{{itemInfo.activityName}}
					</view>
					<view style="display: flex;align-items: flex-end;font-size: 28rpx;color: #FFF;">
						当前结算价<span style="padding:12rpx 24rpx;border-radius: 10rpx;background-color: #f0f5f6;margin:0 12rpx;color: #ff5733;font-weight: bold;font-size: 36rpx;">{{itemInfo.highPrice/100}}</span>元
					</view>
				</view>
				<view v-if="recordsList.length" style="padding-bottom: 12rpx;">
					<button @tap="allEdit" style="height: 56rpx;width: 176rpx;color: #ff5733;font-size: 24rpx;border-radius: 56rpx;box-shadow: 0px 2px 6px 0px #2a82e4;">{{batchEdit?'取消编辑':'批量修改'}}</button>
				</view>
			</view>
		</view>
		<view v-if="batchEdit">
			<view class="flex" style="justify-content: flex-end;;padding-right: 30rpx;margin-top: 20rpx;">
				<checkbox-group @change="allcheckboxChange">
					<view style="background-color: #FFF;padding: 12rpx 24rpx;border-radius: 20rpx;">
						全选<checkbox style="padding-left: 12rpx;font-size: 32rpx;transform:scale(0.7)" class='round' :class="allStatus?'checked':''"
						 :checked="allStatus?true:false" value="true"></checkbox>
					</view>
				</checkbox-group>
			</view>
			<view style="position: fixed;bottom: 0;width: 100vw;padding: 30rpx;">
				<view class="animation-slide-bottom">
					<button @tap="setChecked" style="background-color: #ff5733;color: #FFF;">确认选择</button>
				</view>
			</view>
		</view>
		<view v-if="recordsList.length">
			<view @tap="topage('/pages/items/agent',item)" v-for="(item,index) in recordsList" :key="item.id" class="search bg-white"
			 style="border-radius:20rpx;margin: 24rpx 30rpx;padding: 24rpx;line-height: 60rpx;">
				<view class="flex" style="justify-content: space-between;">
					<view class="flex">
						<view style="font-size: 28rpx;color: #505050;font-weight: 600;">
							{{item.agentName}}{{item.remarkName?`(${item.remarkName})`:''}}
						</view>
						<view v-if="!batchEdit" @tap.stop="showRemarkname(item)" class="margin-left" style="color:#FF5733;">
							修改备注
						</view>
					</view>
					<view v-if="batchEdit" @tap.stop>
						<checkbox-group @change="(e)=>{checkboxChange(e,index)}">
							<checkbox style="font-size: 32rpx;transform:scale(0.7)" class='round' :class="item.checked?'checked':''" :checked="item.checked?true:false"
							 :value="item.userId"></checkbox>
						</checkbox-group>
					</view>
				</view>
				<view class="flex" style="align-items: center;">
					<view style="flex: 1;">
						<view>
							结算价格：{{setDataFn(item.commissionRatio)}}元
						</view>
						<view>
							团队人数：{{item.myTeamNum}}
						</view>
					</view>
					<view v-if="!batchEdit">
						<view style="height: 48rpx;line-height: 48rpx;color: #ff5733;font-size: 24rpx;border: 1px solid #ff5733;text-align: center;border-radius: 10rpx;">
							抽成比例{{item.commissionRatio}}%
						</view>
						<button class="margin-top" @tap.stop="actionShow(item.userId)" size="mini" style="background: #FF5733;color:#fff">修改价格</button>
					</view>
				</view>
			</view>
		</view>		
		<view v-else>
			<view style="text-align: center;padding: 24rpx;">
				--暂无数据--
			</view>
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

				<view class="padding-xl" style="font-weight: 600;">
					<view style="text-align: left;margin-bottom: 6rpx;">
						结算价格
					</view>
					<view class="flex" style="align-items: center;">
						<input @input="priceFn" style="border-radius: 20rpx;margin-right: 12rpx;background-color: #FFF;height: 70rpx;width: 200rpx;"
						 type="number" v-model="price" placeholder="" name="input"></input> 元/单<span style="font-size: 20rpx;color: #ff5733;">(上限{{keepTwoDecimalFull(itemInfo.highPrice)}}元)</span>
					</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn bg-green margin-left" style="background-color: #FF5733;" @tap="posteditrate(subrate)">确认修改</button>
					</view>
				</view>
			</view>
		</view>
		<Remarkname :relAgentId="relAgentId" :hideRemarkname="hideRemarkname" />
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations,
	} from 'vuex';
	import {
		TeamRate
	} from "@/common/const.js"
	import Remarkname from "./components/Remarkname.vue"
	export default {
		components: {
			Remarkname
		},
		data() {
			return {
				TeamRate,
				batchEdit: false,
				allStatus: false, //全部选中为true

				recordsList: [],
				teamNum: '',

				userId: '',
				subrate: '',

				price: '',

				mobile: '',

				relAgentId: '',				
			}
		},
		onLoad(e) {

		},
		computed: {
			...mapState({
				itemInfo: state => state.itemsStore.itemInfo,
			})
		},
		onPullDownRefresh() {
			this.init()
			uni.stopPullDownRefresh();
		},
		onShow() {
			console.log('itemInfo',this.itemInfo)
		},
		mounted() {
			console.log(333, this.itemInfo);
			this.init()
		},
		methods: {
			...mapMutations(['itemPriceInfo']),
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

			//关闭备注
			hideRemarkname() {
				this.relAgentId = ''
				this.init()
			},
			showRemarkname(item) {
				this.relAgentId = item.userId
			},

			//确认选择
			setChecked() {
				let userId = ''
				this.recordsList.map((item, index) => {
					if (item.checked) {
						if (userId) userId += ',';
						userId += item.checked
					}
				})
				this.userId = userId;
				console.log("userId", userId)
			},

			//allcheckboxChange
			allcheckboxChange(e) {
				this.recordsList.map(item => {
					item.checked = e.detail.value[0] ? item.userId : null
				})
				this.allStatus = e.detail.value[0] ? true : false;
				console.log(this.recordsList)
			},

			//checkboxChange
			checkboxChange(e, i) {
				let userId = e.detail.value[0],
					list = this.recordsList
				if (userId) {
					list[i].checked = userId
				} else {
					list[i].checked = null
				}
				this.recordsList = [...list]
			},

			topage(url, item) {
				if (item) {
					this.itemPriceInfo(item)
				}
				//批量修改时禁止跳转事件
				if (!this.batchEdit) {
					uni.navigateTo({
						url: url + '?userId=' + item.userId
					})
				}
			},
			close() {
				this.mobile = '';

				this.init()
			},
			allEdit() {
				this.batchEdit = !this.batchEdit;
			},
			subrateFn(e) {
				console.log(e.target.value)
				this.price = this.setDataFn(e.target.value > 10 ? 10 : e.target.value)
			},
			priceFn(e) {
				console.log(e.target.value);
				let highPrice = this.itemInfo.highPrice / 100;
				let subrate = ((highPrice - e.target.value) / highPrice * 100).toFixed(1);
				subrate < 0 ? subrate = 0 : null;
				this.subrate = subrate
			},
			setDataFn(val) {
				let highPrice = this.itemInfo.highPrice;
				return this.keepTwoDecimalFull((highPrice - highPrice * val / 100))
			},

			hideModal() {
				this.userId = ''
				this.subrate = ''
			},
			actionShow(id) {
				this.price = '';
				this.subrate = '';
				console.log("id", id)
				this.userId = id
			},
			posteditrate() {
				if (isNaN(this.subrate)) {
					uni.showToast({
						title: "不可以填写非数，请修改后提交",
						icon: 'none',
						duration: 2000
					});
					return true;
				}
				
				if (this.subrate > TeamRate) {
					uni.showToast({
						title: "可调整的最大比例为"+TeamRate+"%请修改后再提交",
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
				
				let rate = this.subrate
				if (rate !== 0 && !rate) {
					console.log("异常")
					return
				}
				rate = Number(rate)
				rate = Math.floor(rate*100)/100
				this.api.posteditrate({
					data: {
						rate: rate,
						userIds: this.userId,
						activityId: this.itemInfo.id,
					},
					success: (res) => {						
						this.subrate = ''
						this.userId = ''
						this.batchEdit = false;
						this.allStatus = false
						this.init()
					}
				})
			},
			init(mobile = '') {
				this.api.getagentlist({
					data: {
						activityId: this.itemInfo.id,
						agentMobile: mobile
					},
					success: (res) => {
						this.recordsList = res.data.data.pages
						console.log("this.recordsList", this.recordsList)
						this.teamNum = res.data.data.teamNum
					}
				})
			}
		}
	}
</script>

<style>
</style>
