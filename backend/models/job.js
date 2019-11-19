const axios = require('axios');

async function all() {
    try {
       const jobs = await axios({
            url: 'https://myexactjobs-graphql-api.herokuapp.com/',
            method: 'post',
            data: {
              query: `
              query { 
                jobs {
                    id
                    title
                    location {
                        name
                    }
                    description
                }
            }
                `
            }
          })

          return {jobs};
    }
    catch(err) {
        return {jobs: []};
    }
}

module.exports = {all};