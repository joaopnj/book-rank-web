module.exports = (app) => {
	const mongoose     	= require('mongoose');
	const Schema       	= mongoose.Schema;

	var disciplina_aluno  = new Schema({
		disciplina: 			 {type : String},
		aluno: 	                 {type : String}
	});

	return mongoose.model('disciplina_aluno', disciplina_aluno);
}