const path = require('path');
const express = require('express');
const volleyball = require('volleyball');
const PORT = process.env.PORT || 3000;
const app = express();
const dataStream = require('./stream/index.js')
const server = app.listen(PORT, () => console.log(`Feeling chatty on port ${PORT}`));
const io = require('socket.io')(server);

// handle sockets
require('./socket/index.js')(io);

module.exports = app;

if (process.env.NODE_ENV !== 'production') require('../secrets')

dataStream();

// Logging middleware
app.use(volleyball);

// static middleware
app.use(express.static(path.join(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 'API' routes
app.use('/api', require('./api'));

// 404 middleware
app.use((req, res, next) =>
  path.extname(req.path).length > 0 ?
    res.status(404).send('Not found') :
    next()
);

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
);
