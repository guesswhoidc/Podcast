const axios = require('axios');
const {XMLParser} = require('fast-xml-parser');

const UNPROCESSABLE_ENTITY = 422;

const parser = new XMLParser();

module.exports = function({models, app}) {
  const {Podcasts} = models;

  app.get('/podcasts', async (req, res) => {
    const podcasts = await Podcasts.findAll();
  });

  app.post('/podcasts', async (req, res) => {
    const {url} = req.body;
    console.log(`trying to index url ${url}`)
    let feed;
    try {
      const {data} = await axios.get(url);
      feed = parser.parse(data);
    } catch (error) {
      console.error(`unable to index url ${url}`, error);
      res.status(UNPROCESSABLE_ENTITY).json({
        error: { 
          message: "There was a error while fetching the podcast data",
        }
      });
      return;
    }
    console.log(feed);
    res.json(feed);
  });

  return app;
}
