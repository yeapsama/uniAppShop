<template>
	<view class="search">
		<myLine></myLine>
		
		<view class='search-item'>
			<view class='search-title'>
				<view class='f-color'>最近搜索</view>
				<view class='iconfont icon-iconset0213' @tap='clearHistory'></view>
			</view>
			<view v-if='searchData.length > 0'>
				<view 
					class='search-name f-color'
					v-for='(item,index) in searchData'
					:key='index'
					@tap='toSearchList(item)'
				>
					{{item}}
				</view>
			</view>
			<view v-else class='search-end'>暂无搜索记录</view>
		</view>
		
		<view class='search-item'>
			<view class='search-title'>
				<view class='f-color'>热门搜索</view>
			</view>
			<view>
				<view class='search-name f-color'>四件套</view>
				<view class='search-name f-color'>面膜</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import myLine from '@/compoments/common/Lines.vue'
	export default {
		data() {
			return {
				keyword:'',
				searchData:[],
			}
		},
		components:{
			myLine,
		},
		onLoad(){
			uni.getStorage({
				key:"searchData",
				success:(res)=> {
					this.searchData = JSON.parse(res.data);
				}
			})
		},
		// 点击搜索按钮事件
		onNavigationBarButtonTap(e){
			this.search();
		},
		// 监听搜索栏内容变化
		onNavigationBarSearchInputChanged(e){
			this.keyword = e.text;
		},
		// 监听软键盘搜索按钮点击
		onNavigationBarSearchInputConfirmed(e){
			this.search();
		},
		methods: {
			search(){
				if(this.keyword === ''){
					return uni.showToast({
						title:"关键词不能为空",
						icon:"none"
					})
				} else {
					uni.navigateTo({
						url:`../searchList/searchList?keyword=${this.keyword}`
					})
				}
				uni.hideKeyboard();
				this.addSearch();
			},
			//添加最近搜索
			addSearch(){
				let findWord = this.searchData.indexOf(this.keyword);
				if(findWord < 0) {
					// 没有相同的则添加
					this.searchData.unshift(this.keyword);
				} else {
					// 有相同的先删除再添加
					this.searchData.unshift(this.searchData.splice(findWord,1)[0]);
				}
				uni.setStorage({
					key:"searchData",
					data:JSON.stringify(this.searchData)
				})
			},
			clearHistory(){
				uni.showModal({
					title:"警告",
					content:"是否要删除搜索记录",
					cancelText:"取消",
					confirmText:"确定",
					success: (res) => {
						if(res.confirm){
							uni.removeStorage({
								key:"searchData"
							});
							this.searchData = [];
						}
					}
				})
			},
			//最近搜索跳转
			toSearchList(item){
				uni.navigateTo({
					url:`../searchList/searchList?keyword=${item}`
				})
			},
		}
	}
</script>

<style scoped>
.search-item{
	padding:20rpx;
}
.search-title{
	display: flex;
	justify-content: space-between;
}
.search-name{
	padding:4rpx 24rpx;
	background-color: #E1E1E1;
	display: inline-block;
	border-radius: 26rpx;
	margin:10rpx;
}
.search-end{
	text-align: center;
}
</style>
