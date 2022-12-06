import { app, ipcMain, BrowserWindow } from 'electron';
import { readFile, writeFile, createPanelWindow } from './index'
import Store from './store';

const store = new Store();

ipcMain.on('setPos', async (event, [nx, ny]) => {
  const [x, y] = global.logoWin.getPosition();
  global.logoWin.setBounds({ x: x + nx, y: y + ny, width: 100, height: 100 });
});

ipcMain.on('openPanel', async (event, data) => {
  // const wins = BrowserWindow.getAllWindows();
  // console.log('---:', wins)
  createPanelWindow()
});

// 获取脚本
ipcMain.on('getScript', async (event, data) => {
  const scripts = store.get('script', []);
  console.log('---:', scripts)
  event.sender.send('emitScript', scripts);
});

ipcMain.on('readFile', async (event, fileName) => {
  const content = await readFile(fileName);
  event.sender.send('file', content);
});

// 保存文件
ipcMain.on('writeFile', async (event, { fileName, content }) => {
  console.log(fileName, content);
  writeFile(fileName, content)
});

// 打开提醒弹窗
ipcMain.on('openMsgBox', async (event, data) => {
  console.log('---:', data)
  global.createMessageWindow();
  // event.sender.send('openMsgBoxSuccess', res)
});

// 添加脚本
ipcMain.on('operateScript', async (event, { id, type, script }) => {
  const scripts = store.get('script', []);
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
    writeFile(script.fs.fileName, script.fs.content);
  } else if (type === 'delete') {
    newScripts = scripts.filter(e => e.id !== id)
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
  store.set('script', newScripts);
});

// 重启应用
ipcMain.on('relaunch', async () => {
  app.relaunch();
  app.exit();
});

