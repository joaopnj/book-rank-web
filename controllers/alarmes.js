module.exports = (app) => {

	var Alarme 		 	 = app.models.alarmes;

	var AlarmesController = {

        index: (req,res) => {
			// if(req.params.token === app.token){
				Alarme.find( (err,data) => {
					err ? console.log(err) : res.json(data);
				});
			// }
			// acesso negado.
			// return res.send(403);
		},

		insert: (req,res) => {
			// if(req.params.token === app.token){
				var model = new Alarme();
				model = req.body;
				model.save( (err) => {
					return err ? console.log(err) : res.send(200);
				});
			// }
			// acesso negado.
			// return res.send(403);

    	}
	}

    return AlarmesController;
}