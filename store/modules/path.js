const state = {
	list:[
		{
			name:'张三',
			tel:'18200689135',
			province:'广东省',
			city:'茂名市',
			district:'市疾控中心',
			address:'123号楼',
			isDefault:true,
		},
		{
			name:'李四',
			tel:'18200689135',
			province:'广东省',
			city:'中山市',
			district:'五桂山街道',
			address:'常胜客酒店',
			isDefault:false,
		},
		{
			name:'张三',
			tel:'18200689135',
			province:'广东省',
			city:'广州市',
			district:'天河区',
			address:'123软件科技园',
			isDefault:false,
		},
	]
}

const getters = {
	defaultPath(state){
		return state.list.filter(element => {
			return element.isDefault == 1;
		});
	}
}
const mutations = {
	__initAddressList(state,data){
		state.list = data
	},
	createPath(state,data){
		state.list.unshift(data);
	},
	//修改地址信息
	updatePath(state,{index,item}){
		//这里{index,item}是将传递过来的obj解构，item就是详细信息，index就是obj的一个属性，表示下标
		//state.list[index][k]表示第index项的数据的k属性等于obj的k属性，也就是更新已有的用户地址信息
		for(let k in item){
			state.list[index][k] = item[k];
		}
	},
	//移除之前默认的地址
	removePath(state){
		state.list.forEach(element => {
			if(element.isDefault){
				element.isDefault = 0;
			}
		})
	}
}
const actions = {
	createPathFn({commit},data){
		if(data.isDefault){
			//如果创建的数据设为默认的话，先移除之前的默认的
			commit('removePath');
		}
		commit('createPath',data);
	},
	updatePathFn({commit},obj){
		if(obj.item.isDefault){
			//如果修改的数据设为默认的话，先移除之前的默认的
			commit('removePath');
		}
		commit('updatePath',obj);
	}
	
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}