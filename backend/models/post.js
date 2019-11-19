const axios = require('axios');
const Datastore = require('nedb-promise');
const getColors = require('get-image-colors');
const db = Datastore({ filename: 'data/db/posts.ndb', autoload: true });
const imagesFolder = Datastore({ filename: 'data/images/na.ndb', autoload: true });
const Path = require('path');
const fs = require('fs');

async function refresh() {
    let result = null;
    let status = "";
    try{
        let fetchedPosts = (await axios.get("https://stories.exactstaff.com/api/posts/active")).data;
        fetchedPosts = fetchedPosts.map((single_post) =>  single_post);

        const localPosts = await db.find({}); // fetches all local posts

        let fetchedPostsId = fetchedPosts.map(a => a.post_id);
        let localPostsId = localPosts.map(a => a.post_id);

        // result =  await downloadPosts(fetchedPosts);
        let postsToDownload = fetchedPosts.filter((remote_post)=> !localPostsId.includes(remote_post.post_id));
        let postsToRemove = localPosts.filter((local_post)=> !fetchedPostsId.includes(local_post.post_id));


        /////////////////////////////////////////////////

        if(postsToDownload.length > 0 || postsToDelete.length > 0){
            //Fetches and saves all posts if the local database is empty
            await Promise.all(savePosts(postsToDownload),deletePosts(postsToRemove));
            status = "updated";
        } else {
            status = "nochange";
        }

        const posts = await db.find({}); // fetches all local posts
        return {status, posts};
    }

    catch(err){
        return {status: false, error: err.message};
    }

}

async function savePosts(newPosts) {
    try {
        let posts = await Promise.all(newPosts.map((fetchedPost)=>processPost(fetchedPost)));
 
        console.log(posts);
       await db.insert(posts);
       return posts;
    }
    catch(err){
        return [];
    }
}

async function processPost(fetchedPost) {
    let localImagePath = await downloadImage(fetchedPost.imageUrl);
    let customizedPost = {
        ...fetchedPost,
        localImagePath,
        fetchedColors: [[0,0,0,0.5]]
    };
    return customizedPost;
}

async function deletePosts(postsToDelete){
    try {
        if(postsToDelete){
            postsToDelete.forEach( (post)=>{

                fs.unlink(Path.resolve('data/images', post.imageName),async function(err){
                    if(!err) {
                        let dbDelete =  await db.remove({_id: post._id});
                    }
                });

            });
        }
        return postsToDelete.length;
    }
    catch(ex) {
        return 0;
    }
}

async function all(){
    try {
        // let doc = await db.allDocs({include_docs: true});
        let result = await db.find({});

        return result;
    } catch (err) {
        return (err);
    }
}

function randonImageName() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+".jpg";
}

async function downloadImage (url) {
    let imageName = randonImageName();

    const path = await Path.resolve('data/images', imageName);

    // axios image download with response type "stream"
    const response = await axios.get(url,{responseType: 'stream'});
    // const path = __dirname + "/images/" + randonImageName();
    // var fd = fs.openSync(path, 'w');
    // pipe the result stream into a file on disc
    response.data.pipe(fs.createWriteStream(path))

    // return a promise and resolve when download finishes
    return new Promise((resolve, reject) => {
      response.data.on('end', () => {
        resolve(path)
      })

      response.data.on('error', () => {
        reject()
      })
    })

}

module.exports.refresh = refresh;
module.exports.all = all;