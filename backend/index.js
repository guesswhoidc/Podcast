const App = require('./app');
const DB = require('./db');
const Models = require('./models');

const PORT = process.env.PORT || 3052;


DB().then((db) => {
  App(Models(db)).listen(PORT, () => {
    console.log(`server running at ${PORT}`);
  });
});
