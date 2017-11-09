module.exports = (app) => {
	var home = app.controllers.home;

	// methods de HTTP, GET, POST, PUT , DELETE
	app.get('/',      home.index);
}