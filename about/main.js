const {app, protocol, BrowserWindow} = require('electron');
const path = require('path');

require('electron-debug')();

// const asarFile = 'about.asar';

let mainWindow = null;


app.on('window-all-closed', () => app.quit());

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  
  const protocolPrefix = 'file://';
  protocol.interceptFileProtocol('file', (request, callback) => {
    const url = request.url.substr(protocolPrefix.length);
    if (url.endsWith('index.html')) {
      return callback({ path: url });
    }
    return callback({ path: path.join(__dirname, 'web', url) });
  });

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.webContents.on('did-fail-load', console.log);

  mainWindow.loadFile('../about.asar/web/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
