<template>
	<view style="padding: 30rpx;">
		<view>
			<view class="cu-form-group  radius">
				<view class="title">上级QQ</view>
				<input placeholder="" name="input"></input>
			</view>
			<view class="cu-form-group radius">
				<view class="title">上级微信</view>
				<input placeholder="" name="input"></input>
			</view>
		</view>
		
		<view>
			<view class="cu-form-group margin-top radius">
				<view class="title">我的账号</view>
				<input placeholder="" name="input"></input>
			</view>
			<view class="cu-form-group radius">
				<view class="title">我的QQ</view>
				<input placeholder="" name="input"></input>
			</view>
			<view class="cu-form-group radius">
				<view class="title">我的微信</view>
				<input placeholder="" name="input"></input>
			</view>
		</view>
		
		<view class="cu-form-group margin-top radius">
			<view class="title">密保手机</view>
			<input placeholder="" name="input"></input>
			<view class="cu-capsule radius">
				<view class='cu-tag bg-blue '>
					+86
				</view>
				<view class="cu-tag line-blue">
					中国大陆
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userdetail:''
			}
		},
		created() {
			this.init();		
		},
		methods:{
			init(){
				// if(uni.getStorageSync('userdetail')){
				// 	this.userdetail = uni.getStorageSync('userdetail')
				// }else{
					this.api.getuserdetail({
						data:{},
						success:(res)=>{							
							uni.setStorageSync('userdetail',res.data.data)
							this.userdetail = res.data.data;
						}
					})
				//}
			}			
		}
	}
</script>

<style>
</style>
