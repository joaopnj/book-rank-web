module.exports = (app) => {

	var Dispositivos = app.models.dispositivos;
	var Cliente 	 = app.models.cliente;
	var token        = app.middleware.crypto.token();

	var DispositivoController = {

		// Método que insere um dispositivo.
		insertDevice: (req,res) => {
			if(req.headers.authorization === token){
				model = new Dispositivos();
				model = req.body;
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
	
	return DispositivoController;
}