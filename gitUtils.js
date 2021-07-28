const electron = require('electron');
const child_process = require('child_process');
const dialog = electron.dialog;

// This function will output the lines from the script 
// and will return the full combined output
// as well as exit code when it's done (using the callback).
var files="";
class GitUtils{
 run_script(command,msg,windows) {
    var child = child_process.spawn(command, {
        encoding: 'utf8',
        shell: true,
      //  stdio:[process.stdin, process.stdout, process.stderr]
    });
    // You can also use a variable to save the output for when the script closes later
    child.on('error', (error) => {
        dialog.showMessageBox({
            title: 'Title',
            type: 'warning',
            message: 'Error occured.\r\n' + error
        });
    });

    //child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        //Here is the output
          
        data=data.toString();
       // windows.webContents.send(msg, files);
     //  console.log(data);  
       windows.sender.send(msg,data);
        //  return data;

    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
        // Return some data to the renderer process with the mainprocess-response ID
       // windows.webContents.send('mainprocess-response', data);
        //Here is the output from the command
        console.log(data);  
    });
    child.on('close', function(code) {
        //Here you can get the exit code of the script
    
    });
    if (typeof callback === 'function')
        callback();
}

}
module.exports = GitUtils