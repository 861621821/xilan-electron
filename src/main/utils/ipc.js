import { app, ipcMain, shell, BrowserWindow } from 'electron';
import fs from 'fs';
import { readFile, writeFile, createPanelWindow } from './index'
import { getStore, setStore } from './store';

ipcMain.on('setPos', async (event, [nx, ny]) => {
  const [x, y] = global.logoWin.getPosition();
  global.logoWin.setBounds({ x: x + nx, y: y + ny, width: 100, height: 100 });
});

ipcMain.on('openPanel', async (event, data) => {
  // const wins = BrowserWindow.getAllWindows();
  // console.log('---:', wins)
  createPanelWindow()
});

ipcMain.on('readFile', async (event, fileName) => {
  const content = await readFile(fileName);
  event.sender.send('file', content);
});

// 保存文件
ipcMain.on('writeFile', async (event, { fileName, content }) => {
  writeFile(fileName, content)
});

// 打开提醒弹窗
ipcMain.on('openMsgBox', async (event, data) => {
  global.createMessageWindow();
  // event.sender.send('openMsgBoxSuccess', res)
});

// 获取脚本
ipcMain.on('getScript', async (event, data) => {
  const scripts = await getStore('script', []);
  event.sender.send('emitScript', scripts);
});

// 添加脚本
ipcMain.on('operateScript', async (event, { id, type, script }) => {
  const scripts = await getStore('script', []);
  let newScripts = [];
  if (type === 'add') {
    newScripts = [
      ...scripts,
      {
        title: script.title,
        fileName: script.fs.fileName,
        id: Date.now(),
        status: 0
      }
    ];
    await writeFile('script/' + script.fs.fileName, script.fs.content);
  }
  else if (type === 'delete') {
    const scripts = await getStore('script', []);
    const { fileName } = scripts.find(e => e.id === id);
    fs.unlinkSync(`./build/main/static/script/${fileName}`);
    newScripts = scripts.filter(e => e.id !== id);
  } else if (type === 'enable') {
    newScripts = scripts.map(e => {
      if (e.id === id) {
        return { ...e, status: 1 }
      }
      return e
    })
  } else if (type === 'stop') {
    newScripts = scripts.map(e => {
      if (e.id === id) {
        return { ...e, status: -1 }
      }
      return e
    })
  }
  await setStore('script', newScripts);
  event.sender.send('emitScript', newScripts);
});

// 消息按钮处理函数
ipcMain.on('msgBtnClick', async (event, data) => {
  const btn = JSON.parse(data)
  switch (btn.type) {
    case 'openExternal':
      shell.openExternal(btn.link);
      global.messageWindow.close();
      break;
    case 'close':
      global.messageWindow.close();
      break;
    default:
      break;
  }
})

// 重启应用
ipcMain.on('relaunch', async () => {
  app.relaunch();
  app.exit();
});

