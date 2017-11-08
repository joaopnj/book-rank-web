module.exports = (app) => {
    
    var token       = "9575711200";
    var bcrypt      = require('bcrypt-nodejs');
    var Cliente     = app.models.cliente;
    var Dispositivo = app.models.dispositivos;

    var ClienteController = {
        getClientByLoginAndPassword : (req,res) => {
            if(req.headers.authorization === token){
                var client = req.query;
                Cliente.findOne({
                    login : client.login,
                }, (err, dados) => {
                    if(!dados){ res.sendStatus(400, "Erro Login " ); }
                    else{
                        bcrypt.compare(client.senha, dados.senha, (err, callback) => {
                            if(err) console.log(err);
                            if(!callback){ res.sendStatus(400, "Erro Senha" ); }
                            else{
                                bcrypt.genSalt(5, (err, salt) => {
                                    if (err) console.log(err);
                                    bcrypt.hash(dados.login, salt, null, (err, hash) => {
                                        if (err) console.log(err);
                                        res.json({ response : "Dados  ok" } );
                                    });
                                }   );
                            }
                        });
                    }
                });
            }	
            else{	
                // acesso negado.
                return res.sendStatus(403);
            }
        },

        associateDeviceWithClient : (req, res) => {
            if(req.headers.authorization === token){                
                Cliente.findOne( { "login" : req.body.login }, (err, data) => {
                    if(err) { console.log(err); }
                    data.cliente = req.body.dispositivo;
                    data.save( (err) => {
                        return err ? console.log(err) : res.json( {"mensagem" : "Associação feita com sucesso!"} );
                    });
                });
            }
            else{	
                // acesso negado.
                return res.send(403);
            }
        },

        getAdressFromClient : (req, res) => {
            if(req.headers.authorization === token){
                Cliente.findOne( {"login" : req.query.login }, (err, data) => {
                    if(err) { console.log(err); }
					return data.cliente ? res.json(data) : res.sendStatus(400, "Não possui BL "); 
				});
            }
            else{
                return res.send(403);
            }            
        },

        isDeviceAssociated: (req, res) => {
			if(req.headers.authorization === token){	
				Cliente.findOne( {"cliente" : req.query.cliente }, (err, data) => {
					if(err) { console.log(err); }
                    return data ? res.sendStatus(400, "Já possui BL associado") : 
                        res.json({"mensagem" : 'BL aberto para ser associado'});
                });
            }
			else{
				return res.send(403);
			}
		}
	}

    return ClienteController;
}