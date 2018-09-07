'use strict'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import promiseIpc from 'electron-promise-ipc';

import installExtension, { REACT_DEVELOPER_TOOLS , REDUX_DEVTOOLS} from 'electron-devtools-installer';

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: {webSecurity: false},
    title: "TSChecker 1.0.0",
    width:650,
    height:500,
  });

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()

  if (isDevelopment) {
    installExtension(REACT_DEVELOPER_TOOLS).then((name) => console.log(`Added Extension:  ${name}`)).catch((err) => console.log('An error occurred: ', err));
    installExtension(REDUX_DEVTOOLS).then((name) => console.log(`Added Extension:  ${name}`)).catch((err) => console.log('An error occurred: ', err));

  }
})


/*  TODO: use promiseIpc.on
ipcMain.on('rr', (event, payload) => {
  switch(payload.action) {
      case "quit": 
          app.quit(); 
      break;
      case "togglefs": 
          if (mainWindow) {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
          }
      break;
      case "setfs":
        if (mainWindow) {
          mainWindow.setFullScreen(true);
        }
      break;
      case "clearfs":
        if (mainWindow) {
          mainWindow.setFullScreen(false);
        }
      break;
      case "devtools": 
          if (mainWindow) {
              mainWindow.webContents.openDevTools()
          }
      break;
  }
});

*/

