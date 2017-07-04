module.exports = () => {
	const mongoose     = require('mongoose');
	const Schema       = mongoose.Schema;

	var dispositivos  = new Schema({
		nome	: String,
		tipo 	: String,
		imei	: String,
		cadastro: {type: Date, default: Date.now}
	});

	return mongoose.model('dispositivos',dispositivos);
}
