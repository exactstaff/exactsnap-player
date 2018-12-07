const express = require('express');
const Post = require('../models/post');
const cors = require('../middleware/cors');


const router = express.Router();

router.get('/refresh', async (req, res)=>{
    let posts = await Post.refreshPosts();
    res.send(posts);
});

router.get('/', cors,async (req, res)=>{
    let posts = await Post.all();
    res.send(posts);
});

module.exports = router;