<template>
	<view class='my'>
		<!--头部-->
		<view class='my-header'>
			<view class='header-main'>
				<view class='header-config' @tap='goConfig'>
					<image class='config-img' src="../../static/img/config.png" mode=""></image>
				</view>
				<view class='header-logo'>
					<image class='logo-img' :src=" loginStatus ? userInfo.imgUrl : '../../static/img/Children.jpg' " mode=""></image>
					<!-- <image class='logo-img' src="../../static/img/Children.jpg" mode=""></image> -->
					<view class='logo-name'>
						{{  loginStatus ? userInfo.nickName : "用户名称"   }}
						<!-- 用户名称 -->
					</view>
				</view>
			</view>
		</view>
		<!--我的订单-->
		<view class='order'>
			<view class='order-title' @tap='goOrder'>
				<view>我的订单</view>
				<view>全部订单 > </view>
			</view>
			<view class='order-list'>
				<view class='order-item'>
					<image  class='order-img' src="../../static/img/order1.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class='order-item'>
					<image  class='order-img' src="../../static/img/order2.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class='order-item'>
					<image  class='order-img' src="../../static/img/order3.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class='order-item'>
					<image  class='order-img' src="../../static/img/order4.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class='order-item'>
					<image  class='order-img' src="../../static/img/order5.png" mode=""></image>
					<view>待付款</view>
				</view>
			</view>
		</view>
		<!--内容列表-->
		<view class='my-content'>
			
			<view class="my-content-item" v-for="(item,index) in 8" :key="index">
				<image src="../../static/img/ico我的收藏.png" class="icon-img" mode=""></image>
				<view class="my-content-item-font">
					<view>我的收藏</view>
					<view style="color: #CCCCCC;">></view>
				</view>
			</view>
		</view>
		<Tabbar cureentPage='my'></Tabbar>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import Tabbar from '@/compoments/common/Tabbar.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			Tabbar
		},
		computed:{
			...mapState({
				loginStatus:state=>state.user.loginStatus,
				userInfo:state=>state.user.userInfo
			})
		},
		methods: {
			goConfig(){
				uni.navigateTo({
					url:'../my-config/my-config'
				})
			},
			goOrder(){
				uni.navigateTo({
					url:'../my-order/my-order'
				})
			},
		}
	}
</script>

<style scoped>
.my{
	background-color:#F5F5F5;
}
.my-header{
	background: url(../../static/img/mybg.png) no-repeat;
	width: 100%;
	height: 400rpx;
}
.header-main{
	position: relative;
	top:120rpx;
}
.header-config{
	position: absolute;
	left:20rpx;
}
.header-logo{
	position: absolute;
	left:50%;
	margin-left:-60rpx;
	width:120rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.config-img{
	width: 40rpx;
	height: 40rpx;
}
.logo-img{
	width: 120rpx;
	height: 120rpx;
	border:2rpx solid #CCCCCC;
	border-radius: 50%;
	background-color: #FFFFFF;
}
.logo-name{
	font-weight: bold;
	width: 500rpx;
	color:#FFFFFF;
	text-align: center;
}
.order{
	background-color: #FFFFFF;
}
.order-title{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
}
.order-list{
	padding: 20rpx;
	display: flex;
}
.order-item{
	flex:1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.order-img{
	width:66rpx;
	height: 66rpx;
}
.my-content{
	margin:20rpx 0;
	padding:0 20rpx;
	background-color: #FFFFFF;
}
.my-content-item{
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
}
.my-content-item-font{
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items:center;
	padding:20rpx 0; 
	margin-left: 15rpx;
	font-weight: 700;
	border-bottom: 1px solid #CCCCCC;
}
.icon-img{
	width: 40rpx;
	height: 40rpx;
	padding-right: 10rpx;
}
</style>
