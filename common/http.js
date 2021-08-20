import store from "@/common/store.js"
import Base64 from "@/common/base64.js"

import api from "./api.js"

let httpNum = 0;

const $http = (e, method, url, NoDetection) => {
	if (method === 'POST' && e.data && !NoDetection) {
		let formData = '?'
		for (let i in e.data) {
			formData += `&${i}=${e.data[i]}`
		}
		url = url + formData
	}
	store.commit('setloading', true)
	httpNum++;
	uni.showLoading({
		title: '加载中',
	})

	uni.request({
		url: url,
		method: method,
		data: { ...e.data
		},
		withCredentials: true,
		header: {
			...e.header,
			'Authorization': `Basic ${Base64.encode(`miniapp:miniapp_secret`)}`,
			'Blade-Auth': `bearer ${uni.getStorageSync(`access_token`)}`,
		},
		success: (ret) => {

			ret.data.code = ret.data.code || ret.statusCode
			if (ret.data.code == 401) {
				login(e, method, url)
			} else if (ret.data.error_description) {
				uni.showModal({
					title: '温馨提示',
					content: ret.data.error_description,
					showCancel: false,
					success: (res) => {}
				});
			} else if (ret.data.code != 200) {
				uni.showModal({
					title: '温馨提示',
					content: ret.data.msg || '系统正在升级中',
					showCancel: false,
					success: (res) => {}
				});
			} else {
				uni.removeStorageSync(url)
				return e.success(ret)
			}
		},
		fail: (ret) => {
			uni.showModal({
				title: '请求超时',
				content: '请检查网络连接',
				showCancel: false,
				success: (res) => {

				}
			});
			if (e.fail) {
				return e.fail()
			}
		},
		complete: (ret) => {
			httpNum--;
			if (!httpNum > 0) {
				setTimeout(() => {
					uni.hideLoading()
				}, 500)
			}
			store.commit('setloading', false)
			if (e.complete) {
				return e.complete(ret)
			}
		}
	});
}

const login = (e, method, url) => {
	const topage = () => {
		uni.removeStorageSync('setUserLogin')
		uni.reLaunch({
			url: '/pages/open/login'
		})
	}
	
	let userdata = uni.getStorageSync('setUserLogin') || {};
	if (uni.getStorageSync('openIdNew')) {
		//补救6.30前 一批用户Openid异常--
		userdata.openId = uni.getStorageSync('openIdNew');
	} else {
		var ua = window.navigator.userAgent;
		if (ua.indexOf("MicroMessenger") > 0) {
			//微信
			topage();
			return
		}
	}
	if (!userdata.mobile || !userdata.password || !userdata.tenantId) {
		topage();
		return
	}	
	
	
	if (uni.getStorageSync(url) === url) {
		return
	}
	uni.setStorageSync(url, url)
	
	uni.request({
		url: `/api5/blade-h5/open/login?&mobile=${userdata.mobile}&password=${userdata.password}&tenantId=${userdata.tenantId}&openId=${userdata.openId||''}`,
		method: 'POST',
		data: {
			...userdata
		},
		header: {
			'Authorization': `Basic ${Base64.encode(`miniapp:miniapp_secret`)}`,
		},
		success: (ret) => {
			if (ret.data.access_token) {
				uni.setStorageSync(`refresh_token`, ret.data.refresh_token)
				uni.setStorageSync(`access_token`, ret.data.access_token)
				uni.setStorageSync('setUserLogin', userdata);
				$http(e, method, url)
			} else {
				//登录失败
				topage();
				return
			}
		},
		fail: (ret) => {
			topage();
		},
	})
}


export default $http;


// uni.showToast({
// 	title: '该功能尚未开放',
// 	icon: 'none',
// 	duration: 2000
// });
