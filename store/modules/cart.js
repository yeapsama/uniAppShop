import $http from '@/common/api/request.js';

const state = {
	list: [{
			id: 1,
			checked: false,
			imgUrl: '../../static/img/Children1.jpg',
			name: '商品信息商品信息商品信息商品信息商品信息商品信息商品信息',
			color: '红色',
			pprice: 399,
			num: 3
		},
		{
			id: 2,
			checked: false,
			imgUrl: '../../static/img/Children1.jpg',
			name: '商品信息商品信息商品信息商品信息商品信息商品信息商品信息',
			color: '红色',
			pprice: 399,
			num: 3
		},
		{
			id: 3,
			checked: false,
			imgUrl: '../../static/img/Children1.jpg',
			name: '商品信息商品信息商品信息商品信息商品信息商品信息商品信息',
			color: '红色',
			pprice: 399,
			num: 3
		},
		{
			id: 4,
			checked: false,
			imgUrl: '../../static/img/Children1.jpg',
			name: '商品信息商品信息商品信息商品信息商品信息商品信息商品信息',
			color: '红色',
			pprice: 399,
			num: 3
		},
		{
			id: 5,
			checked: false,
			imgUrl: '../../static/img/Children1.jpg',
			name: '商品信息商品信息商品信息商品信息商品信息商品信息商品信息',
			color: '红色',
			pprice: 399,
			num: 3
		},
		{
			id: 6,
			checked: false,
			imgUrl: '../../static/img/Children1.jpg',
			name: '商品信息商品信息商品信息商品信息商品信息商品信息商品信息',
			color: '红色',
			pprice: 399,
			num: 3
		},
	],
	selectedList: [3]
}
const mutations = {
	//请求数据
	initGetData(state,data){
		state.list = data;
		//解决选择后退出购物车在进入时候的bug
		state.selectedList = []
		// state.list.forEach(element =>{
		// 	if(state.selectedList.indexOf(element.id)){
		// 		element.checked = true
		// 	} else{
		// 		element.checked = false
		// 	}
		// })
	},
	unCheckAll(state) {
		state.list.forEach(v => {
			v.checked = false;
		})
		state.selectedList = [];
	},
	checkAll(state) {
		state.selectedList = state.list.map(v => {
			v.checked = true;
			//map()返回一个新数组，这里返回的是已选的id组成的一个数组，并且把list里的checked改变
			return v.id;
		})
	},
	selectedItem(state, index) {
		let id = state.list[index].id;
		let i = state.selectedList.indexOf(id);
		if (i > -1) {
			state.list[index].checked = false;
			return state.selectedList.splice(i, 1);
		}
		state.list[index].checked = true;
		state.selectedList.push(id);
	},
	deleteGoods(state){
		state.list = state.list.filter(element => {
			//将list中选中的数据筛选出去，达到删除的目的
			return state.selectedList.indexOf(element.id) === -1;
		})
	},
	addShopCart(state,goods){
		state.list.push(goods);
	}
}
const actions = {
	checkedAllFn({
		commit,
		getters
	}) {
		getters.checkedAll ? commit('unCheckAll') : commit('checkAll');
	},
	// delGoodsFn({commit}){
	// 	commit('deleteGoods');
	// 	commit('unCheckAll');
	// 	uni.showToast({
	// 		title:'删除成功',
	// 		icon:'none'
	// 	})
	// }
	delGoodsFn({commit,state}){
		
		uni.showModal({
			content:'确定删除吗?',
			success: () => {
				$http.request({
					url:"/deleteCart",
					method:"POST",
					header:{
						token:true
					},
					data:{
						goodsId:state.selectedList
					}
				}).then((res)=>{
					
					commit('deleteGoods');
					commit('unCheckAll');
					
					uni.showToast({
						title:'删除成功',
						icon:"none"
					})
					
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			}
		})
	}
}
const getters = {
	checkedAll(state) {
		return state.list.length === state.selectedList.length;
	},
	totalCount(state) {
		let total = {
			pprice: 0,
			num: 0
		}
		state.list.forEach(element => {
			if(state.selectedList.indexOf(element.id) > -1){
				total.pprice += element.pprice * element.num;
			}
		})
		total.num = state.selectedList.length;
		return total;
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
