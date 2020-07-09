const {
  dbName,
  dbUser,
  dbPassword
} = require('./config')

module.exports = {
  mongoURI: `mongodb+srv://${dbUser}:${dbPassword}@cluster0.2mon0.mongodb.net/${dbName}?retryWrites=true&w=majority`
}