const message = {
  title: '消息title',
  content: '123456789',
  btn: [
    {
      text: '打开系统',
      handler: ''
    },
    {
      text: '稍后',
      handler: ''
    }
  ]
};

setTimeout(() => {
  global.createMessageWindow(message);
}, 5000)
