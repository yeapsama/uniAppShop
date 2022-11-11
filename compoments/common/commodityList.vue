<template>
	<view class="">
		<commodityItem :dataList="dataList"></commodityItem>
	</view>
</template>

<script>
	import commodityItem from './commodityItem.vue';
	export default {
		props:{
			dataList:Array
		},
		data(){
			return {
				commodityData:[
					{
						id:1,
						imgUrl:"../../static/img/commodity1.jpg",
						name:"这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称",
						pprice:"599",
						oprice:"399",
						discount:"5.2"
					},
					{
						id:2,
						imgUrl:"../../static/img/commodity1.jpg",
						name:"这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称",
						pprice:"599",
						oprice:"399",
						discount:"5.2"
					},
					{
						id:3,
						imgUrl:"../../static/img/commodity1.jpg",
						name:"这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称",
						pprice:"599",
						oprice:"399",
						discount:"5.2"
					},
				],
			}
		},
		components:{
			commodityItem,
		},
	}
</script>

<style>
</style>