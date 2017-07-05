module.exports = (app) => { 

	const mongoosastic = require('mongoosastic');

    var ElasticSearchMiddleware = {

        buildMapping : (object) => {
        
            object.createMapping((err, mapping) => {
                err ? console.log(err) : console.log("Mapping created! status: "+ mapping);
            });
            
            var stream  = object.synchronize();
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
            object.plugin(mongoosastic, {
                hosts: [
                    'localhost:9200'
                ]
            });    
        }

    }
    return ElasticSearchMiddleware;
}
