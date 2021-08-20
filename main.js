import Vue from 'vue'
import App from './App'

import appExit from '@/static/appExit.js';

import store from '@/common/store.js'

import HTTP from '@/common/api.js'
Vue.prototype.api = HTTP;

//测试并发请求--定时器待删除
// setInterval(() => {
// 	console.log("测试并发请求--待修改")
// 	HTTP.postactivitylist({
// 		data:{},
// 		success:(res)=>{
// 			HTTP.getagentlist({
// 				data:{
// 					size: 200,
// 					current: 1,
// 					activityId: res.data.data.records[0].id
// 				},
// 				success:()=>{}
// 			})
// 		}
// 	})
// }, 1000)
//测试并发请求--定时器待删除end


import {
	TENANTID
} from '@/common/const.js';
Vue.prototype.tenantId = TENANTID;

import {
	InitTime
} from '@/common/const.js'
store.commit('setsmsCodeNum', InitTime);
let CodeTime = (num) => {
	//smsCodeNum读秒时不应调用CodeTime
	let CodeTimeInterval, smsCodeNum = store.state.publicStore.smsCodeNum || InitTime;
	if (CodeTimeInterval) {
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
Vue.prototype.CodeTime = CodeTime



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
