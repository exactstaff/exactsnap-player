const axios =  require('axios');
const express = require('express');
const NeDB = require('nedb');
// const PouchDB = require('pouchdb');
// const db = new PouchDB('kittens');

// console.log(axios);

// db.info().then(function (info) {
//    // console.log(info);
//  });

//  let doc = {
//     "_id": "mitten2s",
//     "name": "Mittens",
//     "age": 3
//  };

//  db.put(doc);

//  db.get('mittens').then((doc)=>{
//     console.log(doc);
//  });


const db = new NeDB({ filename: 'data.db' ,autoload: true});


let scott = {
   name: 'Scott',
   twitter: '@ScottWRobinson'
};


db.insert(scott, function(err, doc) {
   console.log('Inserted', doc.name, 'with ID', doc._id);
});


async function getPosts() {
   const posts = (await axios.get("https://stories.exactstaff.com/api/posts/active")).data["0"];
   const imageBase64 = (await axios.get(posts.imageUrl,{responseType: 'arrayBuffer'})).data;
   const buffer = Buffer.from(imageBase64,'binary').toString('base64');
   const image = {
      name: 'Scott',
      twitter: buffer
   };

   db.insert(image, function(err, doc) {
      console.log('Inserted', doc.name, 'with ID', doc._id);
   });

   // console.log(buffer);
}

getPosts();