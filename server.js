const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const { port } = require('./config/config')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express();

//body Parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

const db = require('./config/keys').mongoURI

//connect mongo
mongoose.Promise = global.Promise
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Mongo Atlas connected')
  })
  .catch(error => {
    console.log(error)
  })

//passport
app.use(passport.initialize());

require('./config/passport')(passport)

//use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

app.listen(port, () => console.log(`Server running on port ${port}`));