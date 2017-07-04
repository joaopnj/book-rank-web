module.exports = (app) => {

	var Alarme 		 	 = app.models.alarmes;

	var AlarmesController = {

        index: (req,res) => {
			if(token === 21321312321){
				Alarme.find( (err,data) => {
					err ? console.log(err) : res.json(data);
				});
			}
			else{
				// acesso negado.
				res.send(403);
			}
		},

		insert: (req,res) => {
			if(token === 21321312321){
				model = new Alarme();
				model = req.body;
				model.save( (err) => {
					err ? console.log(err) : res.send(200);
				});
			}
			else{
				// acesso negado.
				res.send(403);
			}

    	}
	}

    return AlarmesController;
}