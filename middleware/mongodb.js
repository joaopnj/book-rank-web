module.exports = (app) => { 

    const mongoose = require('mongoose');

    var MongoDbMiddleware = {
        connect : () => {
            mongoose.connect('mongodb://adabeta:beta2112@ds149481.mlab.com:49481/adabeta', (err) => {
                if(err) console.log('Erro ao conectar no mongodb '+ err);
            });
        }
    }
    return MongoDbMiddleware;
}
