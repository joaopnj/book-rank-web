module.exports = (app) => {

	var Alarme 		 	 = app.models.alarmes;
	var Cliente			 = app.models.cliente;
	var Dispositivo 	 = app.models.dispositivos;
	var token   		 = "9575711200";
	

	var AlarmesController = {

        getAlarmeByDeviceName: (req,res) => {
			if(req.headers.authorization === token){
				Cliente.findOne({ 'login' : req.params.login }, (err, client) => {
					if(err) return err;
					if(client.cliente != null){
						Alarme.find({ 'dispositivo.nome': req.params.dispositivo }, (err, alarm) => {
							return err ? console.log(err) : res.json(alarm);
						})
						.sort({'dataHora' : -1})
						.limit(20);
					}
					else{
						return res.send(400, " Dispositivo não associado ! ")
					}
				});
			}	
			else{	
				// acesso negado.
				return res.send(403);
			}
		},
		
		insertAlarmeByApp: (req,res) => {
			if(req.headers.authorization === token){

				var model = new Alarme();
				
				var objeto = req.body;

				model.mensagem		   = objeto.mensagem;
				model.cliente 		   = objeto.cliente;
				model.data 			   = objeto.data;
				model.hora			   = objeto.hora;
				model.dispositivo.nome = objeto.dispositivo.nome;
				
				model.save( (err) => {
					return err ? console.log(err) : res.send(200);
				});
			}
			else{
				// acesso negado.
				return res.send(403);
			}
		}
		
	}

    return AlarmesController;
}