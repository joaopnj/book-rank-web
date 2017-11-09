module.exports = (app) => {
		
	var HomeController = {
		
		index: (req, res) => {
			res.render('home/index');
		}

	}

	return HomeController;
}