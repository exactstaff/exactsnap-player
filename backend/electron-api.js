// Main Process
const { Router } = require ('electron-routes');
const axios = require('axios');
const api = new Router('exactsnap');
const Post = require("./models/post");
const Weather = require('./models/weather');

function registerRoutes() {
    api.get('refresh', async (req, res) => {
        let result = await Post.refresh();
        res.json(result);
    });

    api.get('all',async (req,res)=>{
        let result =  await Post.all();
        res.json(result);
    });

    api.get('weather',async (req,res)=>{
        let result =  await Weather.get();
        res.json(result);
    });
}

module.exports = registerRoutes;