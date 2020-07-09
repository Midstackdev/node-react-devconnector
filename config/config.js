const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  // masterKey: process.env.API_KEY,
  port: process.env.PORT
};