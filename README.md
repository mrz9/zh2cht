# zh2cht
实现和中文简体、繁体和火星文互转

##安装
```javascript

npm install zh2cht

```

##使用方法

```javascript

var trans = require("zh2cht");

console.log("中文");
console.log(trans.toZh('简体到繁体'));
console.log(trans.toCht('简体到繁体'));
console.log(trans.toHx('简体到繁体'));
console.log("繁体")
console.log(trans.toZh('簡體到繁體'));
console.log(trans.toCht('簡體到繁體'));
console.log(trans.toHx('簡體到繁體'));
console.log("火星文")
console.log(trans.toZh('彅軆菿瀿軆'));
console.log(trans.toCht('彅軆菿瀿軆'));
console.log(trans.toHx('彅軆菿瀿軆'));

 
 
```