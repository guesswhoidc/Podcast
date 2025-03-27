const {Sequelize} = require('sequelize');
module.exports = async function () {
  let {
    DB_NAME, 
    DB_USERNAME, 
    DB_PASSWORD,
    DB_HOST,
  } = process.env;
    
  console.log('DB_ENVIRONMENT variable isn\'t test, connecting to regular DB');
  console.assert(!!DB_NAME, "Make sure that the DB_NAME environment variable is set");
  console.assert(!!DB_USERNAME, "Make sure that the DB_USERNAME environment variable is set");
  console.assert(!!DB_PASSWORD, "Make sure that the DB_PASSWORD environment variable is set");
  console.assert(!!DB_HOST, "Make sure that the DB_HOST environment variable is set");

  const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
  });

  try {
    await db.authenticate();
    console.log("db initialized");
  } catch (error) {
    console.error("Unable to connect to the database", error);
    throw error;
  }

  return db;
}
