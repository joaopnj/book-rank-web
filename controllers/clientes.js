module.exports = (app) => {
    
    var token  = "9575711200";
    var bcrypt = require('bcrypt-nodejs');
    var Cliente 		 	 = app.models.cliente;

    var ClienteController = {
        index : (req,res) => {
                if(req.headers.authorization === token){
                    var client = req.body;
                    Cliente.findOne({
                        login : client.email,
                    }, (err, dados) => {
                        if(!dados){ res.status(400).end(); }
                        else{
                            bcrypt.compare(client.senha, dados.senha, (err, callback) => {
                                if(err) console.log(err);
                                if(!callback){ res.status(400).end();}
                                else{
                                    bcrypt.genSalt(5, (err, salt) => {
                                    if (err) console.log(err);
                                        bcrypt.hash(dados.login, salt, null, (err, hash) => {
                                            if (err) console.log(err);
                                            res.status(200`).end();
                                        });
                                    });
                                }
                            });
                        }
                    });
                }	
                else{	
                    // acesso negado.
                    return res.send(403);
                }
            }
		}

    return ClienteController;
}