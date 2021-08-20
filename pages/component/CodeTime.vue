<template>
	<view>
		<button @tap="getCode" class='cu-btn bg-green shadow' style="background-color: #FF5733;">
			{{codeNumFn()}}</button>
	</view>
</template>

<script>
	import {
		InitTime
	} from '@/common/const.js'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		props: {
			mobile: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				initTime: InitTime, //间隔发送时间			
			}
		},
		created() {},
		computed: {
			...mapState({
				smsCodeNum: state => state.publicStore.smsCodeNum,
			})
		},
		methods: {
			codeNumFn() {
				let val = '验证码'
				if (this.smsCodeNum < this.initTime) {
					//显示读秒
					val = this.smsCodeNum + ' s'
				}				
				return val
			},

			getCode() {
				let mobileRegular = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (!mobileRegular.test(this.mobile)) {
					uni.showToast({
						title: `手机号格式不正确`,
						icon: 'none',
						duration: 3000
					});
					return
				}
				if (this.smsCodeNum > 0 && this.smsCodeNum < this.initTime) {
					uni.showToast({
						title: `发送间隔较短，请稍候重试`,
						icon: 'none',
						duration: 3000
					});
					return;
				}

				this.api.postsmsreg({
					data: {
						phone: this.mobile,
						tenantId: this.tenantId
					},
					success: (ret) => {
						if (ret.data.code == 200) {
							this.CodeTime()
							uni.showToast({
								title: `验证码已发送，请留意短信`,
								icon: 'none',
								duration: 3000
							});
						}
					},
				})
			},
		}
	}
</script>

<style>
</style>


<!-- import {
	InitTime
} from '@/common/const.js'
store.commit('setsmsCodeNum', InitTime);
let CodeTime = (num) => {
	//smsCodeNum读秒时不应调用CodeTime
	let CodeTimeInterval,smsCodeNum = store.state.publicStore.smsCodeNum || InitTime;
	if(CodeTimeInterval){
		return
	}
	CodeTimeInterval = setInterval(() => {
		if (smsCodeNum === 0) {
			clearInterval(CodeTimeInterval)
			store.commit('setsmsCodeNum', InitTime);
			uni.removeStorageSync('smsCodeNum')
		} else {
			smsCodeNum--;
			store.commit('setsmsCodeNum', smsCodeNum);
		}
	}, 1000)
};
Vue.prototype.CodeTime = CodeTime -->
