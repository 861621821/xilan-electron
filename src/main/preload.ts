import {contextBridge, shell} from 'electron';

contextBridge.exposeInMainWorld('electron', {
  shell,
})
