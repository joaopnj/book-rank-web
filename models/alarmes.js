module.exports = (app) => {
	const mongoose     	= require('mongoose');
	const Schema       	= mongoose.Schema;

	var alarme  = new Schema({
		titulo	  :   String,
        subtitulo :   String,
		dataEvento:   String,
		descricao :   String,
		cadastro  :   {type: Date, default: Date.now}
	});

	return mongoose.model('alarme', alarme);
}
