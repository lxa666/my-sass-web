import {
	LOCATION_KEY
} from "./const.js"
import api from "./api.js"


const getUserIP = () => {
	return new Promise(function(resolve, reject) {
		api.getIpAddress({
			data: {},
			success: (res) => {
				resolve(res.data.data)
			}
		})
	});
}


const getCurrentPosition = () => {
	return new Promise(function(resolve, reject) {
		uni.showLoading({
			title: '获取位置...',
		})
		uni.getLocation({
			type: 'gcj02',
			altitude:true,
			geocode:true,
			success: function(res) {
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
				console.log("resresres位置信息",res)
				uni.hideLoading()
				uni.setStorageSync('longitude', res.longitude)
				uni.setStorageSync('latitude', res.latitude)
				getLocation()
				resolve()
			},
			complete(msg) {
				console.log("mmmmmmmmmmmmmmmmmmmmm",msg)
			}
		});
		// #ifdef  APP-PLUS
		// uni.getLocation({
		// 	type: 'gcj02',
		// 	geocode:true,
		// 	success: function(res) {
		// 		console.log('当前位置的经度：' + res.longitude);
		// 		console.log('当前位置的纬度：' + res.latitude);
		// 		console.log("resresres位置信息",res)
		// 		uni.hideLoading()
		// 		uni.setStorageSync('longitude', res.longitude)
		// 		uni.setStorageSync('latitude', res.latitude)
		// 		getLocation()
		// 		resolve()
		// 	}
		// });
		// #endif

		// #ifdef  H5
		// const locationSuccess = (position) => {
		// 	uni.hideLoading()
		// 	uni.setStorageSync('longitude', position.coords.longitude)
		// 	uni.setStorageSync('latitude', position.coords.latitude)
		// 	getLocation()
		// 	resolve()
		// }
		// const locationError = (error) => {
		// 	uni.hideLoading()
		// 	var msg = '';
		// 	switch (error.code) {
		// 		case error.PERMISSION_DENIED:
		// 			msg = "需重新打开网站，弹出授权时请点击允许，否则将无法获取城市项目数据"
		// 			break;
		// 		case error.POSITION_UNAVAILABLE:
		// 			msg = "暂时获取不到位置信息,检查GPS定位服务是否开启"
		// 			break;
		// 		case error.TIMEOUT:
		// 			msg = "请求地理位置超时,检查GPS定位服务是否开启"
		// 			break;
		// 		case error.UNKNOWN_ERROR:
		// 			msg = "未知错误。"
		// 			break;
		// 	}
		// 	uni.showModal({
		// 		title: '温馨提示',
		// 		content: msg,
		// 		showCancel: false,
		// 		success: (res) => {}
		// 	});
		// }
		// if (navigator.geolocation) {
		// 	uni.showLoading({
		// 		title: '获取位置...',
		// 	})
		// 	navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
		// 		enableHighAcuracy: true, //位置是否精确获取
		// 		timeout: 10000, //获取位置允许的最长时间
		// 		maximumAge: 1000 //多久更新获取一次位置
		// 	});
		// } else {
		// 	uni.showToast({
		// 		title: '定位失败，请稍后尝试',
		// 		icon: 'none',
		// 		duration: 3000
		// 	});
		// }
		// #endif		
	})
}

const getLocation = async (userIp) => {
	if (!uni.getStorageSync('longitude') && !uni.getStorageSync('latitude')) {
		return
	} else {
		uni.showLoading({
			title: '位置解析中...',
		})
		//经纬度逆解析
		sessionStorage.removeItem('location')
		window.xi = new Function('data', 'sessionStorage.location=JSON.stringify(data)');
		var location = document.createElement('script');
		location.src =
			"https://apis.map.qq.com/ws/geocoder/v1/?location=" + uni.getStorageSync('latitude') + "," + uni.getStorageSync(
				'longitude') + "&key=" + LOCATION_KEY +
			"&get_poi=1&output=jsonp&callback=xi";
		document.body.appendChild(location);
		let gps = false;
		return new Promise(function(resolve, reject) {
			let TIME = setInterval(() => {
				if (sessionStorage.location) {
					gps = true
					uni.hideLoading()
					let data = JSON.parse(sessionStorage.location)
					clearInterval(TIME)
					resolve(data);
				}
			}, 500);
			setTimeout(() => {
				if (!gps) {
					reject()
				}
				clearInterval(TIME)
				uni.hideLoading()
			}, 6000)
		});
		//end
	}



	//ip获取地区start
	// sessionStorage.removeItem('location')
	// window.xi = new Function('data', 'sessionStorage.location=JSON.stringify(data)');
	// var location = document.createElement('script');
	// location.src =
	// 	"https://apis.map.qq.com/ws/location/v1/ip?ip=" + userIp + "&key=" + LOCATION_KEY +
	// 	"&output=jsonp&callback=xi";
	// document.body.appendChild(location);
	// let gps = false;
	// return new Promise(function(resolve, reject) {
	// 	let TIME = setInterval(() => {
	// 		if (sessionStorage.location) {
	// 			gps = true
	// 			uni.hideLoading()
	// 			let data = JSON.parse(sessionStorage.location)
	// 			clearInterval(TIME)
	// 			resolve(data);
	// 		}
	// 	}, 500);
	// 	setTimeout(() => {
	// 		if (!gps) {
	// 			reject()
	// 		}
	// 		clearInterval(TIME)
	// 		uni.hideLoading()
	// 	}, 6000)
	// });
	//获取地区end
}

export default {
	getLocation,
	getCurrentPosition
};
