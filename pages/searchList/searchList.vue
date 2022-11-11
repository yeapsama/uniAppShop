<template>
	<view>
		<shopList :keyword="keyword"></shopList>
	</view>
</template>

<script>
	import shopList from '@/compoments/common/shopList.vue'
	export default {
		data() {
			return {
				keyword:'',
			}
		},
		components:{
			shopList,
		},
		onLoad(e){
			this.keyword = e.keyword;
			// console.log(e,'eeeeeeee')
		},
		onLaunch() {
			// #ifdef APP-PLUS
			// 获取并设置头部搜索栏的默认词
			var webView = this.$mp.page.$getAppWebview(); 
			if(this.keyword != ''){
				webView.setTitleNViewSearchInputText(this.keyword)
			}
			// #endif
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
