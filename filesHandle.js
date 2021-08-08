const { app, BrowserWindow, ipcMain, dialog, ipcRenderer, shell } = require('electron');
const dirTree = require("directory-tree");

const fs = require('fs');
const path = require('path')


ipcMain.on("open-file", (event, args) => {

    dialog.showOpenDialog(null, {
        properties: ['openFile', 'openDirectory']
    }).then(result => {
       let mypath = result.filePaths[0]
        let myfiles = loaddir(mypath);
        let isGit=fs.existsSync(mypath+"/.git");
        event.sender.send("get-all", myfiles, mypath,isGit);

    }).catch(err => {
        console.log(err)
    })

})
ipcMain.on("getfile", (event, dir) => {

    let content = fs.readFileSync(dir, "utf-8")

    let ext = dir.substr(dir.lastIndexOf(".") + 1)
    //  console.log(content)
    // content=JSON.stringify(content, null, 4)
    event.sender.send("content", content, dir, ext);


})

ipcMain.on("save-file", (event, file, content) => {

    try {
        fs.writeFileSync(file, content)
        console.log("sauvegarde reussi")
    } catch (error) {
        console.log(error);
    }



})

function loaddir(mypath) {

    let tree = "";
    if (mypath != "") {
        tree = dirTree(mypath, { exclude: /.git/, normalizePath: true });
    }
    //console.log(tree)
    return tree;
}