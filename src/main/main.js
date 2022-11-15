import { app, BrowserWindow, ipcMain, session, globalShortcut, Menu } from 'electron';
import { join } from 'path';
import { ipcMain } from 'electron';
import { getScript } from './utils/index';

let mainWindow = null;
app.whenReady().then(() => {
  // 注册通讯
  import('./utils/ipc');
  // import('./js/executeScript');
  // 创建窗口
  createWindow();
  // 注册快捷键
  registerShortcut();

  // 读取并执行脚本
  const script = getScript('script', [])
  script.map(e => {
    eval(e.content)
  })

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\'']
      }
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// });

// ipcMain.on('message', (event, message) => {
//   console.log(message);
// })

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    icon: join(__dirname, './static/logo.ico'),
    frame: false,
    resizable: false,
    hasShadow: false,
    webPreferences: {
      // preload: join(__dirname, 'preload.js'),
      nodeIntegration: true, // 渲染进程使用Node API
      contextIsolation: false,
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}

// 注册快捷键
function registerShortcut() {
  // 关闭：mainWindow.close();
  // 最大化：mainWindow.maximize();
  // 还原
  globalShortcut.register('CommandOrControl+Space', () => {
    mainWindow.show();
  })
  // 最小化
  globalShortcut.register('Esc', () => {
    mainWindow.isFocused() && mainWindow.hide();
  })
}

// 最小化
ipcMain.on("minimize", async (event, data) => {
  mainWindow.minimize();
});

// 隐藏
ipcMain.on("hide", async (event, data) => {
  mainWindow.hide();
});