module.exports = () => {
	const mongoose     	= require('mongoose');
	const Schema       	= mongoose.Schema;

	var rank  = new Schema({
		aluno: 			{type : Object},
		book:        	{type : Object},
		descricao:		{type : String},
		nota:		    {type : Number}
	});

	return mongoose.model('rank', rank);
}
