module.exports = () => {
	const mongoose     	= require('mongoose');
	const Schema       	= mongoose.Schema;

	var disciplina  = new Schema({
		nome: 			         {type : String},
		professor: 	             {type : Object},
		periodo:				 {type : String},
		curso:		             {type : String}
	});

	return mongoose.model('disciplina', disciplina);
}