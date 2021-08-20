<template>
	<view class="cu-modal" :class="relAgentId?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content">修改备注</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="padding-xl" style="font-weight: 600;">
				<view class="flex" style="align-items: center;justify-content: center;min-height: 200rpx;">
					<input style="border-radius: 20rpx;margin-right: 12rpx;background-color: #FFF;height: 70rpx;width: 400rpx;"
					v-model="remarkName" placeholder="" name="input"></input>
				</view>
			</view>
			<view class="cu-bar bg-white justify-center">
				<view class="action">
					<button class="cu-btn bg-green margin-left" style="background-color: #FF5733;" @tap="setData">确认修改</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
	} from 'vuex';
	export default{
		props:{
			relAgentId: {
				type: String,
				default: false
			},
			hideRemarkname:{
				type: Function,
				default: null
			},
		},
		data(){
			return{
				remarkName:""
			}
		},
		computed: {
			...mapState({
				itemInfo: state => state.itemsStore.itemInfo,
			})
		},
		methods:{
			hideModal(){
				this.hideRemarkname()
			},
			setData(){
				if(this.remarkName){
					this.api.postremarkname({
						data:{
							remarkName:this.remarkName,
							userId:this.relAgentId
						},
						success:(res)=>{
							this.remarkName = ''
							this.hideModal()
						}
					})
				}else{
					uni.showToast({
						title: '备注名称不可为空',
						icon: 'none',
						duration: 2000
					});
				}
				
			}
		}
	}
</script>

<style>
</style>
