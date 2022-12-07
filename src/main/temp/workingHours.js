const message = {
  title: '消息title',
  key: 'test',
  content: '123456789',
  btn: [
    {
      text: '打开系统',
      type: 'openExternal',
      link: 'https://www.baidu.com'
    },
    {
      text: '稍后',
      type: 'close'
    }
  ]
};

setTimeout(() => {
  global.createMessageWindow(message);
}, 5000)
