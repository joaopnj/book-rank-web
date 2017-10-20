module.exports = () => {
	var mongoose = require('mongoose');
	var bcrypt = require('bcrypt-nodejs');
	var Schema   = mongoose.Schema;

// Criação de tabela cliente e sua estrutura.
	var cliente  = new Schema({
		nome: String,
		dispositivo:{ 
			nome : String,
			imei : String
		},
		login: {
			type:     String,
			unique:   true,
			required: true
		},
		senha: {
			type :    String,
			required: true
		},
		sessionpass: String,
		excluido : Boolean,
		data_cad: {type: Date, default: Date.now}
	});

// Método para criptografia de senha
	cliente.pre('save', (next) => {
		var cliente = this;
		if (!cliente.isModified('senha')) return next();
			bcrypt.genSalt(5, (err, salt) => {
				if (err) return next(err);
					bcrypt.hash(cliente.senha, salt, null, (err, hash) => {
						if (err) return next(err);
						cliente.senha = hash;
						next();
					});
			});
	});

	return mongoose.model('cliente', cliente);
}
