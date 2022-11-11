import vue from 'vue'
import Vuex from 'vuex'

import cart from '@/store/modules/cart.js'
import path from '@/store/modules/path.js'
import user from '@/store/modules/user.js'
import order from '@/store/modules/order.js'
vue.use(Vuex);


export default new Vuex.Store({
	modules:{
		cart,
		path,
		user,
		order
	}
})