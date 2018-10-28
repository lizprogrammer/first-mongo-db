const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000
app.listen(port, () => console.log('Application listening on port', port));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello!'))




