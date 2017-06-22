module.exports = (app) => {
	var usuarios = app.controllers.usuarios;

	// methods de HTTP, GET, POST, PUT , DELETE
	app.get ("/usuarios", 			   usuarios.index);
	app.get ("/usuarios/notification", usuarios.notification);
	app.get ("/usuarios/create", 	   usuarios.create);
	app.post("/usuarios", 		       usuarios.insert);
	app.get ("/usuarios/edit/:id", 	   usuarios.edit);
	app.post("/usuarios/edit/:id", 	   usuarios.update);
	app.get ("/usuarios/show/:id",     usuarios.show);
	app.get ("/usuarios/bot", 		   usuarios.bot);
}
