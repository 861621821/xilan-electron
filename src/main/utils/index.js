import { app, BrowserWindow, screen, globalShortcut } from 'electron';
import { join } from 'path';
import { exec } from 'child_process';
import { ipcMain } from 'electron';
import fs from 'fs';

export const writeFile = (fileName, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`./build/main/static/${fileName}`, content, (err) => {
      if (err) reject('文件写入出错')
      else resolve(true)
    });
  })
}

// 获取文件
export const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./build/main/static/${fileName}`, { flag: 'r', encoding: 'utf-8' }, (err, data) => {
      if (err) {
        resolve('');
        fs.writeFile(`./build/main/static/${fileName}`, '', (err) => { })
      }
      else resolve(data);
    });
  })
}
export const createLogoWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workArea
  global.logoWin = new BrowserWindow({
    // width: 100,
    // height: 100,
    // x: Math.floor(width - 108),
    // y: Math.floor(height - 108),
    icon: join(__dirname, './static/logo.ico'),
    frame: false,
    // transparent: true,
    resizable: false,
    movable: true,
    hasShadow: false,
    // skipTaskbar: true, // 取消任务栏显示
    // alwaysOnTop: true,
    webPreferences: {
      // webSecurity: false,
      // preload: join(__dirname, '../preload.js'),
      nodeIntegration: true, // 渲染进程使用Node API
      contextIsolation: false
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    global.logoWin.loadURL(`http://localhost:${rendererPort}/#/logo`);
  }
  else {
    // global.logoWin.loadFile(join(app.getAppPath(), 'renderer', 'index.html/#/logo'));
    global.logoWin.loadURL(
      url.format({
        pathname: join(app.getAppPath(), 'renderer', 'index.html/#/logo'),
        protocol: "file:",
        slashes: true
      })
    )
  }
}

export const createPanelWindow = () => {
  if (global.window) {
    global.window.show();
    return false
  }
  global.window = new BrowserWindow({
    width: 800,
    height: 495,
    icon: join(__dirname, './static/logo.ico'),
    frame: false,
    // transparent: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: true, // 取消任务栏显示
    webPreferences: {
      webSecurity: false,
      // preload: join(__dirname, '../preload.js'),
      nodeIntegration: true, // 渲染进程使用Node API
      contextIsolation: false
    }
  });

  // 失去焦点 关闭窗口
  global.window.on('blur', () => {
    global.window.close();
    global.window = null;
  })

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    global.window.loadURL(`http://localhost:${rendererPort}`);
  }
  else {
    global.window.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}

// 注册快捷键
export const registerShortcut = () => {
  // 关闭：mainWindow.close();
  // 最大化：mainWindow.maximize();
  // 还原
  globalShortcut.register('CommandOrControl+Space', () => {
    !global.window && createPanelWindow();
    global.window.show();
  })
  // 最小化
  globalShortcut.register('Esc', () => {
    global.window && global.window.isFocused() && global.window.hide();
  })
}

export const createMessageWindow = (msg = {}, width = 450, height = 260) => {
  global.messageWindow = new BrowserWindow({
    width,
    height,
    frame: false,
    transparent: true,
    resizable: false,
    skipTaskbar: true, // 取消任务栏显示
    alwaysOnTop: true,
    webPreferences: {
      webSecurity: false,
      // preload: join(__dirname, '../preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    global.messageWindow.loadURL(`http://localhost:${rendererPort}/#/message`);
  }
  else {
    global.messageWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html/#/message'));
  }
  // 向渲染进程发送消息内容
  global.messageWindow.on('ready-to-show', () => {
    global.messageWindow.webContents.send('emitMsg', msg)
  })
}

// 打开应用
export const openApp = (path) => {
  let process = exec(path);
  process.error.on('data', data => {
    console.log(data)
  })
  process.stdout.on('data', data => {
    console.log(data)
  })
  process.stderr.on('data', data => {
    console.log(data)
  })
}

// 方法注册到全局
global.createMessageWindow = createMessageWindow;