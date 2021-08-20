<template>
	<view>
		<view style="min-height: 100vh;background-color: #F0F5F6;">
			<view style="background-image: linear-gradient(to right, #368dfe , #56b7fe);padding-bottom: 100rpx;min-height: 300rpx;">
				<view class="cu-bar search " style="padding-top: 30rpx;">
					<view class="search-form round" style="background-color: #FFF;">
						<text class="cuIcon-search"></text>
						<input @confirm="getData(mobile)" v-model="mobile" :adjust-position="false" type="text" placeholder="请输入手机号搜索账户" confirm-type="search"></input>
						<text @tap="cancelSearch" v-if="mobile" class='cuIcon-close text-bold'></text>
					</view>
					<!-- <view class="search-form round" style="background-color: #FFF;">
						<text class="cuIcon-search"></text>
						<input v-model="mobile" :adjust-position="false" type="text" placeholder="请输入手机号搜索账户" confirm-type="search"></input>
						<text @tap="cancelSearch" v-if="mobile" class='cuIcon-close text-bold'></text>
					</view>
					<view class="action">
						<button @tap="getData(mobile)" class="cu-btn  shadow-blur round" style="background-color: #fc0808;color: #FFF;">搜索</button>
					</view> -->
				</view>
			</view>
			<view style="margin:-170rpx 30rpx 30rpx;background: #fff;border-radius: 20rpx;padding:20rpx;">
				<view class="flex" style="align-items: center;border-bottom: .5px solid #e5e5e5;padding-bottom: 12rpx;">
					<view>
						<image :src="itemsData.logo||'../../static/user/logo.png'" style="width: 80rpx;height:80rpx;"></image>
					</view>
					<view style="flex:1;font-weight: bold;font-size: 28rpx;color: #505050;padding-left: 12rpx;">{{itemsData.name}}</view>
					<view>
						<button @tap="actionTask(itemsData.data[0])" class="cuIcon-add" style="background:#fc0808;min-width: 7em;height: 60rpx;line-height: 60rpx;border-radius: 10rpx;font-size: 24rpx;color:#fff">
							新增推广码</button>
					</view>
				</view>
				<view style="padding: 20rpx 0;font-size: 24rpx;text-align: center;">
					<view class="flex" style="align-items: center;justify-content: space-between;padding:12rpx 20rpx;color: #505050;background-color: #f0f5f6;border-radius: 100rpx;">
						<view style="flex: 1;">活动名称</view>
						<view style="flex: 1;">结算价</view>
						<view style="flex: 1;" v-if="itemsData.data[0].sysReward">扶持奖励</view>
					</view>
					<view style="padding: 20rpx 0;border-bottom: .5px solid #e5e5e5;">
						<view v-for="(item,index) in itemsData.data" :key="index" class="flex" style="align-items: center;padding:12rpx 20rpx;font-weight: bold;">
							<view class="fonthidden" style="flex:1;color: #505050;">{{item.activityName}}</view>
							<view style="flex:1;color: #fc0808;">￥{{keepTwoDecimalFull(item.highPrice)}}</view>
							<view style="flex:1;color: #43cf7c;" v-if="item.sysReward">￥{{keepTwoDecimalFull(item.sysReward)}}</view>
						</view>
					</view>
				</view>
			</view>

			<view class="flex align-center justify-around" style="padding:20rpx 0;background-color: #FFF;">
				<view style="flex:1;margin-right: 24rpx;;font-size: 34rpx;">
					<picker style="flex:1;" mode="date" :value="date" @change="DateChange">
						<view class="flex " style="align-items: center;justify-content: center;color: #383838;font-weight: bold;font-size: 28rpx;">
							<view class="picker" style="">
								{{date}}
							</view>
							<view v-if="date=='选择日期'"></view>
							<view v-else @tap.stop="delDate" class="cuIcon-close" style="margin-left: 1em;"></view>
						</view>
					</picker>
				</view>
				<view class="flex" style="flex:1;justify-content: center;">
					<view @tap="topage('/pages/order/guide',itemsData.data[0])" data-target="Image" style="z-index: 888;color:#fc0808;display: flex;justify-content: center;font-weight: bold;">
						<span>查看详细教程</span>
					</view>
				</view>
			</view>

			<view v-for="(item,index) in subList" :key="index" style="margin:30rpx;background: #fff;border-radius: 20rpx;padding:20rpx;">
				<view class="flex" style="align-items: center;border-bottom: .5px solid #e5e5e5;padding-bottom: 12rpx;">
					<view style="flex: 1;line-height: 50rpx;">
						<view style="flex:1;font-weight: bold;font-size: 28rpx;color: #505050;">{{item.agentName}}</view>
						<view style="flex:1;font-weight: bold;font-size: 28rpx;color: #505050;">{{item.agentMobile}}</view>
					</view>
					<view>
						<button @tap="actionTask(itemsData.data[0])" class="cuIcon-qrcode" style="min-width: 7em;height: 60rpx;line-height: 60rpx;background: #4fa8fe;border-radius: 10rpx;font-size: 24rpx;color:#fff">
							查看推广码</button>
					</view>
				</view>
				<view style="padding: 20rpx 0;font-size: 24rpx;text-align: center;">
					<view class="flex" style="align-items: center;justify-content: space-between;padding:12rpx 20rpx;color: #505050;background-color: #f0f5f6;border-radius: 100rpx;">
						<view style="flex: 1;">活动名称</view>
						<view style="flex: 1;">推广量</view>
						<view style="flex: 1;">收益</view>
					</view>
					<view style="padding: 20rpx 0;border-bottom: .5px solid #e5e5e5;">
						<view v-for="items in item.listGroupActivity" class="flex" style="align-items: center;padding:12rpx 20rpx;font-weight: bold;">
							<view class="fonthidden" style="flex:1;color: #505050;">{{items.activityName}}</view>
							<view style="flex:1;color: #fc0808;">{{items.orderNum}}</view>
							<view style="flex:1;color: #43cf7c;">￥{{keepTwoDecimalFull(items.settleMoney)}}</view>
						</view>
					</view>
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
	
	export default {
		data() {
			return {
				mobile: '',
				sysReward: 33,
				date: '选择日期',
				itemsData:{},
				subList:[]
			}
		},
		onLoad(e) {
			let val = JSON.parse(uni.getStorageSync('itemsData'))
			this.itemsData = val;
			this.getData()
			console.log(3333,val)
		},
		computed: {

		},
		methods: {
			...mapMutations(['settaskData', 'setdataDetail']),
			topage(url,item){
				if(item){
					this.settaskData(item)
				}
				
				uni.navigateTo({
					url:url
				})
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
			cancelSearch(){
				this.mobile = ''
				this.getData()
			},
			delDate() {
				this.date = '选择日期';
				this.getData()
			},
			getData() {
				this.api.getRepeatQrList({
					data:{
						nameOrMobile:this.mobile,
						date:this.date=='选择日期'?'':this.date,
						activityId:this.itemsData.data[0].id
					},
					success:(res)=>{
						this.subList = res.data.data
					}
				})
			},

			DateChange(e) {
				this.date = e.detail.value;
				this.getData()
			},
			dayCha(time) {
				time = time.replace(/T/, " ")
				time = time.replace(new RegExp("-", "gm"), "/");
				var timeMiao = new Date(time).getTime()
				var thatTimeMiao = new Date().getTime();
				var chaTime = timeMiao - thatTimeMiao;
				return chaTime
			},
			actionTask(item) {
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
							this.topage(`/pages/center/dataDetail?menuVal=${this.menuVal}&status=3&id=${item.id}&price=${item.highPrice}`)
						} else {
							this.topage(`/pages/center/dataDetail?menuVal=${this.menuVal}&id=${item.id}&price=${item.highPrice}`)
						}
					}
				})
			},
		}

	}
</script>

<style>
</style>
