import { ipcMain } from 'electron';
import { getScript } from './script'
import createMessageWindow from './createMessage'

// 获取脚本
ipcMain.on("getScript", async (event, data) => {
  const res = await getScript();
  event.sender.send('onDate', res)
});

// 打开提醒弹窗
ipcMain.on("openMsgBox", async (event, data) => {
  console.log('---:', data)
  createMessageWindow();
  // event.sender.send('openMsgBoxSuccess', res)
});