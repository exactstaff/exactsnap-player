const axios = require("axios");

async function all() {
  const result = await axios({
    url: "https://jobboard-be-gql.now.sh/graphql",
    method: "post",
    data: {
      query: `
              query { 
                jobs(take: 100) {
                    id
                    title
                    location {
                        name
                    }
                    description
                }
            }
                `,
    },
  });

  return result.data;
}

module.exports = { all };
