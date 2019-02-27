'use strict'
//Lib imports
require('dotenv').config();
var express = require('express');
const path = require('path');

const kanhanzi = require('./services/kanhanzi');
const weather = require('./services/weather');

// Start server
var app = express();
var port = Number(process.env.PORT || 5000);

// TODO: replace with DB bind
let VOCAB = [];
kanhanzi.getVocab().then(({ vocab }) => {
  VOCAB = vocab;
}).catch((err) => {
  console.log(err);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/char', (req, res) => {
  let { level } = req.query;

  if (!level) level = '1,2,3';
  let char = VOCAB[Math.floor(Math.random() * VOCAB.length)];
  while(!level.includes(char.HSK)) {
    char = VOCAB[Math.floor(Math.random() * VOCAB.length)];
  }
  res.send(char);
});

app.get('/weather', async (req, res) => {
  let { lat, lang } = req.query;
  try {
    let forecast = await weather.getForecast(lat, lang);
    res.send(forecast);
  } catch (err) {
    console.log('WEATHER ERROR: ', err);
    res.status(500).send(err);
  }
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port);
console.log(`Backend server running on http://localhost:${port}/`)

