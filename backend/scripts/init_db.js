const DB = require('../db.js');
const models = require('../models.js');

DB().then(models).then(({syncAll}) => syncAll()).then(() => {
  console.log("tables initialized sucessfully");
}).catch(error => {
  console.error("failed to sync tables", error);
});
