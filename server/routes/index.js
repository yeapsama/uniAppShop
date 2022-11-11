var express = require('express');
var router = express.Router();
var connection = require('../db/sql')
var user = require('../db/UserSql.js')
var jwt = require('jsonwebtoken')
var alipaySdk = require('../db/alipay.js')
var AlipayFormData = require('alipay-sdk/lib/form').default

//用户短信存储
let codeInfo = []

// 后端解决跨域问题
// router.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });



/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});
//首页初始数据
router.get('/api/index_list/data', function(req, res, nex) {
	res.send({
		"code": "200",
		"data": {
			topBar: [{
					id: 1,
					name: '推荐'
				},
				{
					id: 2,
					name: '运动户外'
				},
				{
					id: 3,
					name: '服饰内衣'
				},
				{
					id: 4,
					name: '鞋靴箱包'
				},
				{
					id: 5,
					name: '美妆个护'
				},
				{
					id: 6,
					name: '家居数码'
				},
				{
					id: 7,
					name: '食品母婴'
				}
			],
			data: [{
					type: "swiperList",
					data: [{
							imgUrl: '../../static/img/swiper1.jpg'
						},
						{
							imgUrl: '../../static/img/swiper2.jpg'
						},
						{
							imgUrl: '../../static/img/swiper3.jpg'
						}
					]
				},
				{
					type: "recommendList",
					data: [{
							bigUrl: "../../static/img/Children.jpg",
							data: [{
									imgUrl: "../../static/img/Children1.jpg"
								},
								{
									imgUrl: "../../static/img/Children2.jpg"
								},
								{
									imgUrl: "../../static/img/Children3.jpg"
								}
							]
						},
						{
							bigUrl: "../../static/img/Furnishing.jpg",
							data: [{
									imgUrl: "../../static/img/Furnishing1.jpg"
								},
								{
									imgUrl: "../../static/img/Furnishing2.jpg"
								},
								{
									imgUrl: "../../static/img/Furnishing3.jpg"
								}
							]
						}
					]
				},
				{
					type: "commodityList",
					data: [{
							id: 1,
							imgUrl: "../../static/img/commodity1.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 2,
							imgUrl: "../../static/img/commodity2.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 3,
							imgUrl: "../../static/img/commodity3.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 4,
							imgUrl: "../../static/img/commodity4.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						}
					]
				}
			]
		}
	})
})


//首次第一次触底的数据
router.get('/api/index_list/1/data/2', function(req, res, next) {
	res.json({
		code: "0",
		data: [{
			type: "commodityList",
			data: [{
					id: 1,
					imgUrl: "../../static/img/commodity1.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 2,
					imgUrl: "../../static/img/commodity2.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 3,
					imgUrl: "../../static/img/commodity3.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 4,
					imgUrl: "../../static/img/commodity4.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				}
			]
		}]
	})
})
//运动户外第二次触底的数据
router.get('/api/index_list/2/data/3', function(req, res, next) {
	res.json({
		code: "0",
		data: [{
			type: "commodityList",
			data: [{
					id: 1,
					imgUrl: "../../static/img/commodity1.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 2,
					imgUrl: "../../static/img/commodity2.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 3,
					imgUrl: "../../static/img/commodity3.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 4,
					imgUrl: "../../static/img/commodity4.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				}
			]
		}]
	})
})
//运动户外第一次触底的数据
router.get('/api/index_list/2/data/2', function(req, res, next) {
	res.json({
		code: "0",
		data: [{
			type: "commodityList",
			data: [{
					id: 1,
					imgUrl: "../../static/img/commodity1.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 2,
					imgUrl: "../../static/img/commodity2.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 3,
					imgUrl: "../../static/img/commodity3.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 4,
					imgUrl: "../../static/img/commodity4.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				}
			]
		}]
	})
})
//运动户外第一次加载的数据
router.get('/api/index_list/2/data/1', function(req, res, next) {
	res.json({
		code: "0",
		data: [{
				type: "bannerList",
				imgUrl: "../../static/img/banner1.jpg"
			},
			{
				type: "iconsList",
				data: [{
						imgUrl: "../../static/img/icons1.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons2.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons3.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons4.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons5.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons6.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons7.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons8.png",
						name: "运动户外"
					}
				]
			},
			{
				type: "hotList",
				data: [{
						id: 1,
						imgUrl: "../../static/img/hot1.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/hot2.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imgUrl: "../../static/img/hot3.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			},
			{
				type: "shopList",
				data: [{
						bigUrl: "../../static/img/shop.jpg",
						data: [{
								id: 1,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 1,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							}
						]
					},
					{
						bigUrl: "../../static/img/shop.jpg",
						data: [{
								id: 1,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 1,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							}
						]
					}
				]
			},
			{
				type: "commodityList",
				data: [{
						id: 1,
						imgUrl: "../../static/img/commodity1.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/commodity2.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imgUrl: "../../static/img/commodity3.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imgUrl: "../../static/img/commodity4.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}
		]
	})
});
//服饰内衣第一次加载的数据
router.get('/api/index_list/3/data/1', function(req, res, next) {
	res.json({
		code: "0",
		data: [{
				type: "bannerList",
				imgUrl: "../../static/img/banner1.jpg"
			},
			{
				type: "iconsList",
				data: [{
						imgUrl: "../../static/img/icons1.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons2.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons3.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons4.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons5.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons6.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons7.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons8.png",
						name: "服饰内衣"
					}
				]
			},
			{
				type: "hotList",
				data: [{
						id: 1,
						imgUrl: "../../static/img/hot1.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/hot2.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imgUrl: "../../static/img/hot3.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			},
			{
				type: "shopList",
				data: [{
						bigUrl: "../../static/img/shop.jpg",
						data: [{
								id: 1,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 1,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							}
						]
					},
					{
						bigUrl: "../../static/img/shop.jpg",
						data: [{
								id: 1,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 1,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							}
						]
					}
				]
			},
			{
				type: "commodityList",
				data: [{
						id: 1,
						imgUrl: "../../static/img/commodity1.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/commodity2.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imgUrl: "../../static/img/commodity3.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imgUrl: "../../static/img/commodity4.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}
		]
	})
});

// 数据库
router.get('/api/goods/search', function(req, res, next) {
	//获取查询参数的key
	let [goodsName, orderName] = Object.keys(req.query);
	//获取name值
	let name = req.query.name;
	//获取orderName值
	let order = req.query[orderName];
	// connection.query("select * from goods_search where name like '%"+name+"%' order by "+orderName+" "+order+"",function(error,results,fields){
	connection.query(`select * from goods_search where name like '%${name}%' order by ${orderName} ${order}`,
		function(error, results, fields) {
			if (error) throw error;
			// console.log('the solution is :', results);
			res.send({
				code: '200',
				data: results
			})
		})
})


router.get('/api/goods/list', function(req, res, next) {
	let myData = {
		code: 0,
		data: []
	}
	for (let i = 1; i <= 18; i++) {
		if (i % 2 === 0) {
			myData.data.push({
				id: i,
				name: "家居家纺",
				data: [{
						name: "家纺",
						list: [{
								id: 1,
								name: "毛巾/浴巾",
								imgUrl: "../../static/img/list1.jpg"
							},
							{
								id: 2,
								name: "枕头",
								imgUrl: "../../static/img/list1.jpg"
							}
						]
					},
					{
						name: "生活用品",
						list: [{
								id: 1,
								name: "浴室用品",
								imgUrl: "../../static/img/list1.jpg"
							},
							{
								id: 2,
								name: "洗晒",
								imgUrl: "../../static/img/list1.jpg"
							}
						]
					}
				]
			})
		} else {
			myData.data.push(
			{
				id: i,
				name: "女装",
				data: [{
						name: "裙装",
						list: [{
								id: 1,
								name: "半身裙",
								imgUrl: "../../static/img/list1.jpg"
							},
							{
								id: 2,
								name: "连衣裙",
								imgUrl: "../../static/img/list1.jpg"
							}
						]
					},
					{
						name: "上衣",
						list: [{
								id: 1,
								name: "T恤",
								imgUrl: "../../static/img/list1.jpg"
							},
							{
								id: 2,
								name: "衬衫",
								imgUrl: "../../static/img/list1.jpg"
							}
						]
					}
				]
			}
			)
		}
	}
	res.json(myData)
});

//商品详情
router.get('/api/goods/id', function(req, res, next) {
  let id = req.query.id;
  connection.query(`select * from goods_search where id=${id}`, function (error, results, fields) {
    if (error) throw error;
    res.send({
  	  code:"0",
  	  data:results
    })
  });
});

//登录接口
router.post('/api/login', function(req, res, next) {
	
	//前端给后端的数据
	let params = {
		userName : req.body.userName,
		userPwd  : req.body.userPwd
	}
	//查询用户名或者手机号存在不存在
	 connection.query( user.queryUserName( params ) , function (error, results, fields) {
		 // console.log(results,11111);
		if( results.length > 0 ){
			 connection.query( user.queryUserPwd( params ) , function (err, result) {
				 // console.log(result,params,111);
				 if(  result.length > 0 ){
					 res.send({
					 	data:{
					 		success:true,
					 		msg:"登录成功",
							data:result[0]
					 	}
					 })
				 }else{
					 res.send({
						data:{
							success:false,
							msg:"密码不正确"
						}
					 })
				 }
			 })
		}else{
			res.send({
				data:{
					success:false,
					msg:"用户名或手机号不存在"
				}
			})
		}
	 })
});

//注册验证手机号是否存在
router.post('/api/registered', function(req, res, next) {
	
	//前端给后端的数据
	let params = {
		userName : req.body.phone
	};
	//查询手机号是否存在
	connection.query( user.queryUserName( params ) , function (error, results, fields) {
		if( results.length > 0 ){
			res.send({
				data:{
					success:false,
					msg:"手机号已经存在"
				}
			})
		}else{
			res.send({
				data:{
					success:true
				}
			})
		}
	})
})

//发送验证码
router.post('/api/code', function(req, res, next) {
	//前端给后端的数据
	let params = {
		userName : req.body.userName
	};
	//生成一个五位数的验证码
	let num = [];
	for(let i = 0 ; i < 5 ; i++){
		num.push(Math.floor(Math.random()*(1-9)+9))
	}
	// 将手机号生成的code存到数组里，再次调用该接口时先查找有没有code记录，如果有就更新，如果没有就插入(如果有需要可以加一个时间判断是否过期)
	if(codeInfo.length != 0){
		let findInfo = false
		codeInfo.some(element => {
			if(element.userName === params.userName){
				element.code = num.join('')
				findInfo = true
				return true
			}
		})
		if(!findInfo){
			codeInfo.push({userName:params.userName,code:num.join('')})
		}
	} else {
		codeInfo.push({userName:params.userName,code:num.join('')})
	}
	console.log(codeInfo,'codeInfo');
	
	res.send({
		data:{
			success:true,
			code:num.join('')
		}
	})
})

//注册
router.post('/api/addUser', function(req, res, next) {
	//前端给后端的数据
	let params = {
		userName : req.body.userName,
		userPwd : req.body.userPwd,
		nickName : req.body.nickName,
		userCode : req.body.code,
	};
	let userInfo = codeInfo.find(element => {
		if(params.userName == element.userName)
		return element.code
	});
	console.log(userInfo,'code!!!');
	if(params.userCode == userInfo.code){
		connection.query(user.insertUserData(params),function(error,results,fields){
			
				connection.query(`select * from user where userName='${params.userName}'`,function(error,result,fields){
					console.log(result[0],'注册的用户信息');
					res.send({
						data:{
							success:true,
							msg:'注册成功',
							data:result[0]
						}
					})
				})
			
		})
	}
	
})


//第三方登录
router.post('/api/loginother',function(req,res,next){
	let params = {
		provider:req.body.provider,
		openid:req.body.openid,
		nickName:req.body.nickName,
		avatarUrl:req.body.avatarUrl,
	}
	//查询数据
	connection.query(user.queryUserName(params),function(error,results,fields){
		if(results.length > 0){
			//查询到数据
			connection.query(user.queryUserName(params),function(e,r){
				res.send({
					data:r[0]
				})
			})
		}else{
			//查询不到数据,插入新数据
			connection.query(user.insertOtherUserData(params),function(err,result){
				//插入后查询结果返回给前端
				connection.query(user.queryUserName(params),function(e,r){
					res.send({
						data:r[0]
					})
				})
			})
		}
	})
})

//查询当前用户收货地址接口
router.post('/api/selectAddress',function(req,res,next){
	let token = req.headers.token;
	let info = jwt.decode(token);
	connection.query(`select id from user where phone='${info.name}'`,function(error,results){
		//拿到id，然后查询地址
		connection.query(`select * from address where userId='${results[0].id}'`,function(err,res1){
			// console.log(res);
			res.send({
				data:res1
			})
		})
		
	})
})

//新建当前用户收货地址接口
router.post('/api/addAddress',function(req,res,next){
	let token = req.headers.token;
	let info = jwt.decode(token);
	
	let name = req.body.name;
	let tel = req.body.tel;
	let province = req.body.province;
	let city = req.body.city;
	let district = req.body.district;
	let address = req.body.address;
	let isDefault = req.body.isDefault;
	
	console.log(req.body,'44444444444444');
	
	connection.query(`select id from user where phone='${info.name}'`,function(error,results){
		//拿到id，然后查询地址
		let sql = `insert into address (name,tel,province,city,district,address,isDefault,userId) values ("${name}","${tel}","${province}","${city}","${district}","${address}","${isDefault}","${results[0].id}")`
		connection.query(sql,function(err,res1){
			// console.log(res);
			res.send({
				data:res1
			})
		})
		
	})
})

//当前用户修改收货地址
router.post('/api/updateAddress', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);
	let name = req.body.name;
	let tel = req.body.tel;
	let province = req.body.province;
	let city = req.body.city;
	let district = req.body.district;
	let address = req.body.address;
	let isDefault = req.body.isDefault;
	let id = req.body.id;
	
	//获取userId
	connection.query(`select * from user where phone = '${phone.name}'`, function (error, results, fields) {
		let userId = results[0].id;
		connection.query(`select * from address where userId = ${userId} and isDefault = ${isDefault}`, function (err, result) {
			if(result.length > 0){
				let childId = result[0].id;
				//将该用户所有默认的地址取消默认，然后修改旧数据
				connection.query(`update address set isDefault = replace(isDefault,"1","0") where id = ${childId}`, function (e, r) {
					let updateSql = `update address set name = ?,tel = ?,province = ?,city = ?,district = ?,address = ?,isDefault = ?,userId = ? where id = ${id}`
					connection.query(updateSql,[name,tel,province,city,district,address,isDefault,userId],function (err, result) {
						res.send({
							data:{
								success:'成功'
							}
						})
					})
				})
			} else {
				let updateSql = `update address set name = ?,tel = ?,province = ?,city = ?,district = ?,address = ?,isDefault = ?,userId = ? where id = ${id}`
				connection.query(updateSql,[name,tel,province,city,district,address,isDefault,userId],function (err, result) {
					res.send({
						data:{
							success:'成功'
						}
					})
				})
			}
			
		})
	})
})

//获取当前用户购物车列表
router.post('/api/selectCart', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);
	connection.query(`select * from user where phone = '${phone.name}'`, function (error, results, fields) {
		//当前用户id
		let userId = results[0].id;
		console.log( userId )
		connection.query(`select * from goods_cart where uId = ${userId}`, function (err, result) {
			res.json({
				data:result
			})
		})
	})
})

//删除所选购物车内容
router.post('/api/deleteCart', function(req, res, next) {
	let goodsId = req.body.goodsId;
	
	for(let i = 0 ; i < goodsId.length ; i++){
		connection.query(`delete from goods_cart where id='${goodsId[i]}'`,function(e,r){
			res.json({
				data:{
					success:true
				}
			})
		})
	}
})


//当前用户修改收货地址
router.post('/api/updateAddress', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);
	let name = req.body.name;
	let tel = req.body.tel;
	let province = req.body.province;
	let city = req.body.city;
	let district = req.body.district;
	let address = req.body.address;
	let isDefault = req.body.isDefault;
	// let id = req.body.id;
	
	//获取userId
	connection.query(`select * from user where phone = '${phone.name}'`, function (error, results, fields) {
		let userId = results[0].id;
		connection.query(`select * from address where userId = ${userId} and isDefault = ${isDefault}`, function (err, result) {
			let childId = result[0].id;
			connection.query(`update address set isDefault = replace(isDefault,"1","0") where id = ${childId}`, function (e, r) {
				let updateSql = `update address set name = ?,tel = ?,province = ?,city = ?,district = ?,address = ?,isDefault = ?,userId = ? where id = ${id}`
				connection.query(updateSql,[name,tel,province,city,district,address,isDefault,userId],function (err, result) {
					res.send({
						data:{
							success:'成功'
						}
					})
				})
			})
		})
	})
})

//修改当前用户购物车商品数量
router.post('/api/updateNumCart', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);
	//商品id
	let goodsId = req.body.goodsId;
	//用户输入的商品数量
	let num = req.body.num;
	connection.query(`select * from user where phone = '${phone.name}'`, function (error, results, fields) {
		//当前用户id
		let userId = results[0].id;
		connection.query(`select * from goods_cart where uId = ${userId} and goods_id = ${goodsId}`, function (err, result) {
			//数据库中当前的数量
			let goods_num = result[0].num;
			//当前的id号
			let id = result[0].id;
			//修改[替换]
			connection.query(`update goods_cart set num = replace(num,${goods_num},${num}) where id = ${id}`, function (e, r) {
				res.json({
					data:{
						success:true
					}
				})
			})
		})
	})
})

//加入购物车
router.post('/api/addCart', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);
	//商品id
	let goods_id = req.body.goods_id;
	//用户输入的商品数量
	let num = req.body.num;
	connection.query(`select * from user where phone = '${phone.name}'`, function (error, results, fields) {
		//当前用户id
		let userId = results[0].id;
		connection.query(`select * from goods_search where id = ${goods_id}`, function (err, result) {
			let name = result[0].name;
			let imgUrl = result[0].imgUrl;
			let pprice = result[0].pprice;
			let oprice = result[0].oprice;
			let discount = result[0].discount;
			//查询当前用户之前是否添加过这个商品
			connection.query(`select * from goods_cart where uId = ${userId} and goods_id = ${goods_id}`, function (err, data) {
				if( data.length > 0){
					//如果当前用户已经添加过本商品,就让数量增加
					connection.query(`update goods_cart set num = replace(num,${data[0].num},${ parseInt(num) + parseInt(data[0].num) }) where id = ${data[0].id}`, function (e, r) {
						res.json({
							data:{
								success:"加入成功"
							}
						})
					})
				}else{
					//如果当前用户之前没有加入过本商品,需要添加进入
					// connection.query('insert into goods_cart (uId,goods_id,name,imgUrl,pprice,num) values ("'+userId+'","'+goods_id+'","'+name+'","'+imgUrl+'","'+pprice+'","'+num+'")', function (err, data) {
					connection.query(`insert into goods_cart (uId,goods_id,name,imgUrl,pprice,num,oprice,discount) values ("${userId}","${goods_id}","${name}","${imgUrl}","${pprice}","${num}","${oprice}","${discount}")`, function (err, data) {
						res.json({
							data:{
								success:"加入成功"
							}
						})
					})
				}
			})
		})
	})
})

//生成订单
router.post('/api/addOrder', function(req, res, next) {
    let token = req.headers.token;
    let phone = jwt.decode(token);
    //前端给后端传递的数据
    let goodsArr = req.body.arr;
    //生成订单号
    function setTimeDateFmt( s ){
        return s < 10 ? '0' + s : s;
    }
    function orderNumber(){
        const now = new Date();
        let fullYear = now.getFullYear();
        let month = setTimeDateFmt( now.getMonth() + 1 );
        let day = setTimeDateFmt( now.getDate() );
        let hour = setTimeDateFmt( now.getHours() );
        let minutes = setTimeDateFmt( now.getMinutes() );
        let seconds = setTimeDateFmt( now.getSeconds() );
        let orderCode = fullYear + month + day + hour + minutes + seconds + ( Math.round( Math.random() * 1000000 ));
        return orderCode;
    }
    //商品名称
    let goodsName = [];
    //订单总价
    let goodsPrice = 0;
    //订单商品总数量
    let goodsNum = 0;
    //订单号
    let orderId = orderNumber();
    
    goodsArr.forEach(v=>{
        goodsName.push(  v.name );
        goodsNum += parseInt(v.num);
        goodsPrice +=  v.num * v.pprice;
    })
    
    connection.query(`select * from user where phone = '${phone.name}'`, function (error, results, fields) {
    	//当前用户id
    	let userId = results[0].id;
        connection.query(`insert into store_order (uId,order_id,goods_name,goods_price,goods_num,order_status) values ('${userId}','${orderId}','${goodsName}','${goodsPrice}','${goodsNum}','1')`,function(){
            connection.query(`select * from store_order where uId = ${userId} and order_id = ${orderId}`,function(err,result){
                res.send({
                    data:{
                        code:200,
                        success:true,
                        data:result
                    }
                })
            })
        })
    })
})

//修改订单状态
router.post('/api/submitOrder', function(req, res, next) {
    let token = req.headers.token;
    let phone = jwt.decode(token);
    //订单号
    let orderId = req.body.orderId;
    //购物车中选中的商品
    let shopArr = req.body.shopArr;
    connection.query(`select * from user where phone = '${phone.name}'`, function (error, results, fields) {
    	//当前用户id
    	let userId = results[0].id;
        connection.query(`select * from store_order where uId = ${userId} and order_id = ${orderId}`,function(err,result){
            //订单的id
            let id = result[0].id;
			//将状态 修改为2(待支付)
                connection.query(`update store_order set order_status = replace(order_status,'1','2') where id = ${id}`,function(){
                    shopArr.forEach(v=>{
						//删除购物车中提交的商品
                        connection.query(`delete from goods_cart where id = ${v}`,function(){
                            
                        })
                    })
                    res.send({
                        data:{
                            code:200,
                            success:true
                        }
                    })
             })
        })
    })
})

//支付接口
// router.post('/api/payment', function(req, res, next) {
//     //接收前端给后端的订单号
//     let orderId = req.body.orderId;
//     //总价
//     let price = req.body.price;
//     //商品名称
//     let list = req.body.list.join('');
    
//     const formData = new AlipayFormData();
//     //调用get方法
//     formData.setMethod('get'),
//     //支付时 的信息
//     formData.addField('bizContent', {
//       outTradeNo: orderId,//订单号
//       productCode: 'FAST_INSTANT_TRADE_PAY',//写死的
//       totalAmount: price,//金额
//       subject: list//商品名称
//     });
//     //支付成功或者失败打开的页面
//     formData.addField('returnUrl', 'http://localhost:8080/#/pages/payment-success/payment-success');
//     const result = alipaySdk.exec(
//       'alipay.trade.page.pay',
//       {},
//       { formData: formData },
//     );
//     result.then(resp=>{
//         res.send({
//             data:{
//                 code:200,
//                 success:true,
//                 paymentUrl:resp
//             }
//         })
//     })
// })

router.post('/api/payment', function(req, res, next) {
	res.send({
		data:{
			code:200,
			success:true
		}
	})
})
	
module.exports = router;
