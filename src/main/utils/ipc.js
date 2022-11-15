import { ipcMain } from 'electron';
import { setScript, getScript } from './index'

// 获取脚本
ipcMain.on('getScript', async (event, data) => {
  const script = getScript('script');
  event.sender.send('emitScript', script);
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