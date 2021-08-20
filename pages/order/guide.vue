<template>
	<view>
		<view style="padding: 24rpx;" v-html="taskData.activityDetail">
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		mounted() {
			console.log("6666666666666")
		},
		computed: {
			...mapState({
				taskData: state => state.publicStore.taskData,
			})
		},
	}
</script>

<style>
</style>
