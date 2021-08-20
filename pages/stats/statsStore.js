export default {
	state: {
		withdrawalShow:false,
	},
	getters: {},
	mutations: {
		setwithdrawalShow(state, provider){
			state.withdrawalShow = provider;
		},
	}
};
