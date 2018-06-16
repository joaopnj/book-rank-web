module.exports = () => {
	const mongoose     	= require('mongoose');
	const Schema       	= mongoose.Schema;

	var livro  = new Schema({
		nome: 			{type : String},
		descricao: 		{type : String},
		autor:			{type : String},
		editora:		{type : String},
		disciplina:		{type : String},
		professor:		{type : Object},
		media:			{type : Number}
	});

	return mongoose.model('livro', livro);
}
