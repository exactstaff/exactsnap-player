const express = require('express');
const Image = require('../models/image');
const cors = require('../middleware/cors');
const fs = require('fs');
const Path = require('path');

const router = express.Router();

router.get('/:id', cors ,async (req, res)=>{
    let imageName = req.params.id;
    // console.log(imageName);
    let path = await Path.resolve(__dirname+ '/../', 'static/images', imageName);
    const src = fs.createReadStream(path);
    src.pipe(res);
});

module.exports = router;