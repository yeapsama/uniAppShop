import store from '@/store/index.js'
export default{
	common:{
		baseUrl:"http://10.207.119.239:3000/api",
		data:{},
		header:{
			"Content-Type":"application/json",
			"Content-Type":"application/x-www-form-urlencoded"
		},
		method:"GET",
		dataType:"json"
	},
	request( options={} ){
		
		uni.showLoading({
		    title: '加载中'
		});
		
		const HUrl = options.url;
		options.url = this.common.baseUrl + options.url;
		/**
		 * 如果是H5就直接拼api/xxx，因为manifest中已经配置了H5的跨域代理服务器
		 * 如果不是H5则正常拼完整路径
		 */
		// #ifdef H5
		options.url = 'api' + HUrl;
		// #endif
		console.log(options.url,'urlurl')
		options.data = 	options.data || this.common.data;
		options.header = options.header || this.common.header;
		options.method = options.method || this.common.method;
		options.dataType = 	options.dataType || this.common.dataType;
		
		//判断是否传入了header头的token进行用户是否登录的验证
		if(options.header.token){
			options.header.token = store.state.user.token;
			if(!options.header.token){
				uni.showToast({
					title:"请先登录",
					icon:"none"
				})
				return uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		}
		return new Promise((res,rej)=>{
			uni.request({
				...options,
				success: (result) => {
					if(result.statusCode != 200){
						if(result.statusCode == 404){
							return rej('没有更多数据了');
						} else {
							return rej('请求错误');
						}
					}
					setTimeout(function () {
					    uni.hideLoading();
					}, 500);
					let data = result.data.data;
					// let data = result.data;
					res(data);
				}
			})
		})
	}
}