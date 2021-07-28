const Window = require("./Window.js");
const GitUtils = require('./gitUtils.js');
const simpleGit            = require('simple-git');
const { app, BrowserWindow, ipcMain, dialog, ipcRenderer, shell } = require('electron');
let addTodoWin;
var fileToCommit = "";
var fileToAdd = "";

let git = new GitUtils

ipcMain.on("commit-event", async (err, directory) => {

    if (!addTodoWin) {

        // create a new add todo window
        addTodoWin = new Window({
            file: 'commit_modal.html',
            width: 1080,
            height: 630,
            // close with the main window
            // parent: mainWindow
        })
        addTodoWin.webContents.openDevTools()

     

    }
})

ipcMain.on("git-commit", async (event,directory,message)=>{

//  git.run_script(`cd ${directory} && git add . && git commit -m '${message}'`,"status",event)
try {
    const git    = await simpleGit(directory);
    await git.add('./*')
    await git.commit(message);
    
    event.sender.send("success",{
        message: "Vous êtes prêt à push"
    })
} catch (error) {
  console.log(error)
    event.sender.send("erreurs",{
        message: "Commit message vide"
    })
}
})
