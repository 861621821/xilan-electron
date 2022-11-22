import { app, BrowserWindow, screen, globalShortcut } from 'electron';
import { join } from 'path';
import { exec } from 'child_process';
import { ipcMain } from 'electron';
import fs from 'fs';
import http from 'http'

export const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { flag: 'r', encoding: 'utf-8' }, (err, data) => {
      if (err) { reject('文件读取出错'); }
      resolve(data);
    });
  })
}

export const writeFile = (path, str) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, str, (err) => {
      if (err) { reject('文件写入出错'); }
    });
  })
}

// 获取md文件
export const getMd = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./build/main/static/${fileName}.md`, { flag: 'r', encoding: 'utf-8' }, (err, data) => {
      if (err) { reject('文件读取出错'); }
      resolve(data);
    });
  })
}
export const createLogoWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workArea
  let win = new BrowserWindow({
    width: 100,
    height: 100,
    x: Math.floor(width - 108),
    y: Math.floor(height - 108),
    icon: join(__dirname, './static/logo.ico'),
    frame: false,
    transparent: true,
    resizable: false,
    movable: true,
    hasShadow: false,
    skipTaskbar: true, // 取消任务栏显示
    alwaysOnTop: true,
    webPreferences: {
      // preload: join(__dirname, 'preload.js'),
      nodeIntegration: true, // 渲染进程使用Node API
      contextIsolation: false,
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    win.loadURL(`http://localhost:${rendererPort}/#/logo`);
  }
  else {
    win.loadFile(join(app.getAppPath(), 'renderer', 'index.html/#/logo'));
  }
}

export const createPanelWindow = () => {
  console.log('---:', global.win)
  if (global.win) {
    global.win.show();
    return false
  }
  global.win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: join(__dirname, './static/logo.ico'),
    frame: false,
    // transparent: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: true, // 取消任务栏显示
    webPreferences: {
      // preload: join(__dirname, 'preload.js'),
      nodeIntegration: true, // 渲染进程使用Node API
      contextIsolation: false,
    }
  });

  global.win.on('blur', () => {
    console.log('---:', 999999)
    global.win.close();
    global.win = undefined;
  })

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    win.loadURL(`http://localhost:${rendererPort}`);
  }
  else {
    win.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}

// 注册快捷键
export const registerShortcut = () => {
  // 关闭：mainWindow.close();
  // 最大化：mainWindow.maximize();
  // 还原
  globalShortcut.register('CommandOrControl+Space', () => {
    !global.win && createPanelWindow();
    global.win.show();
  })
  // 最小化
  globalShortcut.register('Esc', () => {
    global.win && global.win.isFocused() && global.win.hide();
  })
}

export const createMessageWindow = (msg = {}, width = 450, height = 260) => {
  let win = new BrowserWindow({
    width,
    height,
    frame: false,
    transparent: true,
    resizable: false,
    skipTaskbar: true, // 取消任务栏显示
    webPreferences: {
      // preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    win.loadURL(`http://localhost:${rendererPort}/#/message`);
  }
  else {
    win.loadFile(join(app.getAppPath(), 'renderer', 'index.html/#/message'));
  }
  // 向渲染进程发送消息内容
  win.on('ready-to-show', () => {
    win.webContents.send('emitMsg', msg)
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