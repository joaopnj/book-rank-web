module.exports = () => { 
    const favicon      = require('serve-favicon');
    const logger       = require('morgan');
    const cookieParser = require('cookie-parser');
    const bodyParser   = require('body-parser');
    
    var ConfigMiddleware = {
        express : (app, express) => {
                        // view engine setup
            app.set('views', __dirname + '/views');
            app.set('view engine', 'jade');
            app.use(logger('dev'));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(cookieParser());
            app.use(express.static(__dirname + '/public'));

            // Maneira de mostrar o JSON formatado.
            app.set('json spaces', 2);
            
            // Configurando acesso a API
            app.use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });

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
        }
    }

    return ConfigMiddleware;
}