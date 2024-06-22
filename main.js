const {app,BrowserWindow, Tray, Menu} = require('electron');
const fs = require('fs');

app.on('ready', async () => {
    const win = new BrowserWindow({
        width: 500,
        height:500,
        title: "sa",
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        focusable:false

    })
    win.loadFile('./html/gif.html')
    win.on('close', () =>{
        app.quit();
    })

    let tray = new Tray('./resim/pngegg.png')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Settings', type: 'normal', click: () => {
            const settwin = new BrowserWindow({
                width: 500,
                height: 500,
                title: "Settings",
                webPreferences: {
                    nodeIntegration:true,
                    contextIsolation: false
                }
    
            })
            settwin.loadFile("./html/settings.html")
            
            settwin.on('ready-to-show',async () => {
                fs.readdir("./gif/", (err,files) => {
                    files.forEach((fn) => {
                        console.log(fn)
                    })
                    
                    settwin.webContents.send('gifs', {gifs:files, act: "konata-dance.gif"});})
            })

        }},
        { label: 'Close', type: 'normal', role:"quit"}
      ])
      tray.setToolTip('Desktop Gif App')
      tray.setContextMenu(contextMenu)

    
})