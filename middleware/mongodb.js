module.exports = (app) => { 

    const mongoose = require('mongoose');
    const mongourl = 'mongodb://bookrank:rankbook@ds161459.mlab.com:61459/bookrank';

    var MongoDbMiddleware = {

        // Método que estabelece conexão do banco de dados
        connect : () => {
            mongoose.connect(mongourl, (err) => {
                if(err) console.log('Erro ao conectar no mongodb '+ err);
            });
        }
    }
    return MongoDbMiddleware;
}
