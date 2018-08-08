const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router.js');

const app = express();
router(app);

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/* '}));


const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Listening on port: ', port);
