var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/config');

// set port
//var port = process.env.PORT || 8080;

// Connect to database
mongoose.connect(config.database);

var server = require('http').createServer(app);


// use morgan to log requests to the console
app.use(morgan('dev'));
app.use('/static', express.static('uploads'));

require('./config/express')(app);
require('./routes')(app);


server.listen(function () {
    console.log('HotTab server listening on port: ');
});

