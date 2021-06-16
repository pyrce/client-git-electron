const {
  ipcRenderer,dialog
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

  ipcRenderer.on("get-all", (event, dossier) =>{  
    listeDir(dossier) 
  })
  ipcRenderer.on("content", (event, content,path) =>{document.getElementById("currentfile").value=path;  document.getElementById("content").innerHTML = content })

  document.getElementById("saveBtn").addEventListener("click",(event)=>{

  let newcontent=document.getElementById("content").value
  let file=document.getElementById("currentfile").value

if(newcontent.length!="")
  ipcRenderer.send("save-file",file,newcontent);
  else
  alert("aucun fichier")
})

document.getElementById("commitBtn").addEventListener("click",(event)=>{
  ipcRenderer.send("commit-event");
})

});

document.querySelector('#selectBtn').addEventListener('click', function (event) {
ipcRenderer.send("open-file");
});




function listeDir(element) {

let tree=generateTree(element)
document.getElementById("myUL").innerHTML=tree
var toggler = document.getElementsByClassName("caret");
for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    console.log("click")
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}
var toggler = document.getElementsByClassName("file");
for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {

ipcRenderer.send("getfile",this.dataset.path);
  });
}

}

function generateTree(item){  
  var html = ''
      if(item){
        if("children" in item) { 
          html += '<li><span class="caret">'+item.name+'</span>';
        }else
        html += '<li><span class="file" data-path='+item.path+'>'+item.name+'</span>';
          if("children" in item) { 
              html += '<ul class="nested">';
              if(item.children.length > 0){
                  item.children.map(child =>{
                      html += generateTree(child)
                  })                
              }
              html += '</ul>';
          }
          html += '</li>';
      }
 return html
}

