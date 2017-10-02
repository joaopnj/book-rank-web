module.exports = (app) => {

	var Alarme 		 	 = app.models.alarmes;
	

	var AlarmesController = {

        index: (req,res) => {
			if(req.headers.authorization === token){
				Alarme.find({ 'dispositivo.nome': req.params.dispositivo },(err,data) => {
					return err ? console.log(err) : res.json(data);
				})
				.sort({'dataHora' : -1})
				.limit(20);
			}	
			else{	
				// acesso negado.
				return res.send(403);
			}
		},

		insert: (req,res) => {
			if(req.headers.authorization === token){
				var model = new Alarme();
				model = req.body;
				model.lng = null;
				model.lat = null;
				model.excluido = true;
				model.cliente = 'BL0001';
				model.visto = false;
				model.hora = '17:37';
				model.data = '07/07/2017';
				model.dataHora = new Date(2017, 07, 07);
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