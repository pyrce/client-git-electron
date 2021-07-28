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



  ipcRenderer.on("get-all", (event, dossier,path) => {
 
    document.getElementById("currentfile").value = path; 
    listeDir(dossier)
  })

  ipcRenderer.on("content", (event, content, path,ext) => { 
  
  //  content="```"+ext+"\r"+content+"\n"+"```";
    document.getElementById("currentfile").value = path; 
    
   document.getElementById("content").innerHTML = content 
   // document.getElementById("content").create();
   Prism.highlightAll(document.querySelector("#content"));
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

