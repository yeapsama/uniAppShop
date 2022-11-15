<template>
	<view>
		<!--自定义导航栏-->
		<uniNavBar 
			title='确认支付' 
			left-text='关闭' 
			fixed='true'
			status-bar='true'
			@clickLeft='goBack'
		></uniNavBar>
		
		<view class='pay-main'>
			<radio-group>
				<label for="">
					<view class="pay-item">
						<view class="pay-item-left">
							<image class='pay-img' src='../../static/img/zfb.png' mode=""></image>
							<view>
								<view>支付宝支付</view>
								<view class='pay-txt'>推荐支付宝用户使用</view>
							</view>
						</view>
						<label class="radio">
							<radio value="" color='#FF3333'/><text></text>
						</label>
					</view>
				</label>
				<label for="">
					<view class="pay-item">
						<view class="pay-item-left">
							<image class='pay-img' src='../../static/img/wxf.png' mode=""></image>
							<view>
								<view>微信支付</view>
								<view class='pay-txt'>推荐微信用户使用</view>
							</view>
						</view>
						<label class="radio">
							<radio value="" color='#FF3333'/><text></text>
						</label>
					</view>
				</label>
			</radio-group>
		</view>
		<!--去支付-->
		<view class='pay-foot'>
			<view class='total'>
				<text class="f-color">合计:</text>
				<text class='total-price'>¥{{details.price}}</text>
			</view>
			<view class="go-pay" @tap='goPayment'>去支付</view>
		</view>
		
	</view>
</template>

<script>
    
	import uniNavBar from '@/compoments/uni/uni-nav-bar/uni-nav-bar.vue'
	import $http from '@/common/api/request.js'
    import {mapState} from 'vuex'
    export default {
		data() {
			return {
				details:{
					price:0,
                    list:[]
				}
			}
		},
        computed:{
            ...mapState({
                orderNumber:state=>state.order.ordernum,
            })
        },
		components:{
			uniNavBar
		},
		onLoad(e) {
			this.details = JSON.parse( e.details );
		},
		methods: {
			//点击关闭返回上一页
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			goPayment(){
                
                // $http.request({
                // 	url:"/payment",
                // 	method:"POST",
                // 	header:{
                // 		token:true
                // 	},
                //     data : {
                //         orderId:this.orderNumber,
                //         price:this.details.price,
                //         list:this.details.list
                //     }
                // }).then((res)=>{
                    
                // 	plus.runtime.openURL( res.paymentUrl );
                    
                // })
                console.log(this.orderNumber,'11111111111111');
				$http.request({
				        	url:"/payment",
				        	method:"POST",
				        	header:{
				        		token:true
				        	},
				            data:{
				// 传递orderId给后端修改状态：待支付；传递selectedList给后端删除购物车里面被提交的数据
				                orderId:this.orderNumber,
				            }
				        }).then((res)=>{
				        	if( res.success ){
				                uni.navigateTo({
				                	url:"../payment-success/payment-success"
				                })
				            }
				        }).catch(()=>{
				        	uni.showToast({
				        		title:'请求失败',
				        		icon:'none'
				        	})
				        })
                
			}
		}
	}
</script>

<style scoped>
.pay-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:20rpx 0 20rpx;
	margin-left: 30rpx;
	border-bottom: 2rpx solid #CCCCCC;
}
.pay-item-left{
	display: flex;
}
.pay-img{
	width: 100rpx;
	height: 100rpx;
	padding-right: 25rpx;
}
.pay-txt{
	color:#CCCCCC;
}
.pay-foot{
	width:100%;
	position: fixed;
	left:0;
	bottom:0;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.total{
	padding-left:50rpx;
	flex:1;
	font-weight: 700;
	font-size: 32rpx;
	background-color:rgba(0, 0, 0, .8);
	line-height: 100rpx;
}
.go-pay{
	color:#FFFFFF;
	background-color: #49BDFB;
	line-height: 100rpx;
	text-align: center;
	width:220rpx;
}
.total-price{
	color:#FFFFFF;
	padding-left: 20rpx;
}
</style>
