module.exports = (app) => {
	var usuarios = app.controllers.usuarios;

	// methods de HTTP, GET, POST, PUT , DELETE
	app.get ("/usuarios", 			   usuarios.index);
	// app.get ("/usuarios/create", 	   usuarios.create);
}
