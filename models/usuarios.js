module.exports = () => {
	const mongoose     = require('mongoose');
	const Schema         = mongoose.Schema;

	var usuarios  = new Schema({
		nome	: String,
		login 	: String,
		senha	: String,
		cadastro: {type: Date, default: Date.now}
	});

	return mongoose.model('usuarios',usuarios);
}
