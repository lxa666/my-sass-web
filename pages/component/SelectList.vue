<template>
	<view>
		<view class="cu-modal" :class="isshow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content"></view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="max-height: 60vh;overflow: auto;">
					<view class="flex" style="flex-wrap: wrap;justify-content:space-between">
						<view style="max-width: 30%;" @tap="activitylistChange(index)" v-for="(item,index) in range">
							<view :style="value==index?'background-color:#F0F5F6':''" style="border-radius: 20rpx;margin-top: 12rpx;padding:24rpx 12rpx 0;">
								<image :src="item.brandLogo" style="width: 100rpx;height: 100rpx;"></image>
								<!-- <image src="../../static/app/jd.png" style="width: 100rpx;height: 100rpx;"></image> -->
								<view style="padding:12rpx;font-weight: bold;min-height: 108rpx;min-width: 6em;display: flex;align-items: center;justify-content: center;">
									<view class="fonthidden">
										{{item.activityName}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<slot />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
	} from 'vuex';
	export default {
		name:'SelectList',
		props: {
			range: {
				type: Array,
				default: []
			},
			change: {
				type: Function,
				default: null
			},
			selectListModal: {
				type: Function,
				default: null
			},
			value: {
				type: Number,
				default: null
			},
			isshow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			}
		},
		computed: {

		},
		methods: {
			activitylistChange(index) {
				if(index!=this.value){
					this.change({
						detail: {
							value: index
						}
					})
				}else{
					this.hideModal()
				}				
			},
			hideModal() {
				this.selectListModal()
			},
		}
	}
</script>

<style>
	.fonthidden{
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
</style>
