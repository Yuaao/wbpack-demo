const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const prodConfig = {
	mode: 'production',					
	devtool: 'cheap-module-source-map',// 线上没必要要dev-sever	
	plugins: [
		new MiniCssExtractPlugin()
	],
	module: {
		rules:[
			{
				test:/\.scss$/,
				use:[ 							
					MiniCssExtractPlugin.loader,
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
					MiniCssExtractPlugin.loader,							   
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
module.exports = merge(commonConfig, prodConfig);