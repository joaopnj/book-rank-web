module.exports = (app) => {
	const mongoose     	= require('mongoose');
	const Schema       	= mongoose.Schema;

	var alarme  = new Schema({

		lat 	 	  : { type: Number },
		lng 	 	  : { type: Number },
		mensagem 	  : { type: String },
		data	 	  : { type: String },
		hora	 	  : { type: String },
		cliente  	  : { type: String },
		athene	      : { type: String , default:"ATHENE"},
		monitoramento : { type: String , default:"MONITORAMENTO"},
		visto	 	  : { type: Boolean, default: false },
		dataHora 	  : { type: Date   },
		cadastro 	  : { type: Date   , default: Date.now},

		dispositivo : {
			nome	 	  : { type: String },
			imei		  : { type: String },
			tipo		  : { type: String },    
			bateriaFraca  : { type: Boolean },
		}

	});

	return mongoose.model('alarme', alarme);
}
