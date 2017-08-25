# jquery.message.js
仿[elementUI 的message组件](http://element.eleme.io/#/zh-CN/component/message)的jquery插件。
## 快速开始
引入jquery,jquery.message.css和jquery.message.js
```html
<link rel="stylesheet" href="path/to/jquery.message.css">
<script src="path/to/jquery-3.1.1.js"></script>
<script src="path/to/jquery.message.js"></script>
```
```javascript
$.message('这是一个消息提示框')
```
## 可选参数
```javascript
 defaultOptions = {
    type: 'info', //可选info,success,warning,error,默认为info
    customClass: '',//自定义提示框的类
    duration: 3000, //默认显示时间为3000ms
    message: '',//提示框的内容
    showClose: false,//是否显示关闭按钮
    onClose: null,//提示框关闭时的回调，参数为被关闭的message实例
 }
 ```
## 高级用法
[参考教程](https://fchengjin.github.io/jquery.message.js/index.html)
## Demo
[在线地址](https://fchengjin.github.io/jquery.message.js/index.html)
```bash
git clone https://github.com/fchengjin/jquery.message.js
cd jquery.message.js
npm install
gulp default
```
## TODO
- 自定义message的位置