<template>
	<view>
		<Lines></Lines>
		<view class='login-tel'>
			<view class='tel-main'>
				<view class='login-from'>
					<view class='login-user'>
						<text class='user-text'>验证码</text>
						<input type="text" placeholder="请输入验证码" v-model="userCode"/>
						<button plain='true' size='mini' :disabled="disabled" @tap='sendCode' style="font-size: 20rpx;"> {{codeMsg}} </button>
					</view>
					<view class='login-user'>
						<text class='user-text'>密码</text>
						<input type="text" placeholder="6-16位字符" v-model="userPwd"/>
					</view>
					<view class='login-user'>
						<text class='user-text'>确认密码</text>
						<input type="text" placeholder="再次输入密码" v-model="userPwd2"/>
					</view>
					<view class='login-user'>
						<text class='user-text'>用户名</text>
						<input type="text" placeholder="请输入用户名" v-model="nickName"/>
					</view>
				</view>
				<view class='tel' @tap='goNextIndex'>下一步</view>
				<view class='login-tips'>我们已向手机<text class="f-active-color">{{phone}}</text>发送验证码(<text class="f-active-color">{{getCode}}</text>)</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from '@/compoments/common/Lines.vue'
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				//倒计时到时间
				codeNum:60,
				//显示到文本
				codeMsg:"",
				//按钮是否禁用
				disabled:false,
				//用户输入的内容
				userCode:'',
				//手机号
				phone:'',
				//得到的验证码
				getCode:"",
				//注册密码
				userPwd:'',
				userPwd2:'',
				nickName:'',
				rules:{
					userPwd:{
						rule:/^[0-9a-zA-z]{6,16}$/,
						msg:"密码应该为6-16位字符"
					}
				}
			}
		},
		components:{
			Lines
		},
		onReady() {
			this.codeMsg = '重新发送（'+this.codeNum+'）';
			this.sendCode();
		},
		onLoad(e) {
			this.phone = e.phone; 
		},
		methods: {
			...mapMutations('user',['loginFn']),
			//点击验证码发送
			sendCode(){
				//请求接口返回验证码
				$http.request({
					url:"/code",
					method:"POST",
					data:{
						userName:this.phone
					}
				}).then((res)=>{
					
					this.getCode = res.code;
						
						
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
				
				this.disabled = true;
				let timer = setInterval(()=>{
					--this.codeNum;
					this.codeMsg = '重新发送（'+this.codeNum+'）';
				},1000);
				setTimeout(()=>{
					clearInterval(timer);
					this.codeNum=60;
					this.disabled = false;
					this.codeMsg = '重新发送';
				},60000)
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
			//点击下一步
			goNextIndex(){
				if(  !this.validate("userPwd") )   return;
				if(this.userPwd != this.userPwd2){
					uni.showToast({
						title:'密码不相同',
						icon:'none'
					})
					return 
				}
				
				if(  this.getCode == this.userCode ){
					//请求接口==》往数据库增加一条数据
					$http.request({
						url:"/addUser",
						method:"POST",
						data:{
							userName:this.phone,
							userPwd:this.userPwd,
							nickName:this.nickName,
							code:this.userCode,
						}
					}).then((res)=>{
						//注册成功
						if( res.success ){
							
							uni.showToast({
								title:res.msg,
								icon:"none"
							})
							
							this.loginFn(res.data);
							
							uni.redirectTo({
								url:"../index/index"
							})
							
						}
						
					}).catch(()=>{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					})
					
				}else{
					uni.showToast({
						title:"验证码错误",
						icon:"none"
					})
				}
			}
		}
	}
</script>

<style scoped>
.login-tel{
	width: 100vw;
	height: 100vh;
}
.tel-main{
	padding:0 20rpx;
}
.login-from{
	padding:30rpx 0;
}
.login-user{
	width: 100%;
	font-size:32rpx;
	padding:10rpx 0;
	display: flex;
	align-items: center;
	border-bottom:2rpx solid #f7f7f7;
}
.user-text{
	display: block;
	width: 140rpx;
	/* text-align: right; */
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
