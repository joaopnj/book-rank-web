module.exports = (app) => {
    
    var token   = "9575711200";
    var bcrypt  = require('bcrypt-nodejs');
    var Cliente = app.models.cliente;

    var ClienteController = {
        getClientByLoginAndPassword : (req,res) => {
                if(req.headers.authorization === token){
                    var client = req.query;
                    Cliente.findOne({
                        login : client.login,
                    }, (err, dados) => {
                        if(!dados){ res.status(400).send("Login invalido"); }
                        else{
                            bcrypt.compare(client.senha, dados.senha, (err, callback) => {
                                if(err) console.log(err);
                                if(!callback){ res.status(400).send("Senha Invalida");}
                                else{
                                    bcrypt.genSalt(5, (err, salt) => {
                                    if (err) console.log(err);
                                        bcrypt.hash(dados.login, salt, null, (err, hash) => {
                                            if (err) console.log(err);
                                            res.json({ response : "Dados  ok" } );
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