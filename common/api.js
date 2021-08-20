import $http from "./http.js";
let get = "GET",
	post = "POST",
	put = "PUT";
let url = '/api5'

//上传
const postendpoint = (s) => $http(s, post, url+"/blade-resource/oss/endpoint/put-file-by-code");//弃用
 
//注册短信获取
const postsmsreg = (s) => $http(s, post, url+"/blade-h5/open/sms/send-regist");

//注册
const postregist = (s) => $http(s, post, url+"/blade-h5/open/regist");

//登录
const postlogin = (s) => $http(s, post, url+"/blade-h5/open/login");

//活动列表
const postactivitylist = (s) => $http(s, get, url+"/blade-h5/activity/list");

//申请资料
const postsubmitInfo = (s) => $http(s, post, url+"/blade-h5/activity/app/submit");

//判断是否已申请
const postisapply = (s) => $http(s, get, url+"/blade-h5/activity/app/isapply");

//推广二维码
const getqrcode = (s) => $http(s, get, url+"/blade-h5/user/app/promo/qrcode");

//我的资料
const getuserdetail = (s) => $http(s, get, url+"/blade-h5/user/app/detail");

//我的团队列表、修改下级比例
const getagentlist = (s) => $http(s, get, url+"/blade-h5/user/app/agent/list");
const posteditrate = (s) => $http(s, post, url+"/blade-h5/user/app/edit/rate");

//地区**弃用--前端本地加载
const getregionlist = (s) => $http(s, get, url+"/blade-system/region/lazy-list");

//提现
const postcashout = (s) => $http(s, post, url+"/blade-h5/agent/cashout/submit");

//公告列表、详情
const getnoticelist = (s) => $http(s, get, url+"/blade-desk/notice/list");
const getnoticedetail = (s) => $http(s, get, url+"/blade-desk/notice/detail");

//修改密码
const postpassword = (s) => $http(s, post, url+"/blade-h5/user/app/edit/password");

//统计
const getstatistics = (s) => $http(s, get, url+"/blade-h5/laxin/data/list");

//钱包明细blade-h5/agent/cashout/list
const getcashoutlist = (s) => $http(s, get, url+"/blade-h5/agent/cashout/list");

//重置密码
const postPswReset = (s) => $http(s, post, url+"/blade-h5/open/reset");

//申请提现
const postcashoutsubmit = (s) => $http(s, post, url+"/blade-h5/agent/cashout/submit");

//获取身份认证信息- 空 未提交认证、非空 按状态判断
const getsalarydetail = (s) => $http(s, get, url+"/blade-h5/salary/detail");

//身份认证信息提交接口
const postsalarysubmit = (s) => $http(s, post, url+"/blade-h5/salary/submit");

//提交意见
const postOpinion = (s) => $http(s, post, url+"/blade-h5/operate/opinion/submit");

//获取意见列表
const getOpinion = (s) => $http(s, get, url+"/blade-h5/operate/opinion/list");

//获取轮播
const getCarousel = (s) => $http(s, get, url+"/blade-operate/operate_carousel/list");

//修改备注
const postremarkname = (s) => $http(s, post, url+"/blade-h5/user/app/edit/remarkname",);

//代理主页 --根据活动ID获取申请过的活动列表
const getAgentactivitylist = (s) => $http(s, get, url+"/blade-h5/laxin/data/activity/list");

//获取openid
const getaccesstoken = (s) => $http(s, get, url+`/blade-h5/open/prod/wx/accesstoken`);

//新增 - 编辑 活动默认提成比例
const postActivitySetting = (s) => $http(s, post, url+`/blade-h5/activity/setting`);

//获取活动默认提成比例
const getActivitySetting = (s) => $http(s, get, url+`/blade-h5/activity/setting`);

//获取拉新数据统计
const getLaxinStats = (s) => $http(s, get, url+`/blade-h5/laxin/data/statistics`);

//美团订单明细
const getMtOrderList = (s) => $http(s, get, url+"/blade-h5/mt/order/list");

//获取项目多码列表
const getRepeatQrList = (s) => $http(s, get, url + "/blade-h5/activity/repeat/qr/list");

//获取公网IP
const getIpAddress = (s) => $http(s, get, url+"/blade-h5/open/getIpAddress");

export default {
	getRepeatQrList,
	getIpAddress,
	getMtOrderList,
	getLaxinStats,
	getActivitySetting,
	postActivitySetting,
	getaccesstoken,
	getAgentactivitylist,
	postremarkname,
	getCarousel,
	getOpinion,
	postOpinion,
	postsalarysubmit,
	getsalarydetail,
	postcashoutsubmit,
	postPswReset,
	getcashoutlist,
	getstatistics,
	postpassword,
	getnoticedetail,
	getnoticelist,
	postcashout,
	getregionlist,
	posteditrate,
	getagentlist,
	getuserdetail,
	getqrcode,
	postisapply,
	postsubmitInfo,
	postactivitylist,
	postregist,
	postlogin,
	postsmsreg,
	postendpoint
	
}
