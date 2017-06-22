module.exports = (app) => {
	const mongoose     	= require('mongoose');
	const Schema       	= mongoose.Schema;
	const elasticsearch = app.middleware.elasticsearch;

	var alarme  = new Schema({
		titulo	  :   String,
        subtitulo :   String,
		dataEvento:   String,
		descricao :   String,
		cadastro  :   {type: Date, default: Date.now}
	});

	// elasticsearch.connect(alarme);

	return mongoose.model('alarme', alarme);
}
