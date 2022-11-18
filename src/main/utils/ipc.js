import { app, ipcMain } from 'electron';
import { getMd, setScript, getScript, writeFile } from './index'

// 获取脚本
ipcMain.on('getScript', async (event, data) => {
  const script = getScript('script');
  event.sender.send('emitScript', script);
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
ipcMain.on('addScript', async (event, data) => {
  setScript(JSON.parse(data));
  const script = getScript('script');
  event.sender.send('emitScript', script);
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