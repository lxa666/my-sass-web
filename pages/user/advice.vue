<template>
	<view class="flex" style="align-items: center;justify-content: center;min-height: 100vh;margin-top: -100rpx;">
		<view style="padding: 30rpx;width: 100%;">
			<view class="cu-form-group radius">
				<view class="title">标题选择</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'美团'}}
					</view>
				</picker>
			</view>
		
			<view class="cu-form-group align-start">
				<view class="title">反馈内容</view>
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" placeholder="多行文本输入框"></textarea>
			</view>
		
			<button class="cu-btn block bg-green margin-tb-sm lg">
				提交</button>
		</view>
	</view>
	
</template>

<script>
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
