module.exports = (app) => {
	const mongoose     	= require('mongoose');
	const Schema       	= mongoose.Schema;

	var alarme  = new Schema({
	lat : Number,
    lng : Number,
    mensagem : String,
	visto: {type: Boolean, default:false},
    	
	dispositivo : {
    	nome: String,
    	imei: String,
    	tipo: String,    
    	statusBateria : Boolean,
	},
	
    cliente : String,	
	monitor: {type: String, default:"MEDICAR"},
	sudo: {type: String, default:"LIFELINK"},
	athene: {type: String, default:"ATHENE"},
    excluido: Boolean,
    data_cad : {type: Date, default: Date.now},
	dataHora : Date,
    data: String,
    hora: String
	});

	return mongoose.model('alarme', alarme);
}
