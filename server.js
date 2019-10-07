'use strict'
//Lib imports
require('dotenv').config();
const express = require('express');
const path = require('path');
const enforce = require('express-sslify');
const bodyParser = require("body-parser");

const kanhanzi = require('./services/kanhanzi');
const weather = require('./services/weather');
const map = require('./services/map');

// Start server
const app = express();
// Enforce SLL
if (process.env.ENV === 'prod')
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
const port = Number(process.env.PORT || 5000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO: replace with DB bind
let VOCAB = [];
kanhanzi.getVocab().then((vocab) => {
  VOCAB = vocab;
}).catch((err) => {
  console.log(err);
});

app.get('/char', (req, res) => {
  let { level } = req.query;
  if (!level) level = '1,2,3,4';
  const levels = level.split(',');
  const chosenLevel = levels[Math.floor(Math.random() * levels.length)]
  const subVocab = VOCAB[`hsk${chosenLevel}`];
  let char = subVocab[Math.floor(Math.random() * subVocab.length)];

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

app.get('/api/map/:id', async (req, res) => {
  let { id } = req.params;
  let { origin, outbound, inbound } = req.query;
  try {
    const mapData = await map.getMap(id, origin, outbound, inbound);
    res.send(mapData);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/map/:id', async (req, res) => {
  let { id } = req.params;
  let { countryCode, status } = req.body;
  try {
    const newMapData = await map.insertIntoMap(id, countryCode, status);
    res.send(newMapData);
  } catch (err) {
    res.status(500).send(err);
  }
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port);
console.log(`Backend server running on http://localhost:${port}/`)

