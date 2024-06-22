const {app,BrowserWindow, Tray, Menu} = require('electron');

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
        { label: 'Close', type: 'normal', role:"quit"},
        { label: 'Ayarlar', type: 'normal' },
      ])
      tray.setToolTip('Desktop Gif App')
      tray.setContextMenu(contextMenu)
})