'use strict'

const { BrowserWindow,Menu ,ipcRenderer,ipcMain,dialog} = require('electron')
const path = require('path')

// default window settings
const defaultProps = {
  width: 1280,
  height: 700,
  frame: false,
  minWidth: 1080,
  minHeight: 630,
  webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
  }
}
const template = [
  {
    label: 'Fichier',
    submenu: [
      {
        label: 'quitter',
        click () {   application.quit(); }
      }
    ]
  }
]
class Window extends BrowserWindow {
  constructor ({ file, ...windowSettings }) {
    // calls new BrowserWindow with these props
    super({ ...defaultProps, ...windowSettings })

    // load the html and open devtools
    this.loadFile(file)
    // this.webContents.openDevTools()

    // gracefully show when ready to prevent flickering
    this.once('ready-to-show', () => {
          const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
      this.show()
    })
  }
}

module.exports = Window