const express = require('express');
const posts = require('../routes/posts');
const images = require('../routes/images');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/posts',posts);
    app.use('/api/images',images);
}