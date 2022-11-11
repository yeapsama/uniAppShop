var User = {
	//查询用户名
	queryUserName(param){
		if(param.userName){
			return `select * from user where userName='${param.userName}' or phone='${param.userName}'`;
		} else {
			// 第三方登录查询语句
			return `select * from user where provider='${param.provider}' or openid='${param.openid}'`;
		}
	},
	//验证用户名和密码
	queryUserPwd(param){
		return `select * from user where (userName='${param.userName}' or phone='${param.userName}') and userPwd='${param.userPwd}'`;
	},
	//增加用户数据
	insertUserData(param){
		const jwt = require('jsonwebtoken');
		let payload = {name:param.userName};
		let secret = 'xiong';
		let token = jwt.sign(payload,secret);
		return `insert into user(userName,userPwd,phone,imgUrl,nickName,token,provider,openid) values ("${param.userName}","${param.userPwd}","${param.userName}","http://10.207.126.100:8080/static/img/commodity4.jpg","${param.nickName}","${token}","","")`;
	},
	//第三方登录增加用户数据
	insertOtherUserData(param){
		const jwt = require('jsonwebtoken');
		let payload = {name:param.openid};
		let secret = 'xiong';
		let token = jwt.sign(payload,secret);
		return `insert into user(userName,userPwd,phone,imgUrl,nickName,token,provider,openid) values ("","","${param.openid}","${param.avatarUrl}","${param.nickName}","${token}","${param.provider}","${param.openid}")`;
	}
}
exports = module.exports = User;