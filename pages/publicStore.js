export default {
	state: {
		mpushMsg: '这是一个令全坬人民振奋的消息~~~',
		loading: false,
		taskData: '', //申请任务后展示的数据
		dataDetail: '', //活动单列数据

		smsCodeNum: 0, //验证码通用倒计时
		
		swiperList:[],
		noticeList:[],
		
		region:'',//省市区是否有变化
		cityactivitylist:[],//城市活动列表
		nationalactivitylist:[],//全国活动列表
		activitylist:[],//全部活动列表
		
		activitylistS:[],//分组的全部活动列表
		recordsList:[],//团队列表
		teamData:{},//团队代理数据
	},
	getters: {},
	mutations: {
		setnationalactivitylist(state, provider) {
			state.nationalactivitylist = provider;
		},
		setregion(state, provider) {
			state.region = provider;
		},
		setcityactivitylist(state, provider) {
			state.cityactivitylist = provider;
		},
		setteamData(state, provider) {
			state.teamData = provider;
		},
		setrecordsList(state, provider) {
			state.recordsList = provider;
		},
		setswiperList(state, provider) {
			state.swiperList = provider;
		},
		setnoticeList(state, provider) {
			state.noticeList = provider;
		},
		setactivitylistS(state, provider) {
			state.activitylistS = provider;
		},
		setactivitylist(state, provider) {
			state.activitylist = provider;
		},
		setsmsCodeNum(state, provider) {
			state.smsCodeNum = provider;
		},
		setdataDetail(state, provider) {
			state.dataDetail = provider;
		},
		settaskData(state, provider) {
			state.taskData = provider;
		},
		setmpushMsg(state, provider) {
			state.mpushMsg = provider;
		},
		setloading(state, provider) {
			console.log("提交中~~~~", provider)
			state.loading = provider;
		},
	}
};
