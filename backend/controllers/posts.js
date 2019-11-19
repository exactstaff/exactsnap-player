const {refresh}  = require("../models/post");

function initialize(mainWindow) {
    initialResult = refresh();

    setTimeout(()=>{
        mainWindow.webContents.send('posts-loaded', initialResult);
    },3000)


        setInterval(()=>{
                // let postsDidChange = refresh();
                refresh().then(refreshStatus=>{
                    if(refreshStatus.status === "updated") {
                        mainWindow.webContents.send('posts-changed', "updated");
                    }else {
                        mainWindow.webContents.send('nothing-changed', "nochange");
                    }
                })

        },13000);
  
}

module.exports = {initialize}