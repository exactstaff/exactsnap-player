const axios = require('axios');
const getColors = require('get-image-colors');
const Datastore = require('nedb-promise');
// const PouchDB = require('pouchdb');
const fs = require('fs');
const Path = require('path');


const db = Datastore({ filename: 'data/posts', autoload: true });
// const db = new PouchDB('./data/posts');



 async function refreshPosts(){

    try{
    let posts = [];
    const fetchedPosts = (await axios.get("https://stories.exactstaff.com/api/posts/active")).data;


    for(index in fetchedPosts)
    {
        let fetchedPost = fetchedPosts[index];
        let imageName = await downloadImage(fetchedPost.imageUrl);


        let customizedPost = {
            ...fetchedPost,

            // fetchedColors: fetchedColors,
            // imageBase64: buffer
        };

        customizedPost.imageUrl =  "http://192.168.66.145:3001/api/images/"+imageName;

        // const imageStream = (await axios.get(customizedPost.imageUrl,{responseType: 'stream'})).data;
        let fetchedColors = (await getColors(Path.resolve(__dirname+ '/../', 'static/images', imageName)));

        fetchedColors = fetchedColors.map(color => color.alpha(0.8).rgba());

        customizedPost.fetchedColors = fetchedColors;

        posts.push(customizedPost);
        // db.post(customizedPost);
    }
    let result = await db.insert(posts);
    return result;
    }
    catch(err){
        console.log(err.message)
    }


}

async function all(){
    try {
        // let doc = await db.allDocs({include_docs: true});
        let result = await db.find({});

        return result;
    } catch (err) {
        console.log(err);
    }
}


function randonImageName() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+".jpg";
}

async function downloadImage (url) {
    let imageName = randonImageName();

    const path = await Path.resolve(__dirname+ '/../', 'static/images', imageName);

    // axios image download with response type "stream"
    const response = await axios.get(url,{responseType: 'stream'});
    // const path = __dirname + "/images/" + randonImageName();
    // var fd = fs.openSync(path, 'w');
    // pipe the result stream into a file on disc
    response.data.pipe(fs.createWriteStream(path))

    // return a promise and resolve when download finishes
    return new Promise((resolve, reject) => {
      response.data.on('end', () => {
        resolve(imageName)
      })

      response.data.on('error', () => {
        reject()
      })
    })

}

module.exports.refreshPosts = refreshPosts;
module.exports.all = all;