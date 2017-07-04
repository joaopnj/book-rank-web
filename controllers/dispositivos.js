module.exports = (app) => {

	var Dispositivos = app.models.dispositivos;

	var DispositivoController = {

		insert: (req,res) => {
			if(req.params.token === app.token){
				model = new Dispositivos();
				model = req.body;
				model.save( (err) => {
					err ? console.log(err) : res.send(200);
				});
			}
			else{
				// acesso negado.
				res.send(403);
			}

    	}
	}

	return DispositivoController;
}
