const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
const { readDB, writeDB } = require('./fileService');
const { verify } = require('./authService');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  // // if (isDev) {
  // if (!app.isPackaged) {
  //   win.loadURL('http://localhost:5173');
  //   win.webContents.openDevTools();
  // } else {
  //   win.loadFile(path.join(__dirname, '..', 'renderer', 'dist', 'index.html'));
  // }

  if (!app.isPackaged) {
    // DEV
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    // PRODUCTION
    const indexHtml = path.join(__dirname, '..', 'renderer', 'dist', 'index.html');
    win.loadFile(indexHtml);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('read-data', async () => {
  return readDB();
});

ipcMain.handle('write-data', async (event, data) => {
  writeDB(data);
  return true;
});

ipcMain.handle('login', async (event, { username, password }) => {
  const user = verify(username, password);
  return true;
});
