<template>
	<view>
		<view style="min-height: 100vh;background-color: #F0F5F6;">
			<view style="background-image: linear-gradient(to right, #368dfe , #56b7fe);padding-bottom: 100rpx;">
				<view class="cu-bar search " style="padding-top: 30rpx;">
					<view class="search-form round" style="background-color: #FFF;">
						<text class="cuIcon-search"></text>
						<input v-model="mobile" :adjust-position="false" type="text" placeholder="请输入手机号搜索账户" confirm-type="search"></input>
						<text @tap="cancelSearch" v-if="mobile" class='cuIcon-close text-bold'></text>
					</view>
					<view class="action">
						<button @tap="getagentlistmobile(mobile)" class="cu-btn  shadow-blur round" style="background-color: #FF5733;color: #FFF;">搜索</button>
					</view>
				</view>
				<view class="flex" style="text-align: center;justify-content: space-between;align-items: flex-end;padding: 30rpx;color: #FFF;">
					<view style="flex: 1;">
						<view style="font-size: 40rpx;font-weight: 600;height: 46rpx;">{{teamData.teamNum}}</view>
						<view>直接代理人数</view>
					</view>
					<view style="flex: 1;">
						<view style="font-size: 40rpx;font-weight: 600;height: 46rpx;" class="">{{teamData.allTeamNum}}</view>
						<view @tap="teamNumFn">团队总人数<span class="cuIcon-question" style="font-size: 28rpx;"></span></view>
					</view>
				</view>
			</view>

			<view style="min-height: 262rpx;margin:-100rpx 20rpx 0;background-color: #FFF;padding:0 20rpx;border-radius: 20rpx;">
				<view v-if="activitylist.length" id="body" style="">
					<view class="flex" style="align-items: center;justify-content: center;height: 92rpx;">
						<SelectList :value="typeIndex" :range="activitylist" :isshow="isshow" :change="activitylistChange"
						 :selectListModal="selectListModal">
							<view @tap="selectListModal" class="flex" style="justify-content: center;">
								<view class="flex" style="align-items: center;justify-content:space-between;background-color: #F0F5F6;height: 72rpx;padding: 0 24rpx;border-radius: 72rpx;">
									<view class="picker" style="font-size: 28rpx;font-weight: bold;padding-right: 12rpx;color: #505050;">
										{{activitylist[typeIndex].activityName}}
									</view>
									<view class="cuIcon-unfold" style="font-weight: bold;"></view>
								</view>
							</view>
						</SelectList>

						<!-- <picker style="" range-key="activityName" :value="typeIndex" :range="activitylist" @change="activitylistChange">
							<view class="flex" style="justify-content: center;">
								<view class="flex" style="align-items: center;justify-content:space-between;background-color: #F0F5F6;height: 72rpx;padding: 0 24rpx;border-radius: 72rpx;">
									<view class="picker" style="font-size: 28rpx;font-weight: bold;padding-right: 12rpx;color: #505050;">
										{{activitylist[typeIndex].activityName}}
									</view>
									<view class="cuIcon-unfold" style="font-weight: bold;"></view>
								</view>
							</view>
						</picker> -->
					</view>
					<view class="flex" style="justify-content: space-between;border-bottom: .5px solid #e5e5e5;height: 92rpx;line-height: 92rpx;">
						<view class="flex" style="align-items: center;">
							<view class="" style="font-size: 28rpx;color: #e5e5e5;font-size: 32rpx;">
								<span style="color: #383838;font-size: 28rpx;padding-left: 20rpx;">结算价格</span>
							</view>
							<view style="font-size: 36rpx;font-weight: bold;color: #ff5733;line-height: 64rpx;height: 64rpx;padding:0 .5em;">
								￥{{activitylist[typeIndex].highPrice/100}}
							</view>
						</view>
						<view @tap.stop="showprice" v-if="activitylist[typeIndex].sysReward||activitylist[typeIndex].subReward" class="flex"
						 style="align-items: center;">
							<view class="cuIcon-question" style="font-size: 28rpx;color: #e5e5e5;font-size: 32rpx;">
								<span style="color: #383838;font-size: 28rpx;padding-left: 6rpx;">扶持奖励</span>
							</view>
							<view style="font-size: 36rpx;font-weight: bold;color: #43cf7c;line-height: 64rpx;height: 64rpx;padding:0 .5em;">
								￥{{activitylist[typeIndex].sysReward?activitylist[typeIndex].sysReward/100:activitylist[typeIndex].subReward/100}}
							</view>
						</view>
					</view>
					<view class="flex" style="align-items: center;justify-content: space-between;height: 92rpx;line-height: 96rpx;">
						<view @tap.stop="showteam" class="flex" style="align-items: center;color: #383838;">
							<view class="cuIcon-question" style="font-size: 28rpx;color: #e5e5e5;font-size: 32rpx;">
								<span style="color: #383838;font-size: 28rpx;padding-left: 6rpx;">默认抽成比例</span>
							</view>
							<view style="font-size: 36rpx;color: #ff5733;background-color: #f0f5f6;border-radius: 20rpx;line-height: 64rpx;height: 64rpx;padding:0 .5em;margin: 0 .2em;">
								{{activitylist[typeIndex].defaultRadio}}
							</view>%
						</view>
						<view v-if="!batchEdit" style="display: flex;align-items: center;">
							<button @tap.stop="actionAllShow('all')" size="mini" style="background: #4fa8fe;color:#fff">设置比例</button>
						</view>
					</view>
				</view>
			</view>


			<view id="box">
				<view v-if="batchEdit" :style="scrollTop>top?'position: fixed;z-index:999;top:0;box-shadow:0px 10px 20px #F0F5F6;':''">
					<view style="width: 100vw;background-color: #F0F5F6;">
						<view style="padding:30rpx 24rpx;">
							<view class="flex" style="justify-content:flex-end;align-items: center;text-align: center;">
								<view style="background-color: #FFF;min-height: 72rpx;line-height: 76rpx;min-width: 6em;border-radius: 20rpx;margin-right: 12rpx;color: #333;">
									已选<span style="color: #0081FF;">{{checkboxNum}}</span>人
								</view>
								<checkbox-group @change="allcheckboxChange">
									<view style="background-color: #FFF;padding: 12rpx 24rpx;border-radius: 20rpx;">
										全选<checkbox style="padding-left: 12rpx;font-size: 32rpx;transform:scale(0.7)" class='round' :class="allStatus?'checked':''"
										 :checked="allStatus?true:false" value="true"></checkbox>
									</view>
								</checkbox-group>
							</view>
						</view>
					</view>
				</view>
				<view :style="scrollTop>top&&batchEdit?'padding:136rpx 20rpx;':'padding:0 20rpx 120rpx;'">
					<view v-if="recordsList.length" style="padding-bottom: 300rpx;" :style="batchEdit?'margin-top:-30rpx':''">
						<!-- @tap="topage('/pages/items/agent',item)" -->
						<view @tap="topage('/pages/items/agent',item)" v-for="(item,index) in recordsList" :key="item.id" class="margin-top search bg-white"
						 style="border-radius: 20rpx;padding: 24rpx;line-height: 60rpx;">
							<view class="flex" style="justify-content: space-between;">
								<view class="flex">
									<view style="font-size: 28rpx;color: #505050;font-weight: 600;">
										{{item.agentName}}{{item.remarkName?`(${item.remarkName})`:''}}
									</view>
									<view v-if="!batchEdit" @tap.stop="showRemarkname(item)" class="margin-left" style="color:#FF5733;">
										修改备注
									</view>
								</view>
								<view>
									手机号：{{item.agentMobile}}
								</view>
								<view v-if="batchEdit" @tap.stop>
									<checkbox-group @change="(e)=>{checkboxChange(e,index)}">
										<checkbox style="font-size: 32rpx;transform:scale(0.7)" class='round' :class="item.checked?'checked':''"
										 :checked="item.checked?true:false" :value="item.userId"></checkbox>
									</checkbox-group>
								</view>
							</view>


							<view style="font-size: 28rpx;">
								<view class="flex" style="justify-content: space-between;">
									<view class="flex">
										结算价格：
										<view style="font-size: 36rpx;color: #ff5733;background-color: #f0f5f6;border-radius: 20rpx;line-height: 64rpx;height: 64rpx;padding:0 .5em;margin: 0 .2em;">
											{{setDataFn(item.radio)}}
										</view>元
									</view>
									<view style="color: #ff5733;">
										<span style="background-color: #ffddd6;border: 1px solid #ff5733;padding:0 24rpx;border-radius: 10rpx;font-size: 24rpx;padding:10rpx 12rpx;">
											抽成比例:{{item.radio}}%
										</span>
									</view>
								</view>

								<view v-if="item.subReward">
									扶持奖励：<span style="color: #43cf7c;">{{keepTwoDecimalFull(item.subReward)}}</span>元/单
								</view>
								<view class="flex" style="justify-content: space-between;">
									<view @tap.stop="teamNumFn">
										团队人数：{{item.myTeamNum}}<span class="cuIcon-question" style="font-size: 28rpx;"></span>
									</view>
									<view v-if="!batchEdit" style="display: flex;align-items: center;">
										<button @tap.stop="actionShow(item.userId)" size="mini" style="background: #FF5733;color:#fff;">修改价格</button>
									</view>
								</view>
							</view>

						</view>
					</view>
					<view v-else>
						<view style="text-align: center;padding: 24rpx;">
							--暂无数据--
						</view>
					</view>
					<Remarkname :relAgentId="relAgentId" :hideRemarkname="hideRemarkname" />
				</view>

			</view>
		</view>

		<view v-if="batchEdit">
			<view style="position: fixed;bottom: 0;width: 100vw;padding: 30rpx;">
				<view class="animation-slide-bottom">
					<button @tap="setChecked" style="background-color: #ff5733;color: #FFF;">确认选择</button>
				</view>
			</view>
		</view>

		<!-- 抽成比例解释1 -->
		<view class="cu-modal" :class="showteamText?'show':''">
			<view class="cu-dialog" style="background-color: #FFF;">
				<view class="cu-bar bg-white justify-end">
					<view class="content" style="font-size: 14px;color:#383838;font-weight: bold;">默认抽成</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="font-weight: 600;text-align: center;background-color: #FFF; color: #ff5733;line-height: 50rpx;">
					<view>
						1、设置后，仅对当前项目生效，不影响其他项目的默认抽成比例；
						<br />
						2、设置后，对新发展的代理生效，原先代理的抽成比例不变。
					</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn bg-green" style="min-width: 240rpx;background-color: #FF5733;border-radius: 60rpx;box-shadow: 0px 2px 6px 0px rgba(255, 87, 51, 0.3);"
						 @tap="hideModal">
							确认</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 抽成比例解释1end -->
		
		<!-- 团队人数统计解释start -->
		<view class="cu-modal" :class="teamNumShow?'show':''">
			<view class="cu-dialog" style="background-color: #FFF;">
				<view class="cu-bar bg-white justify-end">
					<view class="content" style="font-size: 14px;color:#383838;font-weight: bold;">团队人数统计</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="font-weight: 600;text-align: center;background-color: #FFF; color: #ff5733;line-height: 50rpx;">
					<view>
						非实时数据，24小时更新一次
					</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn bg-green" style="min-width: 240rpx;background-color: #FF5733;border-radius: 60rpx;box-shadow: 0px 2px 6px 0px rgba(255, 87, 51, 0.3);"
						 @tap="hideModal">
							确认</button>
					</view>
				</view>
			</view>
		</view>	
		<!-- 团队人数统计解释end -->

		<!-- 扶持奖励解释1 -->
		<view class="cu-modal" :class="showpriceText?'show':''">
			<view class="cu-dialog" style="background-color: #FFF;">
				<view class="cu-bar bg-white justify-end">
					<view class="content" style="font-size: 14px;color:#383838;font-weight: bold;">扶持奖励</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="font-weight: 600;text-align: center;background-color: #FFF; color: #ff5733;line-height: 50rpx;">
					<view>
						1、给下级代理设置价格时，支持给下级分配扶持奖励！最大不超过自身的扶持奖励！
						<br />
						2、请各位沟通确认扶持奖励截止时间，避免出现纠纷！
					</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn bg-green" style="min-width: 240rpx;background-color: #FF5733;border-radius: 60rpx;box-shadow: 0px 2px 6px 0px rgba(255, 87, 51, 0.3);"
						 @tap="hideModal">
							确认</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 扶持奖励解释1end -->

		<!-- 修改默认比例 -->
		<view class="cu-modal" :class="showAllUser?'show':''">
			<view class="cu-dialog" style="width: 500rpx;background-color: #FFF;">
				<view class="cu-bar bg-white justify-end">
					<view class="content" style="font-size: 14px;color:#383838;font-weight: bold;">抽成比例</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="font-weight: 600;text-align: center;background-color: #FFF;">
					<view class="flex" style="align-items: center;justify-content: center;">
						<input style="border-radius: 20rpx;margin-right: 12rpx;background-color: #f0f5f6;height: 70rpx;width: 200rpx;"
						 type="number" v-model="subrate" placeholder="" name="input"></input>%
					</view>
					<view class="margin-top" style="font-size: 20rpx;color: #ff5733;">(上限{{TeamRate}}%)</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn bg-green" style="background-color: #FF5733;border-radius: 60rpx;box-shadow: 0px 2px 6px 0px rgba(255, 87, 51, 0.3);"
						 @tap="postActivitySetting(subrate)">
							确认修改</button>
					</view>
				</view>
				<view style="margin: 24rpx;font-size: 26rpx;color: #a6a6a6;">修改后将对新邀请注册的代理生效
					不影响当前代理的价格</view>
			</view>
		</view>
		<!-- 修改默认比例end -->

		<!-- 修改价格start -->
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

				<view v-if="activitylist.length&&activitylist[typeIndex].sysReward" class="padding-xl" style="font-weight: 600;">
					<view style="text-align: left;margin-bottom: 6rpx;">
						扶持奖励
					</view>
					<view class="flex" style="align-items: center;">
						<input style="border-radius: 20rpx;margin-right: 12rpx;background-color: #FFF;height: 70rpx;width: 200rpx;" type="number"
						 v-model="subReward" placeholder="" name="input"></input> 元/单<span style="font-size: 20rpx;color: #ff5733;">(上限{{keepTwoDecimalFull(activitylist[typeIndex].sysReward)}}元)</span>
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
		<!-- 修改价格end -->


		<view v-if="pageScrollToStatus" style="position: fixed;right: 20rpx;bottom: 300rpx;">
			<view class="flex" @tap="pageScrollToFn" style="padding: 0 24rpx;margin-left: 24rpx;width: 120rpx;height: 120rpx;border-radius: 120rpx;justify-content:center;align-items: center;background-color: #FFF;box-shadow: 0px 7px 7px 0px #999;color: #FF5733;">
				<view class="cuIcon-top" style="font-size: 1.5em;color: #007AFF;">

				</view>
			</view>
		</view>

		<view v-if="recordsList.length>1" style="position: fixed;right: 20rpx;bottom: 160rpx;">
			<view class="flex" @tap="allEdit" style="padding: 0 24rpx;margin-left: 24rpx;width: 120rpx;height: 120rpx;border-radius: 120rpx;justify-content:center;align-items: center;background-color: #FFF;box-shadow: 0px 7px 7px 0px #999;color: #FF5733;">
				<view>
					<view>
						{{batchEdit?'取消':'批量'}}
					</view>
					<view>
						修改
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

	// import {
	// 	TeamRate
	// } from "@/common/const.js"

	import Remarkname from "../items/components/Remarkname.vue"

	import SelectList from "../component/SelectList.vue"
	export default {
		components: {
			SelectList,
			Remarkname
		},
		data() {
			return {
				teamNumShow:false,
				isshow: false,
				isRefresh: false,
				TeamRate: 0,
				itemInfo: {},

				activitylist: [],
				typeIndex: 0,
				showAllUser: false,
				mobile: '',
				userId: '',
				subrate: '',

				activityId: '',
				settleMoney: null, //修改价格需要用到
				price: '',
				subReward: '',
				relAgentId: '', //修改备注-用户ID
				batchEdit: false,
				allStatus: false, //全部选中为true

				current: 1,
				showteamText: false,
				showpriceText: false,
				pageScrollToStatus: false, //置顶按钮
				checkboxNum: 0, //选中数量
				scrollTop: 0,
				top: 0
			}
		},
		created() {

		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#box').boundingClientRect(data => {
				console.log('data.top', data)
				this.top = data.top
			}).exec();
		},
		onShow() {
			try{
				if(uni.getStorageSync('activityIdxa')&&this.activitylists.length){
					this.activitylists.map((item,index)=>{
						if(item.id===uni.getStorageSync('activityIdxa')){
							this.typeIndex = index;
						}
					})
				}else{
					this.setrecordsList([])
					this.typeIndex = 0;
				}
			}catch(e){
				this.setrecordsList([])
				this.typeIndex = 0;
			}
			
			
			this.init()
		},
		onPullDownRefresh() {
			this.isRefresh = true;
			uni.setStorageSync('current', 1);
			this.setrecordsList([])
			this.init()
			uni.stopPullDownRefresh();
		},
		onReachBottom(e) {
			let teamNum = uni.getStorageSync('teamNum') || 0;
			this.current = uni.getStorageSync('current') || this.current;
			if (this.current < teamNum / 20) {
				this.current += 1;
				this.getagentlist()
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			if (e.scrollTop > 1200) {
				this.pageScrollToStatus = true
			} else if (e.scrollTop < 1000) {
				this.pageScrollToStatus = false
			}
		},
		computed: {
			...mapState({
				activitylists: state => state.publicStore.activitylist,
				recordsList: state => state.publicStore.recordsList,
				teamData: state => state.publicStore.teamData,
			}),
		},
		methods: {
			...mapMutations(['setitemInfo', 'setactivitylist', 'setrecordsList', 'setteamData']),
			teamNumFn(){
				this.teamNumShow= true;
			},
			
			selectListModal() {
				this.isshow = !this.isshow
			},

			pageScrollToFn() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},

			showteam() {
				this.showteamText = true
			},
			showprice() {
				this.showpriceText = true
			},


			//设置全部默认比例
			actionAllShow() {
				this.showAllUser = true;
			},

			//批量修改
			allEdit() {
				this.batchEdit = !this.batchEdit;
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
				let highPrice = this.settleMoney / 100;
				let subrate = ((highPrice - e.target.value) / highPrice * 100).toFixed(1);
				subrate < 0 ? subrate = 0 : null;
				this.subrate = subrate
				console.log("subratesubrate", subrate)
			},
			subrateFn(e) {
				console.log(e.target.value)
				this.price = this.setDataFn(e.target.value)
			},
			actionShow(id) {
				this.price = '';
				this.subrate = '';
				this.settleMoney = this.activitylist[this.typeIndex].highPrice;
				console.log('this.settleMoney', this.settleMoney)
				this.activityId = this.activitylist[this.typeIndex].id;
				this.userId = id
			},


			//关闭备注
			hideRemarkname() {
				this.relAgentId = ''
				this.init()
			},
			//备注弹窗
			showRemarkname(item) {
				this.relAgentId = item.userId
			},

			//确认选择
			setChecked() {
				this.price = '';
				this.subrate = '';
				this.settleMoney = this.activitylist[this.typeIndex].highPrice;
				this.activityId = this.activitylist[this.typeIndex].id;
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

				if (e.detail.value[0]) {
					this.checkboxNum = this.recordsList.length
				} else {
					this.checkboxNum = 0
				}

				console.log(this.recordsList)
			},

			//checkboxChange
			checkboxChange(e, i) {
				let userId = e.detail.value[0],
					list = this.recordsList,
					checkboxNum = this.checkboxNum
				if (userId) {
					list[i].checked = userId;
					this.checkboxNum = checkboxNum + 1
				} else {
					list[i].checked = null;
					this.checkboxNum = checkboxNum - 1
				}
				this.setrecordsList([...list])

			},

			topage(url, item) {
				if (item) {
					this.setitemInfo(item)
				}
				//批量修改时禁止跳转事件
				if (!this.batchEdit) {
					uni.navigateTo({
						url: `${url}${item?'?userId='+item.userId:''}`
					})
				}
			},
			cancelSearch() {
				this.mobile = '';
				this.current = 1;
				uni.setStorageSync('current', this.current);

				this.setrecordsList([])
				this.getagentlist()
			},
			setDataFn(val) {
				let highPrice = this.activitylist[this.typeIndex].highPrice;
				return Math.floor((highPrice - highPrice * val / 100)) / 100
			},
			hideModal() {
				this.teamNumShow = false
				this.showpriceText = false
				this.showteamText = false
				this.showAllUser = false
				this.userId = ''
				this.subrate = ''
			},

			activitylistChange(e) {
				this.current = 1;
				uni.setStorageSync('current', this.current);
				this.setrecordsList([])
				this.typeIndex = e.detail.value
				this.activityId = this.activitylist[e.detail.value].id;
				this.TeamRate = this.activitylist[e.detail.value].highestRadio;
				this.selectListModal()
				this.getagentlist()
			},
			getagentlistmobile() {
				this.current = 1;
				uni.setStorageSync('current', this.current);
				this.setrecordsList([])
				this.getagentlist()
			},
			getagentlist() {
				this.api.getagentlist({
					data: {
						size: 20,
						current: this.current,
						agentMobile: this.mobile,
						activityId: this.activityId
					},
					success: (res) => {
						if (this.allStatus) {
							res.data.data.pages.map((item, index) => {
								item.checked = item.userId
							})
							this.checkboxNum = this.recordsList.length + res.data.data.pages.length
						}
						uni.setStorageSync('activityIdxa', this.activityId)
						uni.setStorageSync('typeIndex', this.typeIndex)//删除活动时会有bug 改成活动id匹配
						uni.setStorageSync('current', this.current);
						uni.setStorageSync('teamNum', res.data.data.teamNum)
						this.setrecordsList([...this.recordsList, ...res.data.data.pages])
						this.setteamData(res.data.data)
					}
				})
			},
			postactivitylist(init) {
				const setData = (data) => {
					//系统扶持兼容下级扶持 0628
					data.map(item => {
						if (!item.sysReward) {
							item.sysReward = item.subReward
						}
					})
					//end
					this.activitylist = data
					this.activityId = data[this.typeIndex].id
					this.TeamRate = data[this.typeIndex].highestRadio;
					if (init) {
						if (!this.recordsList.length || this.isRefresh) {
							this.getagentlist()
						}
					}
					this.isRefresh = false;
				}
				if (this.isRefresh || !this.activitylists.length) {
					this.api.postactivitylist({
						success: (res) => {
							this.setactivitylist(res.data.data.records);
							setData(res.data.data.records)
						}
					})
				} else {
					setData(this.activitylists)
				}

			},


			init(mobile = '') {
				this.current = 1;
				this.postactivitylist(true)
			},


			postActivitySetting() {
				if (!this.subrate) {
					return
				}
				//修改团队默认比例
				if (this.subrate < 0) {
					uni.showToast({
						title: "可调整的最小比例为0%请修改后再提交",
						icon: 'none',
						duration: 2000
					});
					return
				}

				if (this.subrate > this.TeamRate) {
					uni.showToast({
						title: "可调整的最大比例为" + this.TeamRate + "%请修改后再提交",
						icon: 'none',
						duration: 2000
					});
					return
				}

				this.subrate = Number(this.subrate).toFixed(1)

				this.api.postActivitySetting({
					data: {
						id: this.activitylist[this.typeIndex].relId,
						defaultRadio: this.subrate,
						relActivityId: this.activitylist[this.typeIndex].id,
						activityName: this.activitylist[this.typeIndex].activityName
					},
					success: (res) => {
						let activitylist = [...this.activitylist];
						activitylist[this.typeIndex].defaultRadio = this.subrate
						this.setactivitylist(activitylist);

						this.showAllUser = false
						this.subrate = ''
						this.userId = ''
						this.batchEdit = false;
						this.allStatus = false
					}
				})
			},
			posteditrate() {
				let sysReward = this.activitylist[this.typeIndex].sysReward / 100;
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

				this.api.posteditrate({
					data: {
						rate: this.subrate ? Number(this.subrate).toFixed(1) : '',
						userIds: this.userId,
						subReward:this.subReward!==''?Number((this.subReward * 100).toFixed(0)):'',
						activityId: this.activitylist[this.typeIndex].id
					},
					success: (res) => {
						try {
							let recordsList = [...this.recordsList],
								userIds = this.userId.split(',');
							userIds.map(id => {
								recordsList.map(item => {
									if (item.userId == id) {
										if (this.subrate && !isNaN(this.subrate)) {
											item.radio = this.subrate ? Number(this.subrate).toFixed(1) : ''
										}
										if (this.subReward && !isNaN(this.subReward)) {
											item.subReward = Number((this.subReward * 100).toFixed(0)) || ''
										}
									}
								})
							})
							this.setrecordsList(recordsList)
							// this.recordsList = 
						} catch (e) {
							this.init()
						}
						this.showAllUser = false
						this.subrate = ''
						this.userId = ''
						this.batchEdit = false;
						this.allStatus = false;
						this.subReward = ''
					}
				})
			}
		}
	}
</script>

<style>
</style>
