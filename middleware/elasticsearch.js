module.exports = (app) => { 

	const mongoosastic = require('mongoosastic');

    var ElasticSearchMiddleware = {

        buildMapping : (object) => {
        
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

        connect : (object) =>{
            objeto.plugin(mongoosastic, {
                hosts: [
                    'localhost:9200'
                ]
            });    
        }

    }
    return ElasticSearchMiddleware;
}
