module.exports = (app) => {

    var alarmes = app.controllers.alarmes;

    // methods de HTTP, GET, POST, PUT , DELETE
	app.get ("/alarmes/:dispositivo",          alarmes.index);
	app.post ("/alarme/insert",   alarmes.insert);
    
}