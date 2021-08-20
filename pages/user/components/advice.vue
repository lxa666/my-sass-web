<template>
	<view>
		<view class="cu-modal" :class="adviceShow?'show':''" style="index:888">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">意见反馈</view>
					<view class="action" @tap="closeShow">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view style="margin-top:20rpx;padding:0 20rpx;align-items: center;justify-content: center;text-align: left;">
					<form @submit="formSubmit">
						<view class="cu-form-group form-item">
							<view class="title">意见标题</view>
							<input placeholder="请输入意见标题" name="opinionTitle" v-model="form.opinionTitle"></input>
						</view>
						<view class="cu-form-group align-start form-item">
							<view class="title">意见详情</view>
							<textarea v-model="form.opinionDetail" maxlength="-1" name="opinionDetail" placeholder="请输入意见详情"></textarea>
						</view>

						<view class="margin-top text-center" style="color:red" v-if="tips">意见标题/意见详情不能为空！</view>

						<button form-type="submit" style="border-radius: 60rpx;margin-top:40rpx;background: #FF5733;" class="margin-top cu-btn block bg-green margin-tb-sm lg lg-border">
							<text v-if="loading" class="cuIcon-loading2 cuIconfont-spin"></text>
							提交</button>
					</form>
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
				form: {
					opinionTitle: '',
					opinionDetail: ''
				},
				tips:false
			}
		},
		computed: {
			...mapState({
				loading: state => state.publicStore.loading,
				adviceShow: state => state.userStore.adviceShow,
			})
		},
		methods: {
			...mapMutations(['setadviceShow']),
			topage() {
				uni.navigateTo({
					url: '/pages/open/login'
				})
			},
			formSubmit(e) {
				let formdata = e.detail.value
				console.log(formdata)
				if (!formdata.opinionTitle || !formdata.opinionDetail) {
					this.tips=true
					setTimeout(()=>{
						this.tips = false
					},2000)
					return
				}
				this.api.postOpinion({
					data: {
						...formdata,
					},
					success: (ret) => {
						console.log(ret)
						if (ret.data.code == 200) {
							uni.showToast({
								title: "提交成功",
								icon: 'none'
							})
							this.form = {}
							this.$emit('rf')
							this.closeShow()
						} else {
							console.log('数据异常')
						}
					}
				})
			},
			closeShow() {
				this.form = {}
				console.log(this.form)
				this.setadviceShow(false)
			},
		}
	}
</script>

<style scoped>
	.form-item {
		margin-bottom: 20rpx;
		border-radius: 50rpx;
	}
</style>
