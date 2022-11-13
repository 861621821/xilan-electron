import { ipcMain } from 'electron';
import { getScript } from './index'

// 获取脚本
ipcMain.on('getScript', async (event, data) => {
  const res = await getScript();
  event.sender.send('emitScript', res)
});

// 打开提醒弹窗
ipcMain.on('openMsgBox', async (event, data) => {
  console.log('---:', data)
  global.createMessageWindow();
  // event.sender.send('openMsgBoxSuccess', res)
});