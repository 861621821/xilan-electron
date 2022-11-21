import { app, BrowserWindow, ipcMain } from 'electron';
import { ipcMain } from 'electron';
import Store from 'electron-store';
import { createLogoWindow, createPanelWindow, registerShortcut } from './utils/index'

const store = new Store();

// 开机启动
// const ex = process.execPath
// app.setLoginItemSettings({
//   openAtLogin: true,
//   path: ex,
//   args: []
// })

// let mainWindow = null;
app.whenReady().then(() => {
  // 注册通讯
  import('./utils/ipc');
  // import('./js/executeScript');
  // 创建窗口
  createLogoWindow();
  // 注册快捷键
  registerShortcut();

  // 读取并执行脚本
  const scripts = store.get('script', []);
  scripts.map(e => {
    e.status === 1 && eval(e.content)
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      // createWindow();
    }
  });
});

// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// });

// // 最小化
// ipcMain.on("minimize", async (event, data) => {
//   mainWindow.minimize();
// });

// // 隐藏
// ipcMain.on("hide", async (event, data) => {
//   mainWindow.hide();
// });