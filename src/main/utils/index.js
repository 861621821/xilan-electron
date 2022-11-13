import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { exec } from 'child_process';
import { ipcMain } from 'electron';
import fs from 'fs';

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

// 获取脚本
export const getScript = async () => {
  const res = await readFile('./build/main/static/script.json');
  return JSON.parse(res)
}

export const createMessageWindow = (msg = {}, width = 450, height = 260) => {
  let win = new BrowserWindow({
    width,
    height,
    frame: false,
    transparent: true,
    resizable: false,
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
// 注册到全局
global.createMessageWindow = createMessageWindow;

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