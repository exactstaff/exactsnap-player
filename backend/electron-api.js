// Main Process
const { Router } = require ('electron-routes');
const api = new Router('exactsnap');
const Post = require("./models/post");
const Weather = require('./models/weather');
const Job = require("./models/job");


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

    api.get('jobs',async (req,res)=>{
        let result =  await Job.all();
        res.json(result);
    });
}

module.exports = registerRoutes;