const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router.js');

// DB setup
mongoose.connect('mongodb://localhost:auth/auth');

// App setup
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

router(app);
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Listening on port: ', port);
