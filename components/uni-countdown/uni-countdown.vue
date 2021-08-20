<template>
	<view class="uni-countdown">
		<text v-if="showDay&&d>0" :style="{ borderColor: borderColor, color: color, backgroundColor: backgroundColor }" class="uni-countdown__number">{{ d }}</text>
		<text v-if="showDay&&d>0" :style="{ color: splitorColor }" class="uni-countdown__splitor">天</text>
		<text v-if="showDay" :style="{ borderColor: borderColor, color: color, backgroundColor: backgroundColor }" class="uni-countdown__number">{{ h }}</text>
		<text v-if="showDay" :style="{ color: splitorColor }" class="uni-countdown__splitor">{{ showColon ? ':' : '时' }}</text>
		<text :style="{ borderColor: borderColor, color: color, backgroundColor: backgroundColor }" class="uni-countdown__number">{{ i }}</text>
		<text :style="{ color: splitorColor }" class="uni-countdown__splitor">{{ showColon ? ':' : '分' }}</text>
		<view style="overflow: hidden;background-color: #333;height: 48rpx;width: 52rpx;margin: 5rpx 0;line-height: 48rpx;">
			<text :style="{ borderColor: borderColor, color: color, backgroundColor: backgroundColor }" style="margin: 0;" class="uni-countdown__number">{{ s }}</text>
		</view>
		<text v-if="!showColon" :style="{ color: splitorColor }" class="uni-countdown__splitor">秒</text>
	</view>
</template>
<script>
	export default {
		name: 'UniCountdown',
		props: {
			showDay: {
				type: Boolean,
				default: true
			},
			showColon: {
				type: Boolean,
				default: true
			},
			backgroundColor: {
				type: String,
				default: '#FFFFFF'
			},
			borderColor: {
				type: String,
				default: '#000000'
			},
			color: {
				type: String,
				default: '#000000'
			},
			splitorColor: {
				type: String,
				default: '#000000'
			},
			day: {
				type: Number,
				default: 0
			},
			hour: {
				type: Number,
				default: 0
			},
			minute: {
				type: Number,
				default: 0
			},
			second: {
				type: Number,
				default: 0
			},
			time: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				timer: null,
				syncFlag: false,
				d: '00',
				h: '00',
				i: '00',
				s: '00',
				leftTime: 0,
				seconds: 0,
				minuteStatus: false
			}
		},
		watch: {
			// time(val)(val) {
			// 	this.changeFlag()
			// }
		},
		created: function(e) {
			this.startData();
		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		methods: {
			timeUp() {
				clearInterval(this.timer)
				this.$emit('timeup')
			},
			countDown() {
				let seconds = this.seconds
				let [day, hour, minute, second] = [0, 0, 0, 0]
				if (seconds > 0) {
					day = Math.floor(seconds / (60 * 60 * 24))
					hour = Math.floor(seconds / (60 * 60)) - (day * 24)
					minute = Math.floor(seconds / 60) - (day * 24 * 60) - (hour * 60)
					second = Math.floor(seconds) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
				} else {
					this.timeUp()
				}
				if (day < 10) {
					day = '0' + day
				}
				if (hour < 10) {
					hour = '0' + hour
				}
				if (minute < 10) {
					minute = '0' + minute
				}
				if (second < 10) {
					second = '0' + second
				}
				this.d = day
				this.h = hour
				this.i = minute
				this.s = second
			},
			startData() {
				if (this.timer) return;
				this.seconds = this.time / 1000;

				if (this.seconds <= 0) {
					return
				}
				this.minuteStatus = true;
				this.countDown();
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						this.timeUp();
						this.minuteStatus = false
						return
					}
					this.countDown()
				}, 1000)
			},
			changeFlag() {
				if (!this.syncFlag) {
					this.syncFlag = true;
					this.seconds = this.time
					this.startData();
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '~@/uni.scss';
	$countdown-height: 48rpx;
	$countdown-width: 52rpx;

	.uni-countdown {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-start;
		padding: 2rpx 0;
		
	}

	.uni-countdown__splitor {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		line-height: $countdown-height;
		padding: 5rpx;
		font-size: $uni-font-size-sm;
	}

	.uni-countdown__number {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		width: $countdown-width;
		height: $countdown-height;
		line-height: $countdown-height;
		margin: 5rpx;
		text-align: center;
		// font-size: $uni-font-size-sm;
		font-size: 36rpx;
	}
</style>
