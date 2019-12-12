// 快速搭建http服务器 使用express 和webpackDevMiddleware 手写sever
const express = require('express'); // npm install express webpack-dev-middleware -D
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware'); // 监听webapck打包代码发生的变化
const config = require('./webpack.config.js');
//  在node中直接使用webpack
const complier = webpack(config); // 编译器

const app = express();

app.use(webpackDevMiddleware(complier, {
	publicPath: config.output.publicPath
}))
app.listen(3002, ()=>{
	console.log('server is running')
})