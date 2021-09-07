
const Swal = require('sweetalert2')

var commitBtn = document.getElementById("commitBtn");
var initBtn = document.getElementById("initGit");

var modal = document.getElementById("myModal");
var gitModal = document.getElementById("gitmodal");
var currentModal = "";
var span = document.getElementsByClassName("close");


//commit
commitBtn.addEventListener("click", (event) => {
  console.log("modal clic")
  currentModal = "myModal";
  modal.style.display = "block";

})
initBtn.addEventListener("click", (event) => {
  currentModal = "gitmodal";
  gitModal.style.display = "block";

})

span[0].onclick = function () {
  modal.style.display = "none";
}
span[1].onclick = function () {
  gitModal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
window.onclick = function (event) {
  if (event.target == gitModal) {
    gitModal.style.display = "none";
  }
}


ipcRenderer.on("message", (evt, message) => {

  if (currentModal == "gitmodal") {

    gitModal.style.display = "none";
  } else {

    modal.style.display = "none";
  }
  Swal.fire({
    icon: message.status,
    title: message.message,
    showConfirmButton: false,
    timer: 1500
  })
  //alert(message.message)
})


ipcRenderer.on("file-diff", (evt, dif, file) => {


  document.getElementById("filediff").style.visibility = "visible";
  document.getElementById("filediff").style.width = "47%";
  document.getElementById("filetext").style.width = "47%";
  document.getElementById("filediff").innerHTML = dif

})

ipcRenderer.on("liste-commits", (evt, commits) => {

  ipcRenderer.send("git-diff",document.getElementById("currentfolder").value, document.getElementById("commits").value, document.getElementById("currentfile").value);
  document.getElementById("commits").style.visibility = "visible";
  commits.forEach(com => {
    document.getElementById("commits").innerHTML += "<option>" + com + "</option>"
  })

})


document.getElementById("commits").addEventListener("change", () => {

  ipcRenderer.send("git-diff", document.getElementById("currentfolder").value, document.getElementById("commits").value, document.getElementById("currentfile").value);
})


document.getElementById("pushBtn").addEventListener("click", async (event) => {

  ipcRenderer.send("git-push", document.getElementById("currentfolder").value);

})


document.getElementById("pullBtn").addEventListener("click", (event) => {
  ipcRenderer.send("git-pull", document.getElementById("currentfolder").value);
})

document.getElementById("compareBtn").addEventListener("click", (event) => {
  ipcRenderer.send("git-listecommits", document.getElementById("currentfolder").value);
})

document.getElementById("changeRepo").addEventListener("click", async (event) => {
  const { value: name } = await
    Swal.fire({
      title: 'Change repo',
      input: 'text',
      inputPlaceholder: 'Enter here'
    })

  if (name) {
    ipcRenderer.send("git-repoEdit", name);
  }
})


function commit() {
  ipcRenderer.send("git-commit", document.getElementById("currentfolder").value, document.getElementById("message").value);
}

function gitInit() {
  ipcRenderer.send("git-init", document.getElementById("currentfolder").value, document.getElementById("repo_url").value);

}