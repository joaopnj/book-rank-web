module.exports = (app) => {

	var Usuario = app.models.usuarios;

	var UsuarioController = {
		index: (req,res) => {
			// if(req.params.token === app.token){
				Usuario.find( (err,data) => {
					return err ? console.log(err) : res.json(data);
				});
			// }
			// acesso negado.
			// return res.send(403);
		},
	}

	return UsuarioController;
}
