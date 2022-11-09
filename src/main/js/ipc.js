import { ipcMain } from 'electron';
import { getScript } from './script'

ipcMain.on("getScript", async (event, data) => {
  const res = await getScript();
  event.sender.send('onDate', res)
});