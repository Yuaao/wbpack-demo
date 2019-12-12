const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
module.exports = {
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
			test:/\.(jpg|png|gif)$/,
			use: {
				loader:'url-loader', 			
				options: {						
					name:'[name]_[hash].[ext]',
					outputPath: 'images/',	   
					limit: 2048
				}
			}
		},{
			test:/\.(eot|ttf|svg|woff)$/,
			use: {
				loader:'file-loader'
			}
		},{
			test: /\.js$/, 
			exclude: /node_modules/,             
			loader: "babel-loader",              
			options: {
				presets: [["@babel/preset-env",{ 
					useBuiltIns: 'usage',   	 
					targets: {
						chrome: "67" 
					}
				}],
				"@babel/preset-react"
				]				 
			},
			
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'           
		}),
		new CleanWebpackPlugin() 				 
	],
	output: {  
		publicPath: '/',  		
		filename: '[name].js',
		chunkFilename: '[name].chunk.js', // 非入口文件间接文件会在main.js中引入vendors~lodash.chunk.js，而不是hml中引入
		path: path.resolve(__dirname,'../dist')
	},
	optimization: {     // 优化
		splitChunks: {  // 1)代码分割
			// chunks: 'async', // 只对异步生效async 全部生效all与cacheGroups 一起配置 对同步代码分割initial
		 //    minSize: 30000,  // >30kb才进行代码分割
		 //    // maxSize: 50000, // 当lodash为1mb的时候会打两个包使得每个最大50000
		 //    minChunks: 1,
		 //    maxAsyncRequests: 6,// 同时加载的模块是6个 超过6个就不会做代码分割
		 //    maxInitialRequests: 4,// 入口文件最多分割4个
		 //    automaticNameDelimiter: '~', // 文件生成会有链接符~例如：vendors~lodash.js
		 //    automaticNameMaxLength: 30, //  
		 //    cacheGroups: {                  // 缓存组
		 //        vendors: {                  // 配合chunks：all一起用，将node_modules中的文件打包到vendor.js 中
		 //          test: /[\\/]node_modules[\\/]/,
		 //          priority: -10,            // 优先级值越大优先级越高 优先级判断是在vendors中还是在default中
		 //          filename: 'vendors.js'
		 //        },
		 //        default: {                  // 代码分割默认放置位置
		 //          priority: -20,
		 //          reuseExistingChunk: true, // 如果一个模块已经被打包了那么我就忽略这个模块直接复用之前被打包的内容
		 //          filename: 'common.js'
		 //        }
		 //    }
			chunks: 'all'

		}
	}							
		
}
