const state = {
	//登录状态
	loginStatus:false,
	token:null,
	//用户信息
	userInfo:{}
}

const getters = {
	
}
const mutations = {
	initUser(state){
		let userInfo = uni.getStorageSync('userInfo');
		if(userInfo){
			userInfo =JSON.parse(userInfo)
			state.userInfo = userInfo;
			state.token = userInfo.token;
			state.loginStatus = true;
		}
	},
	// 推出登录
	loginOut(state){
		state.userInfo = {};
		state.token = null;
		state.loginStatus = false;
		uni.removeStorageSync('userInfo')
	},
	//保存用户信息
	loginFn(state,data){
		state.userInfo = data;
		state.token = data.token;
		state.loginStatus = true;
		uni.setStorageSync('userInfo',JSON.stringify(data));
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