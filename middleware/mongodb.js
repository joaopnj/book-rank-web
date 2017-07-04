module.exports = (app) => { 

    const mongoose = require('mongoose');

    var MongoDbMiddleware = {
        connect : () => {
            mongoose.createConnection('mongodb://localhost/atheneapi', (err) => {
                if(err) console.log('Erro ao conectar no mongodb '+ err);
            });
        }
    }
    return MongoDbMiddleware;
}
