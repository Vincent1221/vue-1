//1.导包
const express = require('express');
const bodyParser = require('body-parser')

//2.创建App
const app = express();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

app.all('/*',(req,res,next)=>{
	
	//告诉浏览器一些额外信息
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
      res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.setHeader("X-Powered-By",' 3.2.1')
      res.setHeader("Content-Type", "application/json;charset=utf-8");
	
	next();
})

//3.路由处理
app.get('/login',(req,res)=>{
	const result = {status:1,message:"登录成功"}
	// 		/login?username=zhangsan&password=123
	if (req.query.username=='zhangsan' && req.query.password=='123'){
		
	}else{
		result.status = 0;
		result.message = "用户名或密码失败"
	}
	res.setHeader("Content-Type","text/json;charset=utf-8");
	res.json(result);
})

app.get('/jsonpLogin',(req,res)=>{
	const result = {status:1,message:"登录成功jsonp"}
	const callbackFunc = req.query.callback; //_jsonpnrgrlyu28r
	if (req.query.username=='laowang' && req.query.password=='xiaowang'){
		
	}else{
		result.status = 0;
		result.message = "用户名或密码失败"
	}
	const resultJSONStr = JSON.stringify(result);
	
	// _jsonpnrgrlyu28r('{status:1,message:'登录成功jsonp'}')
	res.end(`${callbackFunc}(${resultJSONStr})`); 
})

app.post('/postLogin',(req,res)=>{
	const result = {status:1,message:"登录成功"}
	if (req.body.username=='lisi' && req.body.password=='lisi'){
		
	}else{
		result.status = 0;
		result.message = "用户名或密码失败"
	}
	res.setHeader("Content-Type","text/json;charset=utf-8");
	res.json(result);
})

//4.启动
app.listen(3000);
