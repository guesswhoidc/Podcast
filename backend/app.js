const express = require('express');
const podcastsRoutes = require('./routes/podcasts')

module.exports = function(models) { 
  const app = express();

  app.use(express.json());

  podcastsRoutes({models, app});

  app.get("/", (req, res) => {
    res.send("Hullo \n");
  });

  return app;
}
