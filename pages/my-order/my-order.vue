<template>
	<view class='my-order bg-active-color'>
		<Lines></Lines>
		<view class='order-header'>
			<view 
				class='header-item'
				v-for='(item,index) in tabHeader'
				:key='index'
				:class=' tabIndex==index?"active":""  '
				@tap='changeTab(index)'
			>{{item.name}}</view>
		</view>
		
		<!-- <block
			v-for='(tabItem,tabI) in tabList'
			:key='tabI'
		> -->
			<!-- <view v-show='tabI===tabIndex'> -->
				<view v-if='tabIndex == 0' class='order-main' :style="'height:'+clentHeight+'px;'">
					<!--商品-->
					<view v-for='(k,i) in tabList' :key='i'>
						<view class='order-goods'>
							<view class="order-content-header">
								<view style="display: flex;justify-content: center;align-items: center;">
									<image src="../../static/img/wxf.png" mode="" style="width: 40rpx;height: 40rpx;text-align: center;margin-right: 15rpx;"></image>
									<view>淘宝官方旗舰店</view>
								</view>
								<view class='f-active-color' v-if="k.order_status==3">已付款</view>
								<view class='f-active-color' v-else-if="k.order_status==2">待支付</view>
								<view class='f-active-color' v-else>待下单</view>
							</view>
							<view class='goods-item'v-for='(item,index) in k.data' :key="index">
								<OrderList :item='item' :index='index'></OrderList>
							</view>
						</view>
						<Lines></Lines>
						<!--总价-->
						<view class='total-price'>
							订单金额: <text class='f-active-color'>¥{{k.goods_price}}</text> (包含运费¥0.00)
						</view>
						<Lines style="width: 80%;margin: 0 auto;"></Lines>
						<!--支付-->
						<view class='payment'>
							<view class='payment-text f-active-color' v-if="k.order_status!=3">支付</view>
						</view>
					</view>
				</view>
				
				<view v-else-if='tabIndex == 1||tabIndex == 2||tabIndex == 3' class='order-main' :style="'height:'+clentHeight+'px;'">
					<!--商品-->
					<block v-for='(k,i) in tabList' :key='i'>
					<view v-show="k.order_status==tabIndex">
						<view class='order-goods'>
							<view class="order-content-header">
								<view style="display: flex;justify-content: center;align-items: center;">
									<image src="../../static/img/wxf.png" mode="" style="width: 40rpx;height: 40rpx;text-align: center;margin-right: 15rpx;"></image>
									<view>淘宝官方旗舰店</view>
								</view>
								<view class='f-active-color' v-if="k.order_status==3">已付款</view>
								<view class='f-active-color' v-else-if="k.order_status==2">待支付</view>
								<view class='f-active-color' v-else>待下单</view>
							</view>
							<view class='goods-item'v-for='(item,index) in k.data' :key="index">
								<OrderList :item='item' :index='index'></OrderList>
							</view>
						</view>
						<Lines></Lines>
						<!--总价-->
						<view class='total-price'>
							订单金额: <text class='f-active-color'>¥{{k.goods_price}}</text> (包含运费¥0.00)
						</view>
						<Lines style="width: 80%;margin: 0 auto;"></Lines>
						<!--支付-->
						<view class='payment'>
							<view class='payment-text f-active-color' v-if="k.order_status!=3">支付</view>
						</view>
					</view>
					</block>
				</view>
				<view v-else class='no-order' :style="'height:'+clentHeight+'px;'">
					<view>您还没有相关订单</view>
					<view class='no-order-home'>去首页逛逛</view>
				</view>
				
			<!-- </view> -->
		<!-- </block> -->
	</view>
</template>

<script>
	import Lines from '@/compoments/common/Lines.vue'
	import OrderList from '@/compoments/order/order-list.vue'
	import $http from '@/common/api/request.js'
	export default {
		data() {
			return {
				//高度
				clentHeight:0,
				//当前位置
				tabIndex:0,
				tabHeader:[{name:"全部"},{name:"待下单"},{name:"待付款"},{name:"已支付"}],
				//顶部选项卡的数据
				tabList:[
					{
						name:"全部",
						list:[
							{
								status:"待付款",
								totalPrice:'3999.00',
								goods_item:[
									{
										imgUrl:"../../static/img/Children3.jpg",
										name:"大姨绒毛大款2020年必须买,不买你就不行了必须买大姨绒毛大款2020年必须买,不买你就不行了必须买大姨绒毛大款2020年必须买,不买你就不行了必须买",
										attrs:"黑色",
										pprice:"299.00",
										num:"1"
									},
									{
										imgUrl:"../../static/img/Children3.jpg",
										name:"大姨绒毛大款2020年必须买,不买你就不行了必须买",
										attrs:"黑色",
										pprice:"299.00",
										num:"5"
									}
								]
							}
						]
					},
					{
						name:"待付款",
						list:[
							{
								status:"待付款",
								totalPrice:'3999.00',
								goods_item:[
									{
										imgUrl:"../../static/img/Children3.jpg",
										name:"大姨绒毛大款2020年必须买,不买你就不行了必须买大姨绒毛大款2020年必须买,不买你就不行了必须买大姨绒毛大款2020年必须买,不买你就不行了必须买",
										attrs:"黑色",
										pprice:"299.00",
										num:"1"
									},
									{
										imgUrl:"../../static/img/Children3.jpg",
										name:"大姨绒毛大款2020年必须买,不买你就不行了必须买",
										attrs:"黑色",
										pprice:"299.00",
										num:"5"
									}
								]
							}
						]
					},
					{
						name:"待发货",
						list:[]
					},
					{
						name:"待收货",
						list:[]
					},
					{
						name:"待评价",
						list:[]
					},
				]
			}
		},
		onReady() {
			
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = res.windowHeight - this.getClientHeight();
				}
			}),
			$http.request({
				url:"/myorder",
				method:"POST",
				header:{
					token:true
				}
			}).then((res)=>{
				this.tabList = res
			   console.log(res,'myordermyorder');
			}).catch((err)=>{
				uni.showToast({
					title:'请求失败',
					icon:'none'
				})
			})
			
		},
		components:{
			Lines,
			OrderList
		},
		methods: {
			//顶部切换
			changeTab(index){
				this.tabIndex = index;
			},
			//获取可视区域高度【兼容】
			getClientHeight(){
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if( system ==='ios' ){
					return 44+res.statusBarHeight;
				}else if( system==='android' ){
					return 48+res.statusBarHeight;
				}else{
					return 0;
				}
			}
		}
	}
</script>

<style scoped>
.no-order{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #FFFFFF;
}
.no-order-home{
	padding:6rpx 60rpx;
	border:2rpx solid #49BDFB;
	color:#49BDFB;
	border-radius: 40rpx;
}
.order-header{
	background-color: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom:2rpx solid #F7F7F7;
}
.header-item{
	text-align: center;
	flex: 1;
	line-height: 80rpx;
}
.active{
	border-bottom: 4rpx solid #49BDFB;
}

.order-content-header{
	display: flex;
	justify-content: space-between;
	background-color: #fff;
	padding: 20rpx;
}

.goods-status{
	display: flex;
	justify-content: flex-end;
	background-color: #FFFFFF;
	padding:20rpx;
}

.total-price{
	display: flex;
	justify-content: flex-end;
	background-color: #FFFFFF;
	padding:20rpx;
}
.payment{
	display: flex;
	justify-content: flex-end;
	background-color: #FFFFFF;
	padding:20rpx;
}
.payment-text{
	border:2rpx solid #49BDFB;
	padding:6rpx 40rpx;
	border-radius: 30rpx;
}
</style>
