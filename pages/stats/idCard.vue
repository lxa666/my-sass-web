<template>
	<view>
		<view>
			<view class="" style="color: #a6a6a6;font-size: 28rpx;padding: 12rpx 24rpx;color:#0081FF">
				<text class="cuIcon-infofill" style="padding-right: 12rpx;"></text>请绑定本人身份信息，若填写错误将导致无法成功打款
			</view>
			<view>
				<view>
					<view class="cu-form-group">
						<view class="title">真实姓名</view>
						<input placeholder="" v-model="userName"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">身份证号</view>
						<input placeholder="" v-model="userId"></input>
					</view>
				</view>
			</view>
		</view>
		<view class="margin-top" style="text-align: center;">
			<view>
				<view>
					<view style="color: #000;font-size: 40rpx;">
						请上传二代身份证(满18周岁)
					</view>
					<view class="" style="color: #a6a6a6;font-size: 24rpx;margin-top:12rpx">
						请确保上传的身份证有效、完整、真实与本人信息一致
					</view>
				</view>
				<view>
					<view class="margin-top" @click="ChooseImage('imageVal1')" style="display: flex;align-items: center;justify-content: center;">
						<image :src="imageVal1?imageVal1_URL:'../../static/stats/zm.png'" style="width: 520rpx;height: 308rpx;border-radius: 10rpx;"></image>
					</view>
					<view class="margin-top" @click="ChooseImage('imageVal2')" style="display: flex;align-items: center;justify-content: center;">
						<image :src="imageVal2?imageVal2_URL:'../../static/stats/fm.png'" style="width: 520rpx;height: 308rpx;border-radius: 10rpx;"></image>
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 24rpx;">
			<button @tap="submit" class="cu-btn block bg-blue margin-tb-sm lg">
				下一步</button>
			<view class="" style="color: #a6a6a6;font-size: 24rpx;margin-top:12rpx;text-align: center;">
				本操作将严格保护您的隐私安全，请放心操作
			</view>
		</view>
		<view>
			<canvas style="width: 300px; height: 200px;" type='2d' canvas-id="myCanvas" id="myCanvas"></canvas>
		</view>
	</view>
</template>

<script>
	import {
		SERVER_URL_IMG
	} from "@/common/const.js"
	import Base64 from "@/common/base64.js"
	import press from './press.js'
	export default {
		data() {
			return {
				imageVal1_URL: '',
				imageVal2_URL: '',
				imageVal1: '',
				imageVal2: '',
				userName: '',
				userId: ''
			}
		},
		created() {

		},
		onShow() {
			let idCardData = uni.getStorageSync('idCardData')
			if (idCardData) {
				this.imageVal1 = idCardData.imageVal1
				this.imageVal2 = idCardData.imageVal2
				this.userName = idCardData.userName
				this.userId = idCardData.userId
				this.imageVal1_URL = idCardData.imageVal1_URL
				this.imageVal2_URL = idCardData.imageVal2_URL
				uni.removeStorageSync('idCardData'); //避免用户切换后台时在用户无感下系统私自赋值
			}
		},
		methods: {
			UpladFile() {},
			submit() {
				if (this.imageVal1 && this.imageVal2 && this.userName && this.userName) {
					let obj = {
						imageVal1_URL: this.imageVal1_URL,
						imageVal2_URL: this.imageVal2_URL,
						imageVal1: this.imageVal1,
						imageVal2: this.imageVal2,
						userName: this.userName,
						userId: this.userId,
					}
					obj.userId = obj.userId.toUpperCase()

					uni.setStorageSync('idCardData', obj)
					uni.navigateTo({
						url: '/pages/stats/bankCard'
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
			},
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
						this[`${key}_URL`] = url //;res.tempFilePaths[0]
						uni.uploadFile({
							url: SERVER_URL_IMG+'?fileName='+res.tempFiles[0].name,
							header: {
								'Blade-Auth': `bearer ${uni.getStorageSync(`access_token`)}`,
							},
							filePath: url, //res.tempFilePaths[0], //url, // res.tempFilePaths[0],
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
			show() {
				console.log(this.imgList)
			}
		}
	}
</script>

<style>
</style>
