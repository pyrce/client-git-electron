'use strict'

const { BrowserWindow,Menu ,ipcRenderer,ipcMain,dialog} = require('electron')
const path = require('path')

// default window settings
const defaultProps = {
  width: 1400,
  height: 900,
  show: false,
  
  // update for electron V5+
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
   // preload: path.join(__dirname, 'preload.js')
  }
}
const template = [
  {
    label: 'Fichier',
    submenu: [
      {
        label: 'Ouvrir',
        click () {   dialog.showOpenDialog(mainWindow, {
          properties: ['openFile', 'openDirectory']
        }).then(result => {
          console.log(result.canceled)
          console.log(result.filePaths)
        }).catch(err => {
          console.log(err)
        })  }
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