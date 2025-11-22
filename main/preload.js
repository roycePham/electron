const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  readData: () => ipcRenderer.invoke('read-data'),
  writeData: (data) => ipcRenderer.invoke('write-data', data),
  login: (username, passwordHash) => ipcRenderer.invoke('login', { username, passwordHash }),
});
