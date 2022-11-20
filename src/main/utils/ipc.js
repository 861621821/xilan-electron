import { app, ipcMain } from 'electron';
import { getMd, writeFile } from './index'
import Store from 'electron-store';

const store = new Store();

// 获取脚本
ipcMain.on('getScript', async (event, data) => {
  const scripts = store.get('script', []);
  event.sender.send('emitScript', scripts);
});

ipcMain.on('getMd', async (event, fileName) => {
  const str = await getMd(fileName);
  event.sender.send('emitMd', str);
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
    newScripts = [...scripts, { ...script, id: Date.now(), status: 0 }];
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

// 保存笔记
ipcMain.on('saveNote', async (event, str) => {
  writeFile('./build/main/static/note.md', str)
});