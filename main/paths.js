const path = require('path');
const { app } = require('electron');

function resourcesDataPath() {
  // if (process.env.NODE_ENV === 'development') {
  //   return path.join(__dirname, '..', 'data');
  // }
  if (!app.isPackaged) {
    return path.join(__dirname, '..', 'data');
  }
  return path.join(process.resourcesPath, 'data');
}

module.exports = { resourcesDataPath };
