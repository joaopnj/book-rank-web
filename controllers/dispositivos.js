module.exports = (app) => {

	var Dispositivos = app.models.dispositivos;

	var DispositivoController = {

		insert: (req,res) => {
			if(req.params.token === app.token){
				model = new Dispositivos();
				model = req.body;
				model.save( (err) => {
					return err ? console.log(err) : res.send(200);
				});
			}
			// acesso negado.
			return res.send(403);
		}

    }
	
	return DispositivoController;
}
