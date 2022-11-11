<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
		<swiper-item v-for="(item,index) in dataList" :key="index">
			<image :src="item.imgUrl" mode="" class="pic"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		props:{
			dataList:Array,
			default:[]
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	swiper {
		width: 100%;
		/* app中需要改变默认的150px高度swiper */
		height: 400rpx;
	}
	.pic {
		width: 100%;
		height: 400rpx;
	}
</style>