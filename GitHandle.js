const Window = require("./Window.js");
const GitUtils = require('./gitUtils.js');
const simpleGit = require('simple-git');
const { app, BrowserWindow, ipcMain, dialog, ipcRenderer, shell } = require('electron');
let addTodoWin;
var fileToCommit = "";
var fileToAdd = "";
const { exec } = require('child_process');
const e = require("express");
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

ipcMain.on("git-commit", async (event, directory, message) => {

    //  git.run_script(`cd ${directory} && git add . && git commit -m '${message}'`,"status",event)
    try {
        const git = await simpleGit(directory);
        await git.add('./*')
        await git.commit(message);

        event.sender.send("message", {
            status:"success",
            message: "Vous êtes prêt à push"
        })
    } catch (error) {
        console.log(error)
        event.sender.send("message", {
            status:"error",
            message: "Commit message vide"
        })
    }
})


ipcMain.on("git-init", async (event, directory, repoUrl) => {


    try {
        const git = await simpleGit(directory);

        await git.init();
        await git.addRemote("origin", repoUrl)

        event.sender.send("message", {
            status:"success",
            message: "Initialisation git reussi"
        })

    } catch (error) {
        console.log(error)
        event.sender.send("message", {
            status:"error",
            message: "Erreur initialisation git"
        })
    }
})

ipcMain.on("git-push", async (event, directory) => {

    try {
        const git = await simpleGit(directory);

        await git.push("origin");

        event.sender.send("message", {
            status:"success",
            message: "push reussi"
        })
    } catch (error) {
        console.log(error)
        event.sender.send("message", {
            status:"error",
            message: "Vous devez commit et pull d'abord"
        })
    }
})

ipcMain.on("git-pull", async (event, directory) => {


    try {
        const git = await simpleGit(directory);

        await git.pull();

        event.sender.send("message", {
            status:"success",
            message: "pull reussi"
        })
    } catch (error) {
        console.log(error)
        event.sender.send("message", {
            status:"error",
            message: "Vous devez commit d'abord"
        })
    }
})


ipcMain.on("git-listecommits", async (event, directory) => {


    try {
        await exec(`cd ${directory} & git rev-list --remotes`, (err, stdout, stderr) => {
            let dataArray = stdout.split('\n');
            let dataArrayFormated = [];
            dataArray.forEach(element => {
                if (element != "") {
                    dataArrayFormated.push(element)
                }
            })
            event.sender.send("liste-commits",
                dataArrayFormated
            )
        });
    } catch (error) {
        console.log(error)
        event.sender.send("message", {
            status:"error",
            message: "Une erreur est survenue"
        })
    }
})

ipcMain.on("git-diff", async (event,directory, commit, fichier) => {
    try {

        await exec(`cd ${directory} & git diff ${commit} ${fichier}`, (err, stdout, stderr) => {
            event.sender.send("file-diff",
                stdout,fichier
            )
        });
    } catch (error) {
        console.log(error)
        const err = new Error(error);
        err.httpStatusCode = 500;
        err.msg = "Aucun";
        event.sender.send("message", {
            status:"error",
            message: "Une erreur est survenue"
        })
    }
})
ipcMain.on("git-repoEdit", async (event,directory,newRepo) => {
    try {
  
        await exec(`cd ${directory} & git remote set-url origin ${newRepo}`, (err, stdout, stderr) => {
            event.sender.send("message", {
                status:"success",
                message: "Repo changé"
            })
        });
    } catch (error) {
        console.log(error)
        const err = new Error(error);
        err.httpStatusCode = 500;
        err.msg = "Aucun";
        event.sender.send("message", {
            status:"error",
            message: "Une erreur est survenue"
        })
    }
})