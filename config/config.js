const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  tokenSecret: process.env.TOKEN_SECRET,
  port: process.env.PORT
};