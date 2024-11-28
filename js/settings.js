const { ipcRenderer } = require("electron");

ipcRenderer.on('gifs',(err,data)=>{

    const slc = document.querySelector("#gifselect");
    slc.size = data.gifs.length;
    data.gifs.forEach(d => {
        let opt = document.createElement("option");
        if(data.act == d)
        {
            opt.selected = true;
        }
        opt.value = d;
        opt.innerHTML = d;
        slc.appendChild(opt);
        console.log(d)
    });
})

document.getElementById("selectbuton").addEventListener('click',()=>{
    ipcRenderer.send('selectgif', document.getElementById("gifselect").value)
})