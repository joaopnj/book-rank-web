module.exports = (app) => {

	var Dispositivos = app.models.dispositivos;
	var Cliente 	 = app.models.cliente;

	var DispositivoController = {

		insertDevice: (req,res) => {
			if(req.headers.authorization === token){
				model = new Dispositivos();
				model = req.body;
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
	
	return DispositivoController;
}
