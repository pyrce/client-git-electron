const {
  ipcRenderer, dialog
} = require('electron');
var electron = require("electron");
const {
  errorMonitor
} = require('events');
const {
  readdir
} = require('fs');
//const $ = require("jquery")
window.$ = window.jQuery = require('jquery');

var electronFs = require('fs');
const { event } = require('jquery');
const internal = require('stream');

let path = ""

$(function () {



  ipcRenderer.on("get-all", (event, dossier, path, isGit) => {
    console.log(isGit);

    document.getElementById("currentfolder").value = path;
    listeDir(dossier)
    if (isGit === false) {
      document.getElementById("initGit").style.visibility = "visible"
    }
  })

  ipcRenderer.on("content", (event, content, path, ext) => {
    document.getElementById("file").innerHTML = path.substring(path.lastIndexOf("/") + 1)
    document.getElementById("filetext").style.visibility = "visible";
    //  content="```"+ext+"\r"+content+"\n"+"```";
    document.getElementById("currentfile").value = path;

    document.getElementById("filetext").innerHTML = content
    // document.getElementById("content").create();
    Prism.highlightAll(document.querySelector("#content"));

    if (document.getElementById("commits").value) {
      ipcRenderer.send("git-diff", document.getElementById("currentfolder").value, document.getElementById("commits").value, document.getElementById("currentfile").value);
    }

  })

  document.getElementById("saveBtn").addEventListener("click", (event) => {

    let newcontent = document.getElementById("content").value
    let file = document.getElementById("currentfile").value

    if (newcontent.length != "")
      ipcRenderer.send("save-file", file, newcontent);
    else
      alert("aucun fichier")
  })

});

document.querySelector('#selectBtn').addEventListener('click', function (event) {
  ipcRenderer.send("open-file");
});

