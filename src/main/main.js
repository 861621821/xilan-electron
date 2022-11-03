import {app, BrowserWindow, ipcMain, session, globalShortcut, Menu } from 'electron';
import {join} from 'path';
let mainWindow = null;
app.whenReady().then(() => {
  createWindow();
  registerShortcut();

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

// 隐藏菜单栏
// Menu.setApplicationMenu(null);

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
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

function registerShortcut(){
  // 关闭：mainWindow.close();
  // 最大化：mainWindow.maximize();
  // 还原
  globalShortcut.register('CommandOrControl+Space', () => {
    mainWindow.restore();
  })
  // 最小化
  globalShortcut.register('Esc', () => {
    mainWindow.minimize();
  })
}