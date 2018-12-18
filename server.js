'use strict'
//Lib imports
var express = require('express');

//Start server
var app = express();
var port = Number(process.env.BACKEND_PORT || 1200);



app.get('/char', function (req, res) {
  res.send('yo');
});

app.listen(port);
console.log(`Backend server running on http://localhost:${port}/`)

