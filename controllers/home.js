module.exports = (app) => {

	const crypto   = app.middleware.crypto;
	var token	   = crypto.token();
		
	var HomeController = {
		index: (req,res) => {
			res.render('home/index');
		},
		token : (req, res) => {
			res.json(token);
		}
	}

	return HomeController;
}