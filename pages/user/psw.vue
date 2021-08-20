<template>
	<view class="flex" style="align-items: center;justify-content: center;min-height: 100vh;margin-top: -100rpx;">
		<form @submit="formSubmit" @reset="formReset">
			<view class="margin-top cu-form-group form-item">
				<view class="title">旧密码</view>
				<input placeholder="请输入旧密码" name="oldPassword"></input>
				<!-- <text class='cuIcon-lock text-orange'></text> -->
			</view>
			<view class="margin-top cu-form-group form-item">
				<view class="title">新密码</view>
				<input placeholder="请输入新密码" name="newPassword"></input>
				<!-- <text class='cuIcon-lock text-orange'></text> -->
			</view>
			<view class="margin-top cu-form-group form-item">
				<view class="title">新密码</view>
				<input placeholder="重复输入新密码" name="newPassword2"></input>
				<!-- <text class='cuIcon-lock text-orange'></text> -->
			</view>
			
			<button form-type="submit" style="border-radius: 60rpx;margin-top:40rpx;background: #FF5733;" class="margin-top cu-btn block bg-green margin-tb-sm lg cuIcon-loading2">
				提交</button>
		</form>
	</view>
</template>

<script>
	export default{
		methods:{
			formSubmit(e,formReset){
				let formdata = e.detail.value
				if(formdata.oldPassword&&formdata.newPassword&&formdata.newPassword2){
					if(formdata.newPassword==formdata.newPassword2){
						this.api.postpassword({
							data:{
								...formdata
							},
							success:(res)=>{
								console.log(res)
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
			}
		}
	}
</script>

<style scoped>
.form-item{
	border-radius: 60rpx;
	box-shadow: 0px 7px 7px 0px rgba(153, 153, 153, 0.1);
}
</style>
