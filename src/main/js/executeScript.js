import { getScript } from './script'
import './createMessage'

// 读取并执行脚本
getScript().then(res => {
  res.map(e => {
    eval(e.content)
  })
}).catch(err => {
  console.log(err)
})
