// import "@babel/polyfill";  vue 和react自带babel/polyfill
// npm install --save-dev @babel/preset-react
/**
#### react start ####
**/
// import React, { Component } from 'react';
// import ReactDom from 'react-dom';
// class App extends Component {
// 	render() {
// 		return <div>Hello World</div>
// 	}
// } 
// ReactDom.render(<App />, document.getElementById('root'));
/**
#### react end ####
**/

// ###Tree Shaking start###
// import { add } from './math';
// add(1, 2) // 这时没有用到的minus也被打包到了 所以这时候就会用到tree shaking 剔除掉不引用的东西
// tree shaking只支持es module （import）方式
// ###Tree Shaking end###

// ### 代码分割开始 ###
// import _ from 'lodash'; // lodash 和我的业务代码 都打包到了mian.js 中
// import _ from 'lodash'; 
// console.log(_.join(['a','b','c'],'****')); 同步

// function getComponent() {
// 	// 异步加载
// 	return import(/*webpackChunkName:"lodash"*/ 'lodash').then(({default: _}) => {
// 		var element = document.createElement('div');
// 		element.innerHTML = _.join(['Hello', 'World'], '-');
// 		return element;
// 	})
// }
// getComponent().then(element => {
// 	document.body.appendChild(element)
// })
// ### 代码分割结束 ###


// ### 懒加载start ###

// function getComponent() {
// 	// 异步加载
// 	return import(/*webpackChunkName:"lodash"*/ 'lodash').then(({default: _}) => {
// 		var element = document.createElement('div');
// 		element.innerHTML = _.join(['Hello', 'World'], '-');
// 		return element;
// 	})
// }
// 使用es7异步函数
// async function getComponent() {
// 	const {default:_} = await import(/*webpackChunkName:"lodash"*/ 'lodash')
// 	const element = document.createElement('div');
// 	element.innerHTML = _.join(['Hello', 'World'], '-');
// 	return element;
// }
// // 点击的时候才会被加载lodash
// document.addEventListener('click',()=>{
// 	getComponent().then(element => {
// 		document.body.appendChild(element)
// 	})
// })

// ### 懒加载end ###
import './style.css';
console.log('Hello World')