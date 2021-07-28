const {
    ipcRenderer, dialog
  } = require('electron');
  

  ipcRenderer.on("file-tocommit",(event,files)=>{
   console.log(files)
let filesToCommit=files.split("\n")

filesToCommit.forEach(file => {

  let tpm=file.split(" ");
 console.log(file)
  let action= tpm[1]=="M" ? "<span class='status'>M</span>" : "<span class='status'>U</span>"
          document.getElementById("unstaged").innerHTML+="<li>"+tpm[2]+action+"</li>";
      });

  })
