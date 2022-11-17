``` js
// 主进程设置全局数据
global.shareObject = ''

// 渲染进程读写全局数据
const remote = require('electron').remote
// 1、获取
let res = remote.getGlobal('shareObject')
// 2、也可以改变这个数据
remote.getGlobal('shareObject') = '我是重新被定义后的共享数据'
```
<!-- 压缩 -->
`uglifyjs index.js -c -m -o index.min.js --toplevel`

#### 全局方法
+ 创建提醒：createMessageWindow

``` js
const store = new Store();
https://github.com/sindresorhus/electron-store
```