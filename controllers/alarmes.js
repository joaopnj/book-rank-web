module.exports = (app) => {

	var Alarme 		 	 = app.models.alarmes;
	var Cliente			 = app.models.cliente;
	var Dispositivo 	 = app.models.dispositivos;
	var Util 	 		 = app.middleware.util;
	var token   		 = app.middleware.crypto.token();

	var AlarmesController = {

		// Método que traz do banco os alarmes pelo despositivo passado por parametro e retorna a lista
        getAlarmeByDeviceName: (req,res) => {
			if(req.headers.authorization === token){
				Cliente.findOne({ 'login' : req.query.login }, (err, client) => {
					if(err) return err;
					if(client.identificador){
						Alarme.find({ 'dispositivo.imei':  client.identificador}, (err, alarm) => {
							return err ? console.log(err) : res.json(alarm);
						})
						.sort({'dataHora' : 1})
						.limit(20);
					}
					else{
						return res.sendStatus(400, " Dispositivo não associado ! ")
					}
				});
			}	
			else{	
				// acesso negado.
				return res.sendStatus(403);
			}
		},
		
		// Método de inserção no banco dos alarmes vindos do athene app
		insertAlarmeByApp: (req,res) => {
			if(req.headers.authorization === token){

				var model = new Alarme();

				model.mensagem		   = req.body.mensagem;
				model.cliente 		   = req.body.cliente;
				model.data 			   = req.body.data;
				model.hora			   = req.body.hora;
				model.dataHora	       = Util.criaData(model.data,model.hora);
				model.dispositivo.imei = req.body.dispositivo.imei;
				
				model.save( (err) => {
					return err ? console.log(err) : res.sendStatus(200);
				});
			}
			else{
				// acesso negado.
				return res.sendStatus(403);
			}
		}
		
	}

    return AlarmesController;
}