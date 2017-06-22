module.exports = (app) => { 

	var mongoosastic = require('mongoosastic');

    var ElasticSearchMiddleware = {

        buildMapping : function buildMapping(objeto) {
        
            objeto.createMapping((err, mapping) => {
                err ? console.log(err) : console.log("Mapping created! status: "+ mapping);
            });
            
            var stream  = objeto.synchronize();
            var count   = 0;

            stream.on('data', () => {
                count++;
            });

            stream.on('close', () => {
                console.log("Indexed " + count + " documents");
            });

            stream.on('error', (err) => {
                console.log(err);
            });
        },

        connect : function connect(objeto) {
            objeto.plugin(mongoosastic, {
                hosts: [
                    'localhost:9200'
                ]
            });    
        }

    }
    return ElasticSearchMiddleware;
}
