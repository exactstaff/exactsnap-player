const {refresh}  = require("../models/post");
const {ipcMain} = require('electron');

const refreshPosts = refresh();

function initialize(mainWindow) {
        ipcMain.on("slideshow-mounted",(event, args)=>{
            refreshPosts()
            .then(data => {
                mainWindow.webContents.send('posts-loaded', {data});
            })
            .finally(()=>{
                setInterval(()=>{
                    refreshPosts().then(data => {
                        if(data.status && data.status !== "nochange" && data.status !== "running") {
                            mainWindow.webContents.send('posts-loaded', {data});
                        }
                    });
                },3000);
            })
        });
}

module.exports = {initialize}