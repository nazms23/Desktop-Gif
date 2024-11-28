const {app,BrowserWindow, Tray, Menu, ipcMain} = require('electron');
const fs = require('fs');

const set = require('./settings.json')

app.on('ready', async () => {
    const win = new BrowserWindow({
        width: set["w"],
        height:set["h"],
        title: "sa",
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        focusable:false,
        resizable:false,
        webPreferences: {
            nodeIntegration:true,
            contextIsolation: false
        }
    })
    win.loadFile('./html/gif.html')
    win.on('close', () =>{
        app.quit();
    })
    win.setIgnoreMouseEvents(!set["movcheck"]);
    win.on('ready-to-show', ()=>{
        win.setPosition(set["x"],set["y"])
        win.webContents.send('gif',set["gif"])
        
    })
    win.on('moved',()=>{
        set["x"] = win.getPosition()[0];
        set["y"] = win.getPosition()[1];
        fs.writeFileSync('./settings.json', JSON.stringify(set));

    })

    let movcheck = set["movcheck"];

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
        {label: 'Movable', type: 'checkbox', checked:movcheck ,click: ()=>{
            if(movcheck)
            {
                win.setIgnoreMouseEvents(true);
                movcheck = !movcheck;
                set["movcheck"] = movcheck;
                fs.writeFileSync('./settings.json', JSON.stringify(set));

            }
            else
            {
                win.setIgnoreMouseEvents(false);
                movcheck = !movcheck;
                set["movcheck"] = movcheck;
                fs.writeFileSync('./settings.json', JSON.stringify(set));
                
            }
        }},
        {label: 'Reset Position', type: 'normal' ,click: ()=>{
            win.setPosition(0,0)
        }},
        { label: 'Close', type: 'normal', role:"quit"}
      ])
      tray.setToolTip('Desktop Gif App')
      tray.setContextMenu(contextMenu)
      tray.addListener('click',()=>{
        win.show()
      })

    ipcMain.on('selectgif',(err,data)=>{
        win.webContents.send('gif',data)
        set["gif"] = data
        fs.writeFileSync('./settings.json', JSON.stringify(set));

    })

    
})