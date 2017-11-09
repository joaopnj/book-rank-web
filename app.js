const express      = require('express');
const load         = require('express-load');

var app = express();

load('middleware').then('models').then('controllers').then('routes').into(app);

const config  = app.middleware.config;

const mongodb = app.middleware.mongodb; 

config.express(app, express);

mongodb.connect();

module.exports = app;