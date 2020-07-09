const express = require('express');
const mongoose = require('mongoose')
const {
  port
} = require('./config/config')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express();

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

app.get("/", (req, res) => res.send("hello world"));

//use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

app.listen(port, () => console.log(`Server running on port ${port}`));