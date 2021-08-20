export default {
	state: {
		pswShow:false,//修改密码弹窗
		adviceShow:false,//意见反馈弹窗
	},
	getters: {},
	mutations: {
		setpswShow(state, provider){
			state.pswShow = provider;
		},
		setadviceShow(state, provider){
			state.adviceShow = provider;
		},
	}
};
