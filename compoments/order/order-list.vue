<template>
	<view class='goods-content bg-active-color'>
		<image class='goods-img' :src="item.imgUrl" mode=""></image>
		<view class='goods-text'>
			<view class='goods-name'>{{item.name}}</view>
			<view class='goods-size f-color'>颜色分类：黑色</view>
			<view class='f-active-color' style='font-size:24rpx'>7天无理由</view>
		</view>
		<view>
			<view>¥{{item.pprice}}</view>
			<!-- <view class='f-color'>*{{item.num}}</view> -->
		</view>
	</view>
</template>

<script>
export default{
	props:{
		item:Object,
		index:Number
	}
}
</script>

<style scoped>
.goods-content{
	padding:10rpx 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.goods-text{
	width:360rpx;
	padding:0 10rpx;
	font-size:26rpx;
}
.goods-img{
	width:160rpx;
	height:160rpx;
}
.goods-name{
	font-size:26rpx;
	width: 360rpx;
	height: 85rpx;

	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp:2;
	-webkit-box-orient:vertical;
	word-break: break-all;
}
.goods-size{
	font-size:24rpx;
}
</style>
