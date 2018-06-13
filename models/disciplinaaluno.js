module.exports = (app) => {
	const mongoose     	= require('mongoose');
	const Schema       	= mongoose.Schema;
	const Disciplina	= app.models.disciplina;
	const User			= app.models.user;

	var disciplinaaluno  = new Schema({
		disciplina: 			 {type : Object},
		aluno: 	                 {type : Object}
	});

	return mongoose.model('disciplinaaluno', disciplinaaluno);
}