module.exports = (app) => {

	var Alarme 		 	 = app.models.alarmes;
	var elasticsearch 	 = app.middleware.elasticsearch;

	// elasticsearch.buildMapping(Alarme);

	var AlarmesController = {

        index: (req,res) => {
			Alarme.find( (err,data) => {
				err ? console.log(err) : res.render("alarmes/index", {lista: data, elastic : false});
			});
		},

		create: (req,res) => {
			res.render("alarmes/create");
		},

		insert: (req,res) => {
			model = new Alarme();
			model.titulo     = req.body.titulo;
			model.subtitulo  = req.body.subtitulo;
			model.descricao  = req.body.descricao;
			model.save( (err) => {
                err ? console.log(err) : res.redirect('/alarmes',{elastic : false});
			});
		},

		edit: (req,res) => {
			Alarme.findById(req.params.id, (err, data) => {
				err ? console.log(err) : res.render('alarmes/edit', {value: data});
			});
		},

		update: (req,res) => {
			Alarme.findById(req.params.id, (err, data) => {
				if(err){
					console.log(err);
				} else{
					var model   = data;
					model 	    = req.body;
					model.save( (err) => {
					    err ? console.log(err) : res.redirect('/alarmes',{elastic : false});
					});
				}
			});
		},

		show: (req,res) => {
			Alarme.findById(req.params.id, (err, data) => {
				err ? console.log(err) : res.render('alarmes/show', {value: data});
			});
		},

		search : (req, res, next) => {
			if(req.query.q){
				Alarme.search({
					query_string: {query: req.query.q},
				}, (err, results) => {
					if(err) return next(err);
					var data = results.hits.hits.map((hit) =>{
						return hit;
					});
					console.log(data);
					res.render('alarmes/index', {
						query : req.query.q,
						lista  : data,
						elastic  : true
					})
				})
			}
			else{ res.render('alarmes/index', {elastic : false }); }
		},

		add : (req, res) => {
			res.redirect("/search?q="+ req.body.q);
		}
    }

    return AlarmesController;
}