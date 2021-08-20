import {
	AppId
} from "@/common/const.js"
import api from "@/common/api.js"
import store from "@/common/store.js"

const getUrlParam = (name) => {
	var query = window.location.href.split("?")[1];
	if (!query) return (null);
	var param_arr = query.split("&");
	for (var i = 0; i < param_arr.length; i++) {
		var pair = param_arr[i].split("=");
		if (pair[0] == name) {
			return pair[1];
		}
	}
	return (null);
}

const getAccessToken = (code) => {
	//注，必须是开放接口、否则会跟自动重登流程冲突
	api.getaccesstoken({
		data: {
			code: code,
			appid: AppId
		},
		success: (res) => {
			if (res.data.data.openId) {
				uni.setStorageSync('openIdNew', res.data.data.openId)
			}
		}
	})
}

const getWxCode = () => {
	// 按生命周期自动触发逻辑，如果需用户点击触发需把getUrlParam前置
	if (uni.getStorageSync('openIdNew')) {
		return;
	}
	let code = getUrlParam('code') || null;
	if (code) {
		getAccessToken(code)
	} else {
		const nextFn = () => {
			uni.setStorageSync('errNum', '获取code判断--登录成功--回收')
			let redirect_uri = encodeURIComponent(window.location.href);
			let url =
				`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&scope=snsapi_base&redirect_uri=${redirect_uri}&response_type=code&state=STATE#wechat_redirect`
			window.location.href = url;
		}
		let errNum = uni.getStorageSync('errNum') || false;
		if (!errNum) {
			nextFn()
		}
	}
}



export default {
	getWxCode
}
