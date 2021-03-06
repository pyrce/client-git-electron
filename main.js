'use strict'

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, ipcRenderer, shell } = require('electron');

const Window = require("./Window.js");

var express = require('express');
require("./filesHandle")
require("./GitHandle")
const { getUnpackedSettings } = require('http2');

function createWindow() {
  // Create the browser window.
  let mainWindow = new Window({
    file: "index.html"
  })


  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

}


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
