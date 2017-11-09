module.exports = (app) => {
    
    var bcrypt      = require('bcrypt-nodejs');
    var token       = app.middleware.crypto.token();
    var Cliente     = app.models.cliente;
    var Dispositivo = app.models.dispositivos;

    var ClienteController = {

        // Método que autentica o login.
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

        // Método que procura o cliente passado como parametro, e associa o despositivo achado por ele.
        associateDeviceWithClient : (req, res) => {
            if(req.headers.authorization === token){                
                Cliente.findOne( { "login" : req.body.login }, (err, data) => {
                    if(err) { console.log(err); }
                    data.identificador = req.body.dispositivo;
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

        // Método que busca se o cliente possui associação com um BL ou não por mac adress.
        getAdressFromClient : (req, res) => {
            if(req.headers.authorization === token){
                Cliente.findOne( {"login" : req.query.login }, (err, data) => {
                    if(err) { console.log(err); }
					return data.identificador ? res.json(data) : res.sendStatus(400, "Não possui BL "); 
				});
            }
            else{
                return res.send(403);
            }            
        },

        // Método que verifica se o dispositivo passado por parametro já está associado a alguem.
        isDeviceAssociated: (req, res) => {
			if(req.headers.authorization === token){	
				Cliente.findOne( {"identificador" : req.query.identificador }, (err, data) => {
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