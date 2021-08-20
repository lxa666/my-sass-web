<template>
	<view style="">

		<view>
			<view style="margin: 24rpx;padding: 48rpx;border-radius: 24rpx;background-color: #FFF;">
				<form @submit="formSubmit" @reset="formReset">
					<view>
						<view class="flex" style="align-items: center;">
							<view v-if="dataDetail.brandLogo">
								<image :src="dataDetail.brandLogo" style="width: 100rpx;max-height: 150rpx;" mode="widthFix"></image>
							</view>
							<view style="padding: 12rpx;font-size: 1.2em;font-weight: 600;">
								{{dataDetail.activityName}}
							</view>
						</view>
						<view v-if="dataDetail.examine!=1" class="cu-form-group margin-top" style="border-radius: 100rpx;border: 1px solid #e5e5e5;">
							<view class="title" style="width: 5em;text-align: right;">姓名</view>
							<input placeholder="请输入" name="username"></input>
							<text class='cuIcon-my text-orange'></text>
						</view>
						<view v-if="dataDetail.examine!=1" class="cu-form-group margin-top" style="border-radius: 100rpx;border: 1px solid #e5e5e5;">
							<view class="title" style="width: 5em;text-align: right;">手机号</view>
							<input type="number" placeholder="请输入" name="mobile" v-model="mobile"></input>
							<text class='cuIcon-mobile text-orange'></text>
						</view>
						<view v-else class="cu-form-group radius margin-top">
							<view class="title">手机号</view>
							<input style="color: ##808080;" v-model="mobile" name="mobile" disabled></input>
						</view>


						<view v-if="status!=3&&dataDetail.examine!=1" class="cu-form-group margin-top" style="border-radius: 100rpx;border: 1px solid #e5e5e5;">
							<view class="title" style="width: 5em;text-align: right;">验证码</view>
							<input type="number" placeholder="请输入" name="smscode"></input>
							<CodeTime :mobile="mobile" />
						</view>

						<view v-if="regionlist.length&&menuVal!='city'" class="flex margin-top" style="font-size: 0.9em;align-items: center;justify-content: center;text-align: center;">
							<view style="flex: 1;">
								<picker style="border-radius: 100rpx;border: 1px solid #e5e5e5;padding:24rpx;" mode="selector" @change="provinceNameChange"
								 :value="provinceName" :range="regionlist" range-key="provinceName">
									<view class="picker">{{regionlist[provinceIndex].provinceName||'省'}}</view>
								</picker>
							</view>
							<view style="flex: 1;" v-if="regionlist[provinceIndex].children">
								<picker style="border-radius: 100rpx;border: 1px solid #e5e5e5;padding:24rpx;" mode="selector" @change="cityNameChange"
								 :value="index" :range="regionlist[provinceIndex].children" range-key="cityName">
									<view class="picker">{{regionlist[provinceIndex].children[cityIndex].cityName||'请选择城市'}}</view>
								</picker>
							</view>

							<view style="flex: 1;" v-if="regionlist[provinceIndex].children[cityIndex].children">
								<picker style="border-radius: 100rpx;border: 1px solid #e5e5e5;padding:24rpx;" mode="selector" @change="districtNameChange"
								 :value="index" :range="regionlist[provinceIndex].children[cityIndex].children" range-key="districtName">
									<view class="picker">{{regionlist[provinceIndex].children[cityIndex].children[districtIndex].districtName||'请选择地区'}}</view>
								</picker>
							</view>
						</view>
						<view v-else class="flex margin-top" style="font-size: 1.2em;align-items: center;">
							<view style="width: 5em;text-align: right;">所在地区:</view>
							<view style="background-color: #e5e5e5;margin-left: 24rpx;padding: 12rpx;border-radius: 100rpx;min-width: 4.5em;">{{locationText}}</view>
						</view>
						<view class="margin-top" style="text-align: center;display: flex;justify-content: center;">
							<button form-type="submit" class="margin-top cu-btn block bg-green margin-tb-sm lg" style="background-color: #FF5733;border-radius: 100rpx;">
								<text v-if="loading" class="cuIcon-loading2 cuIconfont-spin"></text>
								{{status==3?'重申提交':'提交申请'}}</button>
						</view>
						<view v-if="status==3" class="margin-top" style="color: #a6a6a6;text-align: center;">
							驳回理由:{{taskData.remark}}
						</view>
						<view v-else class="margin-top" style="color: #a6a6a6;text-align: center;">资料审核需要5-20分钟，请耐心等待</view>
						<view class="margin-top">
							<view style="background-color: #f0f5f6;padding: 24rpx;border-radius: 24rpx;min-height: 8em;color: red;line-height: 60rpx;">
								<view v-html="dataDetail.activityGuide">
								</view>
							</view>
						</view>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import CodeTime from '../component/CodeTime.vue'
	import {
		address
	} from "@/common/address.js"
	export default {
		components: {
			CodeTime
		},
		data() {
			return {
				menuVal:'',//===city 自动锁定省市区
				locationText:'',
				address,
				settlePrice: '',
				relActivityId: '',
				index: 0,
				regionlist: '',
				provinceIndex: 0, //省下标
				cityIndex: 0,
				districtIndex: 0,
				provinceName: '',
				cityName: '',
				districtName: '',
				mobile: '',
				status: null,
			}
		},
		computed: {
			...mapState({
				loading: state => state.publicStore.loading,
				dataDetail: state => state.publicStore.dataDetail,
				taskData: state => state.publicStore.taskData,
			})
		},
		onLoad(e) {
			this.menuVal = e.menuVal || '';
			this.locationText = uni.getStorageSync('locationText')
			this.status = e.status || null;
			this.settlePrice = e.price;
			this.relActivityId = e.id
		},
		created() {
			this.init()
		},
		onShow() {
			//自动审核
			if (this.dataDetail.examine == 1) {
				let userdata = uni.getStorageSync('setUserLogin');
				this.mobile = userdata.mobile
			}
		},
		beforeDestroy() {},
		methods: {
			...mapMutations(['settaskData', 'setdataDetail']),
			provinceNameChange(e) {
				this.provinceIndex = e.detail.value
				this.provinceName = this.regionlist[e.detail.value].provinceName
				let obj = {
					cityName: '请选择城市',
					children: [{
						districtName: '请选择地区'
					}]
				}
				if (this.regionlist[this.provinceIndex].children[0].cityName != '请选择城市') {
					this.regionlist[this.provinceIndex].children.unshift(obj)
				}
				this.cityIndex = 0
				this.cityName = ''
				this.districtIndex = 0
				this.districtName = ''
			},
			cityNameChange(e) {
				this.cityIndex = e.detail.value
				let cityData = this.regionlist[this.provinceIndex].children[e.detail.value]
				this.cityName = cityData.cityName
				if (cityData.children[0].districtName != '请选择地区') {
					cityData.children.unshift({
						districtName: '请选择地区'
					})
				}
				this.districtIndex = 0
				this.districtName = ''
			},
			districtNameChange(e) {
				this.districtIndex = e.detail.value
				this.districtName = this.regionlist[this.provinceIndex].children[this.cityIndex].children[e.detail.value].districtName
			},
			init() {
				if (!this.regionlist.length) {
					this.regionlist = [...this.address];
				}
			},
			topage(url) {
				uni.redirectTo({
					url: url
				})
			},
			dayCha(time) {
				time = time.replace(new RegExp("-", "gm"), "/");
				var timeMiao = new Date(time).getTime()
				var thatTimeMiao = new Date().getTime();
				var chaTime = timeMiao - thatTimeMiao;
				return chaTime
			},
			actionTask() {
				let item = this.dataDetail;
				this.api.postisapply({
					data: {
						activityId: item.id
					},
					success: (res) => {
						this.settaskData(res.data.data);
						this.setdataDetail(item);
						if (res.data.data.status == 1 || res.data.data.status == 2) {
							this.topage(`/pages/order/task?id=${item.id}&time=${this.dayCha(item.activityEndtime)}`)
						} else {
							uni.navigateBack({})
						}
					}
				})
			},
			formSubmit(e) {
				let formdata = e.detail.value
				formdata.settlePrice = this.settlePrice
				formdata.relActivityId = this.relActivityId
								
				if(this.menuVal ==='city'){
					formdata.relRegionCode = this.locationText
				}else{
					formdata.relRegionCode = `${this.provinceName}-${this.cityName}-${this.districtName}`;
				}

				let err = false
				for (let i in formdata) {
					if (!formdata[i]) {
						err = i;
					}
				}
				if (!this.districtName||this.districtName=='请选择地区') {
					uni.showModal({
						title: '提交失败',
						content: `请选择所在地区`,
						showCancel: false,
						success: (res) => {

						}
					});
					return
				}
				if (!err) {
					if (this.status == 3) {
						formdata.status = 3;
					}
					this.api.postsubmitInfo({
						data: {
							...formdata
						},
						success: (res) => {
							console.log(2222, res)
							if (res.data.code == 200) {
								this.actionTask()
							}
						}
					})
				} else {
					uni.showModal({
						title: '提交失败',
						content: `(${err})、不可为空`,
						showCancel: false,
						success: (res) => {

						}
					});
				}
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style scoped>
	.cu-form-group uni-picker .picker {
		line-height: none !important;

	}
</style>
