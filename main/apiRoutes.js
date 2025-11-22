const { ipcMain } = require('electron');
const { readDB, writeDB, deleteById, searchItem } = require('./fileService');
const { verify } = require('./authService');

function registerApiRoutes() {
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

  ipcMain.handle('delete-item', async (event, id) => {
    return deleteById(id);
  });

  ipcMain.handle('search-item', async (event, key) => {
    return searchItem(key);
  });
}

module.exports = { registerApiRoutes };
