module.exports = (app) => {

	const notifier = require('node-notifier');
	const SlackBot = require('slackbots');
	var Usuario = app.models.usuarios;

	var UsuarioController = {
		index: (req,res) => {
			Usuario.find((err,data) => {
				err ? console.log(err) : res.render("usuarios/index", {lista: JSON.stringify(data)});
			});
		},
		create: (req,res) => {
			res.render("usuarios/create");
		},

		insert: (req,res) => {
			var model = new Usuario(req.body);
			model.save((err) => {
				err ? console.log(err) : res.redirect('/usuarios');
			});
		},

		edit: (req,res) => {
			Usuario.findById(req.params.id, (err, data) => {
				err ? console.log(err) : res.render('usuarios/edit', {value: data});
			});
		},

		update: (req,res) => {
			Usuario.findById(req.params.id, (err, data) => {
				if(err) console.log(err);
				else{
					var model   = data;
					model.nome  = req.body.nome;
					model.login = req.body.login;
					model.save((err) => {
						err ? console.log(err) : res.redirect('/usuarios');
					});
				}
			});
		},
		show: (req,res) => {
			Usuario.findById(req.params.id, (err, data) => {
				err ? console.log(err) : res.render('usuarios/show', {value: data});
			});
		},

		notification: (req,res) => {
			notifier.notify({
				'title'  : "Só testando pra ver",
				'message': "Olá, minha primeira notificação",
				'icon '  : "../imagens/Ok.png",
				'sound'  : true,
				'wait'   : true // Wait with callback, until user action is taken against notification 
    		}, (err, response) => {
    		// Response is response from notification 
    		});
			res.redirect('/usuarios');
		},

		bot : (req, res) => {
			// create a bot 
			var bot = new SlackBot({
				token: 'xoxb-200735739779-QAgRY7f5CupNYzI9eu370YDw', // Add a bot https://my.slack.com/services/new/bot and put the token  
				name: 'alarme'
			});
			
			bot.on('start', (err) => {

				if (err) console.log(err);
				// more information about additional params https://api.slack.com/methods/chat.postMessage 

				var params = {
					icon_emoji: ':rotating_light:'
				};
				
				// define channel, where bot exist. You can adjust it there https://my.slack.com/services  
				bot.postMessageToChannel('buildada', 'Teste de alarme!' , params);
				
				res.redirect('/usuarios');
			});
		}
	}

	return UsuarioController;
}
