import dotenv from 'dotenv';
import app from './app.js';
import DB from './db.js';

dotenv.config();
const PORT = process.env.PORT || 3052;

DB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
  });
});
