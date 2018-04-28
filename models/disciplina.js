module.exports = (app) => {
	const mongoose     	= require('mongoose');
	const Schema       	= mongoose.Schema;

	var disciplina  = new Schema({
		nome: 			         {type : String},
		professor: 	             {type : String},
		curso:		             {type : String}
	});

	return mongoose.model('disciplina', disciplina);
}