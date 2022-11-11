<template>
	<view class="index">
		<!-- 微信导航栏适配 -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="wx-nav">
			<view class="iconfont icon-magnifier">
			</view>
			<text>全有商城</text>
			<view class="iconfont icon-xiaoxi">
			</view>
		</view>
		<!-- #endif -->
		<scroll-view scroll-x="true" class="scroll-content" :scroll-into-view="followIndex">
			<view :id="'barIndex'+index" class="scroll-item" v-for="(item,index) in topBar" :key="index" @tap="selectBarFunc(index)">
				<text :class="selectBar === index? 'f-active-color' : 'f-color'">{{item.name}}</text>
			</view>
		</scroll-view>
		
		<swiper :current="selectBar" @change="swiperChange" :style="'height: '+clentHeight+'px;'">
			<swiper-item v-for="(item,index) in newTopBar" :key="index">
				<!-- <view class="swiper-item" v-show="selectBar === 0">
					
				</view>
				<view class="swiper-item" v-show="selectBar !== 0">
					{{selectBar}}
				</view> -->
				
				
				<scroll-view scroll-y="true" :style="'height: '+clentHeight+'px;'" @scrolltolower="loadMore(index)">
					<block v-if="item.data.length > 0">
						<block v-for="(i,index2) in item.data">
							<index-swiper v-if="i.type === 'swiperList'" :dataList='i.data'></index-swiper>
							<template v-if="i.type === 'recommendList'">
								<recommend :dataList='i.data'></recommend>
								<!-- uniapp的bug，不能把卡片放上方，所以只能跟推荐包在一起 -->
								<myCard :cardTitle="cardTitle"></myCard>
							</template>
							
							<!-- 其他模板 -->
							<banner v-if="i.type === 'bannerList'" :dataList="i.imgUrl"></banner>
							<template v-if="i.type === 'iconsList'">
								<myIcon :dataList="i.data"></myIcon>
								<myCard cardTitle="热销爆品"></myCard>
							</template>
							<template v-if="i.type === 'hotList'">
								<hot :dataList="i.data"></hot>
								<myCard cardTitle="推荐商品"></myCard>
							</template>
							<template v-if="i.type === 'shopList'">
								<recommendShop :dataList="i.data"></recommendShop>
								<myCard cardTitle="为您推荐"></myCard>
							</template>
							
							<commodityList v-if="i.type === 'commodityList'" :dataList='i.data'></commodityList>
						</block>
					</block>
					
					<view v-else>
						暂无数据......
					</view>
					<view class='load-text f-color'>
						{{item.loadText}}
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<tabBar cureentPage="index"></tabBar>
	</view>
</template>

<script>
	import indexSwiper from '@/compoments/index/indexSwiper.vue';
	import recommend from '@/compoments/index/recommend.vue';
	import myCard from '@/compoments/common/card.vue';
	import commodityList from '@/compoments/common/commodityList.vue'
	import banner from '@/compoments/index/banner.vue'
	import myIcon from '@/compoments/index/icons.vue'
	import hot from '@/compoments/index/hot.vue'
	import recommendShop from '@/compoments/index/recommendShop.vue'
	import $http from '@/common/api/request.js'
	import tabBar from '@/compoments/common/Tabbar.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				selectBar:0,
				//跟随的索引值
				followIndex:'barIndex0',
				//页面高度
				clentHeight:0,
				//导航条数据
				topBar:[],
				//导航条下方数据
				newTopBar:[],
				dataList:[
					{
						bigUrl:'../../static/img/Children.jpg',
						data:[
							{
								imgUrl:'../../static/img/Children1.jpg',
							},
							{
								imgUrl:'../../static/img/Children2.jpg',
							},
							{
								imgUrl:'../../static/img/Children3.jpg',
							},
						]
					},
					{
						bigUrl:'../../static/img/Children.jpg',
						data:[
							{
								imgUrl:'../../static/img/Children1.jpg',
							},
							{
								imgUrl:'../../static/img/Children2.jpg',
							},
							{
								imgUrl:'../../static/img/Children3.jpg',
							},
						]
					},
				],
				cardTitle:'猜你喜欢',
				testDemo:'123',
			}
		},
		components:{
			indexSwiper,
			recommend,
			myCard,
			commodityList,
			banner,
			myIcon,
			hot,
			recommendShop,
			tabBar
		},
		onLoad() {
		this.dataInit();
		},
		onReady() {
			
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = res.windowHeight - this.getClientHeight();
				}
			})
			
			// let view = uni.createSelectorQuery().select('.swiper-item');
			// view.boundingClientRect(data => {
			// 	// this.clentHeight = data.height;
			// 	this.clentHeight = 2000
			// }).exec();
			
		},
		onNavigationBarButtonTap(e) {
			if(e.float == 'left') {
				uni.navigateTo({
					url:'../search/search'
				})
			}
		},
		methods: {
			dataInit(){
				$http.request({url:'/index_list/data'}).then(res => {
					console.log(res);
					this.topBar = res.topBar;
					this.newTopBar = this.initData(res);
					console.log(this.topBar,this.newTopBar,'8888888888888')
				}).catch(()=>{
					console.log("请求失败！")
				});
			},
			//添加数据
			initData(res){
				let arr = [];
				for(let i =0;i<this.topBar.length;i++){
					let obj = {
						data:[],
						load:"first",
						loadText:"上拉加载更多..."
					}
					//获取首次数据
					if(i==0){
						obj.data = res.data;
					}
					arr.push(obj)
				}
				return arr;
			},
		selectBarFunc(index){
			if(this.selectBar === index) {
				return;
			}
			this.selectBar = index;
			this.followIndex = `barIndex${index}`;
			if(this.newTopBar[this.selectBar].load === 'first'){
				if(this.selectBar === 0) return;
				this.addData();
			}
		},
		addData(callback){
			// console.log(this.selectBar,'selectBar')
			let index = this.selectBar;
			let id = this.topBar[index].id;
			//每请求五次相同的数据在加一页
			let page = Math.ceil(this.newTopBar[index].data.length / 5) + 1;
			$http.request({
				// url:`/index_list/${id}/data/1`,
				url:'/index_list/'+id+'/data/'+page+'',
			}).then(res => {
				// let data = res.data.data;
				this.newTopBar[index].data = [...this.newTopBar[index].data,...res];
				this.newTopBar[index].load = 'last';
				console.log(this.newTopBar,'newTopBar');
			}).catch((error) => {
				uni.showToast({
					title:error,
					icon:'none'
				});
			})
			
			if(typeof callback === 'function') {
				callback();
			}
		},
		loadMore(index){
			this.newTopBar[index].loadText = "加载中......";
			this.addData(()=>{
				this.newTopBar[index].loadText = "上拉加载更多...";
			})
		},
		swiperChange(e){
			this.selectBarFunc(e.detail.current);
		},
		//获取可视区域高度【兼容】
		getClientHeight(){
			const res = uni.getSystemInfoSync();
			const system = res.platform;
			//statusBarHeight 状态栏的高度
			if( system ==='ios' ){
				return 44+res.statusBarHeight;
			}else if( system==='android' ){
				return 48+res.statusBarHeight;
			}else{
				//微信小程序
				return 0;
			}
		},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	/* 微信适配 */
	.wx-nav {
		display: flex;
		text-align: center;
		height: 200rpx;
		width: 100%;
		line-height: 200rpx;
		justify-content: space-between;
		align-items: center;
	}
	
	.scroll-content{
		width: 100%;
		height: 80rpx;
		white-space: nowrap;
	}
	.scroll-item{
		display: inline-block;
		padding: 10rpx 30rpx;
		font-size: 32rpx;
	}
	.f-active-color{
		padding: 10rpx 0;
		border-bottom: 6rpx solid #49BDFB;
	}
	.load-text{
		border-top:2rpx solid #636263;
		line-height: 60rpx;
		text-align: center;
	}
</style>
