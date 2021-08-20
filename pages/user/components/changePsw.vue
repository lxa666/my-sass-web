<template>
	<view>
		<uni-popup :show="pswShow" position="middle">
			<view style="position: relative;width:80vw;padding:30rpx 50rpx;background: #f8f8f8;border-radius: 30rpx;">
				<view @tap="closeShow" style="width: 60rpx;height: 60rpx;text-align: center;position: absolute;right:0rpx;top:-60rpx;border-radius: 50%;font-size: 44rpx;color:#ccc;border: 3px solid #ccc;"
				 class="cuIcon-close"></view>
				<form @submit="formSubmit" @reset="formReset">
					<view class="margin-top cu-form-group form-item">
						<view class="title">旧密码</view>
						<input v-model="form.oldPsw" placeholder="请输入旧密码" name="oldPassword"></input>
						<!-- <text class='cuIcon-lock text-orange'></text> -->
					</view>
					<view class="margin-top cu-form-group form-item">
						<view class="title">新密码</view>
						<input v-model="form.newPsw" placeholder="请输入新密码" name="newPassword"></input>
						<!-- <text class='cuIcon-lock text-orange'></text> -->
					</view>
					<view class="margin-top cu-form-group form-item">
						<view class="title">新密码</view>
						<input v-model="form.newPsw1" placeholder="重复输入新密码" name="newPassword2"></input>
						<!-- <text class='cuIcon-lock text-orange'></text> -->
					</view>

					<button form-type="submit" class="margin-top cu-btn block margin-tb-sm lg text-white" style="background: #FF5733;">
						<text v-if="loading" class="cuIcon-loading2 cuIconfont-spin"></text>
						确认修改</button>
				</form>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
	} from 'vuex';
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import md5 from 'js-md5'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				form: {}
			};
		},
		computed: {
			...mapState({
				pswShow: state => state.userStore.pswShow,
				loading: state => state.publicStore.loading,
			})
		},
		methods: {
			...mapMutations(['setpswShow']),
			formSubmit(e) {
				let formdata = e.detail.value
				if(formdata.oldPassword&&formdata.newPassword&&formdata.newPassword2){
					if(formdata.newPassword==formdata.newPassword2){
						this.api.postpassword({
							data: {
								...formdata
							},
							success: (res) => {
								console.log(res)
								if (res.data.code == 200) {
									this.form = {}
									this.setpswShow(false)
								}
							}
						})
					}else{
						uni.showToast({
							title: `更新失败，新密码不一致`,
							icon: 'none',
							duration: 2000
						});
					}
				}else{
					uni.showToast({
						title: `密码不可为空`,
						icon: 'none',
						duration: 2000
					});
				}
			},
			formReset(e) {
				console.log('清空数据')
			},
			closeShow() {
				this.setpswShow(false)
			},
		}
	}
</script>

<style lang="less">
	.form-item {
		border-radius: 60rpx;
	}
</style>
