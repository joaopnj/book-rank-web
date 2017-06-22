module.exports = (app) => {
	var home = app.controllers.home;

	app.get('/', home.index);
}