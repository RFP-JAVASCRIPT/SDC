require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database/postgres.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('Serving GET request to "/"')
  db.test();
  res.status(200).send('This works!')
})

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}!`)
})