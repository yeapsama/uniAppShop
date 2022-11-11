const state = {
	ordernum:''
}

const getters = {
	
}
const mutations = {
	initOrder(state,order){
		state.ordernum = order;
	}
}
const actions = {
	
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}