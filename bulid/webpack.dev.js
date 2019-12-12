
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const devConfig = {
	mode: 'development',					
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',  
		open: true, 			
		hot: true,
		hotOnly: true,
		// port: 8080
	}, 										   										
	plugins: [
		new webpack.HotModuleReplacementPlugin() 
	],
	optimization: { 
		usedExports: true
	},
	module: {
		rules:[
			{
				test:/\.scss$/,
				use:[ 							
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,  
							modules: false
						}
					},
					'sass-loader',
					'postcss-loader'
				]	
			},{
				test:/\.css$/,
				use:[ 	
					'style-loader',						   
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,     
							modules: false
						}
					},
					'postcss-loader'
				]
												
			},

		]
	}											 
}
module.exports = merge(commonConfig, devConfig);