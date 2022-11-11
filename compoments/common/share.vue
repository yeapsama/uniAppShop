<template>
	<view class="share">
		<view class="pop" v-show='isShow' @touchmove.stop.prevent=''>
			<!--蒙层-->
			<view class='pop-mask' @tap='hidePop'></view>
			<!--内容块-->
			<view class='pop-box' :animation="animationData">
				<view class="share-content">
					<view class="share-item" v-for="(item,index) in shareFunc" :key="index" @tap="shareSub(index)">
						<image class='pop-img' :src="item.imgUrl" mode=""></image>
						<view class="pop-text">{{item.name}}</view>
					</view>
				</view>
				<view class='pop-sub' @tap='cancelShare'>
					取消
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				// isShow:false,
				animationData:{},
				shareFunc:[
					{id:1,name:'微信',imgUrl:'../../static/img/wx-share.png'},
					{id:2,name:'QQ',imgUrl:'../../static/img/QQ-share.png'},
					{id:3,name:'微博',imgUrl:'../../static/img/wb-share.png'},
					{id:4,name:'凑数的',imgUrl:'../../static/img/link.png'},
					{id:5,name:'凑数的',imgUrl:'../../static/img/link.png'},
					{id:6,name:'凑数的',imgUrl:'../../static/img/link.png'},
				]
			}
		},
		props:{
			isShow:Boolean,
			shareInfo:Object,
		},
		methods:{
			showPop(){
				
				var animation = uni.createAnimation({
				   duration: 200
				})
				animation.translateY(600).step();
				this.animationData = animation.export();
				// this.isShow = true;
				
				setTimeout(()=>{
					this.$emit('changeFlag',true);
					animation.translateY(0).step();
					this.animationData = animation.export();
				},200)
			},
			
			hidePop(){
				var animation = uni.createAnimation({
				   duration: 200
				})
				animation.translateY(600).step();
				this.animationData = animation.export();
				this.$emit('changeFlag',true);
				// this.isShow = true;
				setTimeout(()=>{
					animation.translateY(0).step();
					// this.isShow = false;
					this.$emit('changeFlag',false);
				},200)
			},
			
			cancelShare(){
				this.hidePop();
			},
			shareSub(index){
				console.log(this.shareInfo);
				if(index === 0) {
					console.log('wx');
					uni.share({
						"provider":"weixin",
						"type":0,
						"scene":"WXSceneSession",
						"title":this.shareInfo.title,
						"href":this.shareInfo.shareUrl,
						"imageUrl":this.shareInfo.imgUrl,
						success: function (res) {
							uni.showTabBar({
								title:"分享成功"
							})
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					})
				} else if(index === 1) {
					console.log('qq');
					uni.share({
						"provider":"qq",
						"type":0,
						"title":this.shareInfo.title,
						"href":this.shareInfo.shareUrl,
						"imageUrl":this.shareInfo.imgUrl,
						success: function (res) {
							uni.showTabBar({
								title:"分享成功"
							})
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					})
				} else if (index === 2) {
					uni.share({
						"provider":"sinaweibo",
						"type":0,
						"title":this.shareInfo.title,
						"href":this.shareInfo.shareUrl,
						"imageUrl":this.shareInfo.imgUrl,
						success: function (res) {
							uni.showTabBar({
								title:"分享成功"
							})
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					})
				} else {
					uni.showTabBar({
						title:"分享成功(这是凑数的)"
					})
				}
			}
		}
	}
</script>

<style scoped>
	.pop{
		position: fixed;
		left:0;
		top:0;
		width: 100%;
		height: 100%;
		z-index: 9999;
	}
	.pop-mask{
		position: absolute;
		left:0;
		top:0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
	}
	.pop-box{
		position: absolute;
		left:0;
		bottom:0;
		width: 100%;
		/* height: 600rpx; */
		background-color: #FFFFFF;
	}
	.pop-img{
		width: 150rpx;
		height: 150rpx;
	}
	.pop-num{
		padding:20rpx;
		display: flex;
		justify-content: space-between;
	}
	.pop-sub{
		line-height: 100rpx;
		/* margin-top: 200rpx; */
		background-color:#F4F4F4;
		color:black;
		text-align: center;
	}
	.share-content{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	.share-item{
		width: 33.333%;
		/* height: 300rpx; */
		padding: 50rpx 0;
		display: flex;
		flex-direction: column;
		justify-items: center;
		align-items: center;
	}
</style>