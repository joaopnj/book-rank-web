const express      = require('express');
const load         = require('express-load');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const cors         = require('cors');

var app = express();

app.use(cors);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

load('middleware').then('models').then('controllers').then('routes').into(app);

const mongodb = app.middleware.mongodb;

mongodb.connect();
// Maneira de mostrar o JSON formatado.
app.set('json spaces', 2);

// Configurando acesso a API
// app.use((req, res, next) => {
//     if(req.method == "OPTIONS"){
//       var headers = {};
//       headers["Access-Control-Allow-Origin"] = "*";
//       headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
//       headers["Access-Control-Allow-Credentials"] = false;
//       headers["Access-Control-Max-Age"] = '86400'; // 24 hours
//       headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
//       res.writeHead(200, headers);
//       res.end();
//     }
//     else{
//       res.header("Access-Control-Allow-Origin", "*");
//       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//       next();
//     }
// });
// ERRORS

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;