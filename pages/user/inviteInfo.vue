<template>
	<view style="min-height: 100vh;display: flex;align-items: center;justify-content: center;">
		<view v-if="shareImg">
			<image @load="closeLoading" mode="widthFix" style="width: 700rpx;" :src="shareImg"></image>
		</view>
		<view v-else-if="!shareImg&&!loading">
			<view style="position: relative;">
				<image style="width: 700rpx;vertical-align: bottom;" mode="widthFix" src="../../static/code.png"></image>
				<view style="position: absolute;bottom: 0;color: #FFF;width: 700rpx;">
					<view class="flex" style="width: 90%;justify-content: space-between;margin: 0 auto;">
						<view style="line-height: 60rpx;">
							<view>
								{{userdetail.agentName}}
							</view>
							<view>
								推广码：{{userdetail.promoCode}}
							</view>
						</view>
						<view style="text-align: center;padding: 10rpx;">
							<image style="right: 0;width: 160rpx;height: 160rpx;" :src="codeurl"></image>
							<view>
								长按识别二维码
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="text-align: center;padding: 24rpx;">
				手机截图保存海报
			</view>
		</view>
		<view style="position: fixed;left: 2000px;">
			<view id="newImg">
				<image style="width: 700rpx;vertical-align: bottom;" mode="widthFix" src="../../static/code.png"></image>
				<view style="position: absolute;bottom: 0;color: #FFF;width: 700rpx;">
					<view class="flex" style="width: 90%;justify-content: space-between;margin: 0 auto;">
						<view style="line-height: 60rpx;">
							<view>
								{{userdetail.agentName}}
							</view>
							<view>
								推广码：{{userdetail.promoCode}}
							</view>
						</view>
						<view style="text-align: center;padding: 10rpx;">
							<image style="right: 0;width: 160rpx;height: 160rpx;" :src="codeurl"></image>
							<view>
								长按识别二维码
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import html2canvas from 'html2canvas'
	import {
		SERVER_URL_IMG,
		SERVER_URL
	} from "@/common/const.js"

	export default {
		data() {
			return {
				loading: true,
				shareImg: '',

				codeurl: '',
				modalName: null,
				userdetail: {}
			}
		},
		created() {

		},
		mounted() {
			this.init()
		},
		methods: {
			closeLoading() {
				uni.hideLoading()
			},
			init() {
				this.userdetail = uni.getStorageSync('userdetail')
				this.api.getqrcode({
					data: {
						url: encodeURI(`${SERVER_URL}/ncbd/h5/#/pages/open/reg?inviter=`)
					},
					success: (res) => {
						this.codeurl = res.data.data
						setTimeout(() => {
							this.makeImg();
						}, 1200);
					}
				})
			},
			//start
			uploadFile(url) {

				// const uploadTask = uni.uploadFile({
				// 	url: SERVER_URL_IMG,
				// 	filePath: url,
				// 	header: {
				// 		'Blade-Auth': `bearer ${uni.getStorageSync(`access_token`)}`,
				// 	},
				// 	name: 'file',
				// 	formData: {},
				// 	success: (ret) => {
				// 		let data = JSON.parse(ret.data)
				// 		uni.setStorageSync("shareImg", data.data.link);
				// 		this.shareImg = data.data.link;				
				// 	},
				// 	complete: () => {}
				// })
			},
			makeImg() {
				uni.showLoading({
					title: '生成海报中...',
				})
				try {
					html2canvas(document.getElementById('newImg'), {
						useCORS: true,
						logging: true,
						async: true
					}).then(canvas => {
						var url = canvas.toDataURL("image/png");
						if (url) {
							this.shareImg = url;
						} else {
							this.shareImg = ''
						}
						this.loading = false
						uni.hideLoading()
					})
				} catch (e) {
					this.shareImg = ''
					this.loading = false
					uni.hideLoading()
				}
				setTimeout(() => {
					if (this.loading || !this.shareImg) {
						this.shareImg = ''
						this.loading = false
						uni.hideLoading()
					}
				}, 5000)
			},
		}
	}
</script>

<style>
	page {
		background: #F0F5F6;
		height: 100%
	}
</style>
<style scoped>

</style>
