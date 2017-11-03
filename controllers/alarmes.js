module.exports = (app) => {

	var Alarme 		 	 = app.models.alarmes;
	var Cliente			 = app.models.cliente;
	var Dispositivo 	 = app.models.dispositivos;
	var token   		 = "9575711200";

	var AlarmesController = {

        getAlarmeByDeviceName: (req,res) => {
			if(req.headers.authorization === token){
				Cliente.findOne({ 'login' : req.query.login }, (err, client) => {
					if(err) return err;
					if(client.cliente){
						Alarme.find({ 'dispositivo.imei':  client.cliente}, (err, alarm) => {
							return err ? console.log(err) : res.json(alarm);
						})
						.sort({'dataHora' : -1})
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
		
		insertAlarmeByApp: (req,res) => {
			if(req.headers.authorization === token){

				var model = new Alarme();
				
				// var objeto = req.body;

				model.mensagem		   = req.body.mensagem;
				model.cliente 		   = req.body.cliente;
				model.data 			   = req.body.data;
				model.hora			   = req.body.hora;
				model.dispositivo.nome = req.body.dispositivo.nome;
				
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