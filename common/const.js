
let env_dev = 0// 0生产 1开发

//推广页跳转路径
const SERVER_URL = `https://${env_dev?'test':'www'}.yycampus.com`;//服务器域名

//相关上传接口
const SERVER_URL_IMG = `https://${env_dev?'test':'www'}.yycampus.com/api5/blade-resource/oss/endpoint/put-file2`//put-file-by-code

//租户ID
const TENANTID= '000000'

//验证码间隔时间
const InitTime = 60;

//团队佣金比例上限
const TeamRate = 20;//弃用~由后台配置

//appid-网页授权获取openid
const AppId = 'wx7ac4bfca6fb25fad'

//腾讯地图 IP定位 key&逆地址解析
const LOCATION_KEY = 'LVIBZ-LY2LK-254JB-A44VE-DBKPJ-44BGJ'

export {
	LOCATION_KEY,
	TeamRate,
	AppId,
	InitTime,
	SERVER_URL_IMG,
	SERVER_URL,
	TENANTID
}




