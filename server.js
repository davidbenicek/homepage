'use strict'
//Lib imports
var express = require('express');
const path = require('path');

//Start server
var app = express();
var port = Number(process.env.PORT || 5000);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/char', function (req, res) {
  res.send('yo');
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port);
console.log(`Backend server running on http://localhost:${port}/`)

