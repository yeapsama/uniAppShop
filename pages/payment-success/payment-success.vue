<template>
	<view class='payment-success'>
		<image class="success-img" src="../../static/img/payment-success.png" mode=""></image>
		<view class='f-active-color' style='font-size:52rpx;'>恭喜您支付成功</view>
		<view @tap='goIndex' class="return-index f-active-color">点此返回首页</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goIndex(){
				uni.reLaunch({
					url:"../index/index"
				})
			}
		}
		
	}
</script>

<style scoped>
.payment-success{
	position: absolute;
	left:0;
	right:0;
	bottom:0;
	top:0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.success-img{
	width: 180rpx;
	height: 180rpx;
}
.return-index{
	padding:10rpx 30rpx;
	border:2px solid #49BDFB;
	border-radius: 40rpx;
}
</style>
