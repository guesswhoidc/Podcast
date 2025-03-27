const axios = require('axios');

const UNPROCESSABLE_ENTITY = 422;

module.exports = function({models, app}) {
  const {Podcasts} = models;

  app.get('/podcasts', async (req, res) => {
    const podcasts = await Podcasts.findAll();
  });

  app.post('/podcasts', async (req, res) => {
    const {url} = req.body;
    let podcastResponse;
    try {
      podcastResponse = await axios.get(url);
    } catch (error) {
      console.error(`unable to index url ${url}`, error);
      res.statusCode(UNPROCESSABLE_ENTITY).json({
        error: { 
          message: "There was a error while fetching the podcast data",
        }
      });
      return;
    }

    console.log(podcastResponse);
  });
}
