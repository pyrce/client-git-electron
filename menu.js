const { remote } = require('electron');

document.getElementById('closeApp').addEventListener('click', evt => {
    var actualWin = remote.getCurrentWindow();
    actualWin.close();
})