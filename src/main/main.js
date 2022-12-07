import { app, BrowserWindow, ipcMain } from 'electron';
import { ipcMain } from 'electron';
import { createLogoWindow, registerShortcut, readFile } from './utils/index';
import { getStore } from './utils/store';

const isDevelopment = process.env.NODE_ENV !== "production";

app.on("ready", async () => {
  if (!isDevelopment) launchAtStartup();
})

function launchAtStartup() {
  const appFolder = path.dirname(process.execPath);
  const updateExe = path.resolve(appFolder, "..", "Update.exe");
  const exeName = path.basename(process.execPath);
  if (process.platform === "darwin") {
    app.setLoginItemSettings({
      openAtLogin: true,
      openAsHidden: true
    });
  } else {
    app.setLoginItemSettings({
      openAtLogin: true,
      openAsHidden: true,
      path: updateExe,
      args: [
        "--processStart",
        `"${exeName}"`,
        "--process-start-args",
        `"--hidden"`
      ]
    });
  }
}

app.whenReady().then(async () => {
  // 注册通讯
  import('./utils/ipc');
  // 创建窗口
  createLogoWindow();
  // 注册快捷键
  registerShortcut();

  // 读取并执行脚本
  const scripts = await getStore('script', []);
  scripts.map(async e => {
    if (e.status === 1) {
      const fileName = e.fileName;
      const res = await readFile('script/' + fileName);
      eval(res);
    }
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