const {refresh, init}  = require("../models/post");
const {ipcMain} = require('electron');



function initialize(mainWindow) {
   const sync = initSync(mainWindow);
   ipcMain.on("slideshow-mounted",async (event, args)=>{
    const data = await init();
    mainWindow.webContents.send('posts-loaded', {data});
    setInterval(sync,3000);
   })
}

function initSync(mainWindow) {
    var running = false;
    return async () => {
        if(!running) {
            running = true;
            refresh().then(data=>{
                if(data.status && data.status !== "nochange" && data.status !== "running") {
                    mainWindow.webContents.send('posts-loaded', {data});
                }
                
                // else {
                //     mainWindow.webContents.send('debugger', {data});
                // }
                running = false;
            })
        }
    } 
}


module.exports = {initialize}