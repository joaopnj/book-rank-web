module.exports = (app) => {

    var alarmes = app.controllers.alarmes;

    // methods de HTTP, GET, POST, PUT , DELETE
	app.get  ("/alarmes/:dispositivo", alarmes.getAlarmeByDeviceName);
	app.post ("/alarme/insert",        alarmes.insertAlarmeByApp);
    
}