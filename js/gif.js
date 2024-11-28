const {ipcRenderer} = require('electron');


ipcRenderer.on('gif',(err,data)=>{
    document.getElementById("imgg").src = `../gif/${data}`;
})