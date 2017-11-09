module.exports = () => {
	const mongoose     = require('mongoose');
	const Schema       = mongoose.Schema;

	var dispositivos  = new Schema({
		nome	  	    : { type: String },
		tipo 	  	    : { type: String },
		serial	  	    : { type: String },
		imei	  	    : { type: String },
		status    	    : { type: String },
		simcard    	    : { type: String },
		cliente   	    : { type: String },
		telefone  	    : { type: String },
		empresa   	    : { type: String },
		observacao	    : { type: String },
		acessorios	    : { type: Array  },
		dt_ativacao     : { type: Date   },
		dt_cadastro     : { type: Date   },
		dt_desativacao  : { type: Date   },
		dt_movimentacao : { type: Date   },
	});

	return mongoose.model('dispositivos', dispositivos);
}
