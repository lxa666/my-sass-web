import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import publicStore from "@/pages/publicStore.js"
import userStore from "@/pages/user/userStore.js"
import statsStore from "@/pages/stats/statsStore.js"
import itemsStore from "@/pages/items/itemsStore.js"

const store = new Vuex.Store({
	modules: {
		publicStore,
		userStore,
		statsStore,
		itemsStore
	}
})
export default store;
