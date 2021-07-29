
  //commit
  document.getElementById("commitBtn").addEventListener("click", (event) => {
  


    document.getElementById("myModal").style.display = "block";
    // if(document.getElementById("currentfile").value!=""){
    // ipcRenderer.send("commit-event", document.getElementById("currentfile").value);
    // }else{
    //   alert("veuillez selectionner un dossier !")
    // }
  })
var modal=document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

ipcRenderer.on("success", (event,message) => {
    modal.style.display = "none";
    alert(message.message)
  })
  ipcRenderer.on("erreurs", (event,message) => {
   // modal.style.display = "none";
    alert(message.message)
  })
function commit(){
        ipcRenderer.send("git-commit",document.getElementById("currentfile").value,document.getElementById("message").value);
}

document.getElementById("pushBtn").addEventListener("click", (event) => {
  ipcRenderer.send("git-push",document.getElementById("currentfile").value);
})

document.getElementById("pullBtn").addEventListener("click", (event) => {
  ipcRenderer.send("git-pull",document.getElementById("currentfile").value);
})