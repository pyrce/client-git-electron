'use strict'

// Modules to control application life and create native browser window
const {app, BrowserWindow,ipcMain, dialog,ipcRenderer,shell} = require('electron');
const fs = require('fs');
const path = require('path')
const Window=require("./Window.js");
const dirTree = require("directory-tree");
function createWindow () {
  // Create the browser window.
  let mainWindow = new Window({
    file: "index.html"
  })    
  let myfiles=""; 
  let mypath="";

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')

  // Open the DevTools.
   mainWindow.webContents.openDevTools()
ipcMain.on("getfile",(event,dir)=>{

  let content=fs.readFileSync(dir,"utf-8")
//  console.log(content)
 // content=JSON.stringify(content, null, 4)
    mainWindow.webContents.send("content",content,dir);


})
console.log(__dirname);
ipcMain.on("open-file",()=>{
  dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'openDirectory']
  }).then(result => {
    mypath=result.filePaths[0]
   myfiles=loaddir(mypath);
   mainWindow.webContents.send("get-all",myfiles);

  }).catch(err => {
    console.log(err)
  })

})

let addTodoWin;
ipcMain.on("commit-event",()=>{
  if (!addTodoWin) {
    // create a new add todo window
    addTodoWin = new Window({
      file: 'commit_modal.html',
      width: 700,
      height: 400,
      // close with the main window
      parent: mainWindow
    })
  }
})

ipcMain.on("save-file",(event,file,content)=>{

  try {
     fs.writeFileSync(file,content)
     console.log("sauvegarde reussi")
  } catch (error) {
    console.log(err);
  }


})

}

function loaddir(mypath){

    let tree="";
if(mypath!=""){
   tree = dirTree(mypath,{exclude:/.git/,normalizePath :true});
}
//console.log(tree)
  return  tree; 
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
