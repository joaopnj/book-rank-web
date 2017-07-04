module.exports = (app) => {

	const cripto = app.middleware.cripto;
		
	var HomeController = {
		index: (req,res) => {
			res.render('home/index');
		},
		token : (req, res) =>{
			res.json(cripto.token);
		}
	}

	return HomeController;
}