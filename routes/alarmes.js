module.exports = (app) => {

    var alarmes = app.controllers.alarmes;

    // methods de HTTP, GET, POST, PUT , DELETE
	app.get ("/alarmes",          alarmes.index);
	app.get ("/alarmes/insert",   alarmes.insert);
    
}