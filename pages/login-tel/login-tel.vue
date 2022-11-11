<template>
	<view>
		<Lines></Lines>
		<view class='login-tel'>
			<view class='close' @tap='goBack'>
				<image class='close-img' src="../../static/img/close.png" mode=""></image>
			</view>
			<view class='tel-main'>
				<view class='login-from'>
					<view class='login-user'>
						<text class='user-text'>手机号</text>
						<input type="number" focus='true' v-model="userTel" value="" placeholder="请输入11位手机号"/>
					</view>
				</view>
				<view class='tel' @tap='goNextCode'>下一步</view>
				<view class='login-tips'>下一步代表您同意<text class="f-active-color">《全有商城用户隐私条例》</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from '@/compoments/common/Lines.vue'
	export default {
		data() {
			return {
				userTel:'',
				//验证的规格
				rules:{
					userTel:{
						rule:/^1[3456789]\d{9}$/,
						msg:"请输入11位手机号"
					},
				}
			}
		},
		components:{
			Lines
		},
		methods: {
			//关闭当前页面，返回上一页
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//判断验证是否符合要求
			validate(key){
				let bool = true;
				if(  !this.rules[key].rule.test(this[key]) ){
					uni.showToast({
						title:this.rules[key].msg,
						icon:"none"
					})
					bool=false;
					return false;
				}
				return bool;
			},
			goNextCode(){
				
				if(  !this.validate('userTel')  ) return;
				
				$http.request({
					url:"/registered",
					method:"POST",
					data:{
						phone:this.userTel
					}
				}).then((res)=>{
					
					if(!res.success){
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
						return ;
					}else{
						uni.navigateTo({
							url:"../login-code/login-code?phone="+this.userTel+""
						})
					}
					
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			}
		}
	}
</script>

<style scoped>
.login-tel{
	width: 100vw;
	height: 100vh;
	/* padding: 100rpx 0; */
}
.close{
	/* padding:10rpx 0; */
	padding: 100rpx 10rpx;
}
.close-img{
	width:60rpx;
	height: 60rpx;
}
.tel-main{
	padding:0 20rpx;
}
.login-from{
	padding:30rpx 0;
}
.login-user{
	font-size:32rpx;
	padding:10rpx 0;
	display: flex;
	align-items: center;
	border-bottom:2rpx solid #f7f7f7;
}
.user-text{
	padding-right:10rpx;
}
.tel{
	width:100%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color:#FFFFFF;
	background-color: #49BDFB;
	border-radius: 40rpx;
}
.login-tips{
	padding-top: 20rpx;
	font-size: 26rpx;
	color: #CCCCCC;
	text-align: center;
}
</style>
