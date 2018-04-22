module.exports = (app) => {
    
    var bcrypt      = require('bcrypt-nodejs');
    var token       = app.middleware.crypto.token();
    var User        = app.models.user;

    var UserController = {

        index : (req, res) => {
            res.render('login');
        },

        // Método que autentica o usuário.
        login : (req,res) => {
            var user = req.body;
            User.findOne({
                login : user.login,
            }, (err, data) => {
                if (err) console.log(err); 
                if (!data){ return res.render('login', { errorLogin: true } ); }
                else{
                    bcrypt.compare(user.senha, data.senha, (err, callback) => {
                        if(err) console.log(err);
                        if(!callback){ return res.render('login', {errorLogin : true}); }
                        else{
                            bcrypt.genSalt(5, (err, salt) => {
                                if (err) console.log(err);
                                bcrypt.hash(data.login, salt, null, (err, hash) => {
                                    if (err) console.log(err);
                                    res.render('usuario/confirmRegister', { user: data });
                                });
                            });
                        }
                    });
                }
            });
        },

        signUp : (req, res) => {
            res.render('usuario/create');
        },

        // Método que procura o cliente passado como parametro, e associa o despositivo achado por ele.
        confirmSignUp : (req, res) => {    
            User.findOne( { "login" : req.body.login }, (err, data) => {
                if(err) console.log(err); 
                if(data) return  res.render('usuario/create', { errorUsuarioExistente: true } );
                else
                    if(req.body.login !== req.body.confirmaLogin) return res.render('usuario/create', { errorLoginsNaoBatem: true } );
                    else if(req.body.senha !== req.body.confirmaSenha) return res.render('usuario/create', { errorSenhasNaoBatem: true } );
                    else
                        var user      = new User();
                        user.nome     = req.body.nome;
                        user.login    = req.body.login;
                        user.senha = req.body.senha;
                        user.save( (err) => {
                            return err ? console.log(err) : res.render('login', {sucessCadastro: true} );
                        });
            });
        },

        completeRegister : (req, res) => {
            console.log(req);
            res.render('/principal');
        }
    }
	

    return UserController;
}