module.exports = (app) => {
	const mongoose     	= require('mongoose');
	const Schema       	= mongoose.Schema;

	var livro  = new Schema({

	});

	return mongoose.model('livro', livro);
}
