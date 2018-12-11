// Main Process
const { Router } = require ('electron-routes');
const axios = require('axios');
const api = new Router('exactsnap');
const Post = require("./models/post");

function registerRoutes() {
    api.get('refresh', async (req, res) => {
        let result = await Post.refresh();
        res.json(result);
    });

    api.get('all',async (req,res)=>{
        let result =  await Post.all();
        res.json(result);
    });

    api.get('image/:name', async (req,res)=>{
        let name = request.params.name;
        let imageAsBase64 = "data:image/jpeg;base64, " + fs.readFileSync('data/images/'+name, 'base64');
        res.json({image: imageAsBase64});
    });
}



module.exports = registerRoutes;