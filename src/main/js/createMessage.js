import { app, BrowserWindow } from 'electron';
import { join } from 'path';

function createMessageWindow(width = 450, height = 260) {
  console.log('---:', 'open message')
  let mainWindow = new BrowserWindow({
    width,
    height,
    frame: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}/#/message`);
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html/#/message'));
  }
}

global.createMessageWindow = createMessageWindow;
export default createMessageWindow;