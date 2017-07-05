module.exports = (app) => { 

    const mongoose = require('mongoose');

    var MongoDbMiddleware = {
        connect : () => {
            mongoose.connect('mongodb://atheneapp:app2112@ds137891.mlab.com:37891/atheneapptest', (err) => {
                if(err) console.log('Erro ao conectar no mongodb '+ err);
            });
        }
    }
    return MongoDbMiddleware;
}
