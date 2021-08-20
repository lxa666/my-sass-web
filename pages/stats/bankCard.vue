<template>
	<view>
		<view class="" style="color: #a6a6a6;font-size: 28rpx;padding: 12rpx 24rpx;color:#0081FF">
			<text class="cuIcon-info" style="padding-right: 12rpx;"></text>请绑定本人身份信息，若填写错误将导致无法成功打款
		</view>
		<view>
			<view>
				<view class="cu-form-group">
					<view class="title">银行卡卡号</view>
					<input type="number" placeholder="" v-model="bankCardId"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">银行卡预留手机号</view>
					<input type="number" placeholder="" v-model="mobile"></input>
				</view>
			</view>
		</view>

		<view class="margin-top" style="text-align: center;">
			<view>
				<!-- <view>
					<view style="color: #000;font-size: 40rpx;">
						请上传银行卡
					</view>
					<view class="" style="color: #a6a6a6;font-size: 24rpx;margin-top:12rpx">
						请确保上传的银行卡有效、完整、真实与本人信息一致
					</view>
				</view> -->
				<view>
					<view class="margin-top" @click="ChooseImage('bankCardPic')" style="display: flex;align-items: center;justify-content: center;position: relative;">
						<image v-if="bankCardPic" :src="bankCardPic_URL" style="width: 702rpx;height: 348rpx;border-radius: 10rpx;"></image>
						<view v-else style="width: 702rpx;height: 348rpx;border-radius: 10rpx;background-color:#6a93ff ;">
							
						</view>
						<view style="position: absolute;">
							<view class="cuIcon-add" style="margin: auto;color: #FFF;font-size: 3em;">
								
							</view>
							<view style="color: #FFF;font-size: 32rpx;">
								点击上传银行卡正面
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view style="padding: 24rpx;">
			<button @tap="submit" class="cu-btn block bg-blue margin-tb-sm lg">
				确认绑定</button>
			<view class="" style="color: #a6a6a6;font-size: 24rpx;margin-top:12rpx;text-align: center;">
				本操作将严格保护您的隐私安全，请放心操作
			</view>
		</view>
	</view>
</template>

<script>
	import {
		SERVER_URL_IMG
	} from "@/common/const.js"
	
	import press from './press.js'
	export default {
		data() {
			return {
				bankCardId: '',
				mobile: '',
				bankCardPic: '',
				bankCardPic_URL: ''
			}
		},
		methods: {
			ChooseImage(key) {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //还不支持h5 2021年了已经~~~
					sourceType: ['album', 'camera'], //从相册选择
					success: async (res) => {
						uni.showLoading({
							title: '文件上传中...',
						})
						
						let url = await press.compressImg(res.tempFiles[0], res.tempFiles[0].name);
						
						
						this[key] = ''
						this[`${key}_URL`] = url; //res.tempFilePaths[0];
						uni.uploadFile({
							url: SERVER_URL_IMG+'?fileName='+res.tempFiles[0].name,
							header: {
								'Blade-Auth': `bearer ${uni.getStorageSync(`access_token`)}`,
							},
							filePath: url,
							name: 'file',
							formData: {},
							success: (ret) => {
								uni.hideLoading()
								let obj = JSON.parse(ret.data);
								this[key] = obj.data.name
							}
						});
					}
				});
			},
			submit() {
				if (this.bankCardId && this.mobile && this.bankCardPic) {
					let idCardData = uni.getStorageSync('idCardData')
					this.api.postsalarysubmit({
						data: {
							certPoSide: idCardData.imageVal1,
							certNeSide: idCardData.imageVal2,
							certName: idCardData.userName,
							certNo: idCardData.userId,
							bankCardNo: this.bankCardId,
							preMobile: this.mobile,
							bankCardPic: this.bankCardPic
						},
						success: (res) => {
							if (res.data.code == 200) {
								uni.navigateTo({
									url: '/pages/stats/review'
								})
							}
						}
					})
				} else {
					uni.showModal({
						title: '温馨提示',
						content: '请完善所有资料后再提交',
						showCancel: false,
						success: (res) => {

						}
					});
				}

			}
		}
	}
</script>

<style>
</style>
