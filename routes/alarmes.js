module.exports = (app) => {

    var alarmes = app.controllers.alarmes;

    // methods de HTTP, GET, POST, PUT , DELETE
	app.get ("/alarmes",          alarmes.index);
	app.get ("/search", 		  alarmes.search);
	app.post("/search", 		  alarmes.add);
	app.get ("/alarmes/create",   alarmes.create);
	app.post("/alarmes",          alarmes.insert);
	app.get ("/alarmes/edit/:id", alarmes.edit);
	app.post("/alarmes/edit/:id", alarmes.update);
	app.get ("/alarmes/show/:id", alarmes.show);
    
}