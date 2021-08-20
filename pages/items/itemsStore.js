export default {
	state: {
		itemInfo:{},
		itemPriceInfo:{},
		activityId:''
	},
	getters: {},
	mutations: {
		setactivityId(state, provider){
			state.activityId = provider;
		},
		setitemPriceInfo(state, provider){
			state.itemPriceInfo = provider;
		},
		setitemInfo(state, provider){
			state.itemInfo = provider;
		},
	}
};
