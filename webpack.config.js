// 入口文件是index.js
// entry 从哪个文件开始打包
// output 
const path = require('path');                   // node核心模块 __dirname webpack.config.js 所在目录的路径 
// HtmlWebpackPlugin 会在打包结束后自动生成一个html文件，并把打包生成的js自动引入到这个html文件中；
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 删除dist文件 
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
	mode: 'production',						// development 代码没被压缩 production被压缩
	devtool: 'cheap-module-eval-source-map', 	//  development						// 映射找源代码错误。
	// devtool: 'cheap-module-source-map',      // production
	// entry: './src/index.js',                 // 相对于 webpack.config.js 来说的文件
	devServer: {
		contentBase: './dist',  // 借助webpack起服务，服务的根目录是dist文件夹
		open: true, // 自动打开浏览器自动打开起动的服务
		hot: true,
		hotOnly: true // hmr出问题，webpack-dev-server会自动帮忙刷新页面。hotOnly true不用自动刷新
	}, 										    // 
	entry: {
		main: './src/index.js'
		// sub: './src/index.js'
	},
	output: {  // 这里顺序一定要对哦
		publicPath: '/',  		// cdn主地址 
		filename: '[name].js', // 这里的name指的是entry里面的key值，入口两个文件要输出两个文件
		path: path.resolve(__dirname,'dist')    // 绝对路径，打包的文件放入哪个路径下 bundle文件夹的绝对路径
	},											// 输出 在dist/key.js
	module: {
		rules: [{
			test:/\.(jpg|png|gif)$/,
			use: {
				// loader:'file-loader',
				// url-loader 将 图片转换成一个base64的图片打包到bundle.js中 图片小的时候可以用1-2 kb，图片很大要用file-loader将图片打包到dist文件夹里面
				loader:'url-loader', 			// url-loader可以实现file-loader所有功能
				options: {						// placeholder 占位符 file-loader 的占位符很多
					// 配置参数
					name:'[name]_[hash].[ext]', // 指定打包文件的名字。打包的图片名字就是原来图片的名字中间加hash值
					outputPath: 'images/',	    // 打包生成images文件夹中
					limit: 2048, 				// 大于2kb就会在dist中生成图片文件和file-loader一样不然就打包到bundule.js中
				}
			}
		},{
			test:/\.scss$/,
			use:[ 							// 执行顺序从下到上的执行顺序先执行最后一个
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2,  // import 其他scss 文件第3 位执行（也就是当前执行顺序）
						modules: false,    // true可写这种样式避免耦合 import style from './index.scss'; css模块话打包，开启css的模块话打包
					}
				},
				'sass-loader',
				'postcss-loader'
			]	
		},{
			test:/\.(eot|ttf|svg|woff)$/,
			use: {
				loader:'file-loader'
			}
		},{
			test:/\.css$/,
			use:[ 							   // 执行顺序从下到上的执行顺序先执行最后一个
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2,     // import 其他scss 文件第3 位执行（也就是当前执行顺序）
						modules: false,       // true可写这种样式避免耦合 import style from './index.scss'; css模块话打包，开启css的模块话打包
					}
				},
				'postcss-loader'
			]
											 // 要使用scss-loader 要安装npm install sass-loader node-sass --save-dev
		},{
			test: /\.js$/, 
			exclude: /node_modules/,             // 不处理第三方文件 排除在外
			loader: "babel-loader",              // webaoack 和babel打通
			options: { // 可以将options里面的内容放到.babelrc 
				presets: [["@babel/preset-env",{ // 将es6变成es5包含翻译规则，完成语法转换 BUT map方法等在低版本浏览器还是无法解析 缺失一些变量或者函数 需要用到@babel/polyfill
					useBuiltIns: 'usage',   	 // 用到哪些解析哪些es6的方法，减少打包之后文件过大
					targets: {
						chrome: "67" 			 // 运行在大于67的浏览器中
					}
				}],
				"@babel/preset-react"
				]				 
			},
			
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'           // 以src/index.html为模板生成打包文件的模板
		}),
		new CleanWebpackPlugin(), 				 // 打包之前使用cleanwebpackplugin 删除dist目录里的所有文件
		new webpack.HotModuleReplacementPlugin() // 样式做了修改但是没有刷新页面不会更改js渲染
	],
	optimization: { // mode: development 是默认没有tree shaking的 要用optimization配置
		usedExports: true,  // 哪些导入的模块被使用了在打包
	}											 
}