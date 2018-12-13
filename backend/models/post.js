const axios = require('axios');
const Datastore = require('nedb-promise');
const getColors = require('get-image-colors');
const db = Datastore({ filename: 'data/db/posts.ndb', autoload: true });
const Path = require('path');
const fs = require('fs');


async function refresh() {
    let result = null;
    let status = false;
    let downloadedPosts = [];
    let deletedPosts = [];
    try{
        let fetchedPosts = (await axios.get("https://stories.exactstaff.com/api/posts/active")).data;

        fetchedPosts = fetchedPosts.map((single_post) =>  single_post);

        const localPosts = await db.find({});

        let fetchedPostsId = fetchedPosts.map(a => a.post_id);
        let localPostsId = localPosts.map(a => a.post_id);

        // result =  await downloadPosts(fetchedPosts);

        if(!localPostsId){
           result =  await downloadPosts(fetchedPosts);
            status = true;
        }else {
            let postsToDownload = fetchedPosts.filter((remote_post)=>{
                return !localPostsId.includes(remote_post.post_id);
            });

            let postsToRemove = localPosts.filter((local_post)=>{
                return !fetchedPostsId.includes(local_post.post_id);
            });

            downloadedPosts = await downloadPosts(postsToDownload);
            deletedPosts = await deletePosts(postsToRemove);
            // deletedPosts  = localPosts;
            status = (deletedPosts.length >0 || downloadedPosts.length > 0 );
        }
        return {status: status, posts: [downloadedPosts, deletedPosts]};
    }

    catch(err){
        return {status: false, error: err.message};
    }

}

async function downloadPosts(newPosts) {
    let posts = [];
    try {
    for(index in newPosts)
    {
        let fetchedPost = newPosts[index];
        let imageName = await downloadImage(fetchedPost.imageUrl);
        let localImageURL = "exactsnap://image/"+imageName;
        // let imageName = "Testing.jpg";

        let customizedPost = {
            ...fetchedPost,

            // fetchedColors: fetchedColors,
            // imageBase64: buffer
        };

        customizedPost.imageName =  imageName;
        customizedPost.localImageURL = localImageURL;

        // const imageStream = (await axios.get(customizedPost.imageUrl,{responseType: 'stream'})).data;
        let fetchedColors = (await getColors(Path.resolve('data/images', imageName)));

        fetchedColors = fetchedColors.map(color => color.alpha(0.8).rgba());

        customizedPost.fetchedColors = fetchedColors;

        posts.push(customizedPost);
        // db.post(customizedPost);
    }
        let result = await db.insert(posts);
        // return fetchedPosts;

        return posts
    }
    catch(err){
        return err
    }
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
    return postsToDelete;
    }
    catch(ex) {
        return ex;
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
        resolve(imageName)
      })

      response.data.on('error', () => {
        reject()
      })
    })

}

module.exports.refresh = refresh;
module.exports.all = all;