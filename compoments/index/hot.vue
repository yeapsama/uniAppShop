<template>
	<view class="hot">
		<commodity :dataList="dataList"  itemW='250rpx' bigH='220rpx'></commodity>
	</view>
</template>

<script>
	import commodity from '@/compoments/common/commodityItem.vue';
	export default {
		props:{
			dataList:Array,
		},
		components:{
			commodity,
		}
	}
</script>

<style>
</style>