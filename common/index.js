const {app, protocol, BrowserWindow} = require('electron');
const path = require('path');
const minimist = require('minimist');

const params = minimist(process.argv, {
  default: {
    asar: 'about',
  },
  string: [
    'asar',
  ],
});

require('electron-debug')();

const asarFile = `${params.asar}.asar`;

let mainWindow = null;

const protocolPrefix = 'file://';

app.on('window-all-closed', () => app.quit());

app.on('ready', () => {
  mainWindow = new BrowserWindow();

  protocol.interceptFileProtocol('file', (request, callback) => {
    const url = request.url.substr(protocolPrefix.length);
    const origin = path.join(__dirname, '../..', asarFile);
    const pathname = url.endsWith('/')
      ? 'index.html' : url.substr(11);
    const realUrl = path.normalize(path.join(origin, pathname));
    return callback({ path: realUrl });
  });

  mainWindow.loadURL('file://index.html');

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

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
