const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    width: 420,
    height: 330
  });

  mainWindow.loadURL(url.format({
    pathname: `${__dirname}/client/dist/index.html`,
    protocol: 'file',
    slashes: true,
  }));

  mainWindow.on('closed', () => {
    mainWindow = null
  });
});

