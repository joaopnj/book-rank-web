module.exports = () => {
	const mongoose     	= require('mongoose');
	const Schema       	= mongoose.Schema;

	var disciplinaaluno  = new Schema({
		disciplina: 			 {type : Object},
		aluno: 	                 {type : Object}
	});

	return mongoose.model('disciplinaaluno', disciplinaaluno);
}