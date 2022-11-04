import { app, BrowserWindow } from 'electron';
import { join } from 'path';

function createMessageWindow (width = 400, height = 200) {
  let mainWindow = new BrowserWindow({
    width,
    height,
    // frame: false,
    resizable: false,
    hasShadow: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // if (process.env.NODE_ENV === 'development') {
  //   const rendererPort = process.argv[2];
  //   mainWindow.loadURL(`http://localhost:${rendererPort}`);
  // }
  // else {
  //   mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  // }
  mainWindow.loadFile(join(app.getAppPath(), 'renderer/assets', 'message.html'));
}

export default createMessageWindow;