module.exports = () => {
	var mongoose = require('mongoose');
	var bcrypt 	 = require('bcrypt-nodejs');
	var Schema   = mongoose.Schema;

// Criação de tabela user e sua estrutura.
	var user  = new Schema({

		login		  : { type: String, unique: true, required: true },
		senha		  : { type: String, required: true },
		nome		  : { type: String  },
		identificador : { type: String  },
		sessionpass	  : { type: String  },
		cadastro	  : { type: Date,   default: Date.now},

	});

// Método para criptografia de senha
	user.pre('save', function(next) {
		var user = this;
		if (!user.isModified('senha')) return next();
			bcrypt.genSalt(5, (err, salt) => {
				if (err) return next(err);
					bcrypt.hash(user.senha, salt, null, (err, hash) => {
						if (err) return next(err);
						user.senha = hash;
						next();
					});
			});
	});

	return mongoose.model('user', user);
}
