module.exports = (app) => {
		
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