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
              html += '<li><i class="fas fa-folder"></i><span class="caret">'+item.name+'</span>';
            }else
            html += '<li><i class="fas fa-file-alt"></i><span class="file" data-path='+item.path+'>'+item.name+'</span>';
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