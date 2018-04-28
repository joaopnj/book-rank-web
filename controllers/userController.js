module.exports = (app) => {

    var LocalStorage    = require('node-localstorage').LocalStorage;
    localStorage        = new LocalStorage('./scratch');
    var bcrypt          = require('bcrypt-nodejs');
    var axios           = require('axios');
    var token           = app.middleware.crypto.token();
    var User            = app.models.user;
    var DisciplinaAluno = app.models.disciplina_aluno;
    var Disciplina      = app.models.disciplina;
    var request         = require('request');

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
                                    localStorage.setItem('user', data.login);
                                    if (data.isFirstAcess && data.identificador == 'Professor') {
                                        Disciplina.find( (err, disciplinas) =>{
                                            if(err) console.log(err);
                                            return res.render('usuario/confirmRegisterProfessor', {disciplinas : disciplinas});
                                        });
                                    }
                                    if (data.isFirstAcess && data.identificador == 'Aluno') {
                                        Disciplina.find( (err, disciplinas) =>{
                                            if(err) console.log(err);
                                            return res.render('usuario/confirmRegisterAluno', {disciplinas : disciplinas});
                                        });
                                    }
                                    if(!data.isFirstAcess){
                                        return res.render('principal');
                                    }
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
                        var user            = new User();
                        user.nome           = req.body.nome;
                        user.login          = req.body.login;
                        user.identificador  = req.body.identificador;
                        user.senha          = req.body.senha;
                        user.save( (err) => {
                            return err ? console.log(err) : res.render('login', { sucessCadastro: true } );
                        });
            });
        },

        completeRegister : (req, res) => {
            let user = localStorage.getItem('user');
            
            if(req.body.periodo_materia1 == req.body.periodo_materia3 ||
               req.body.periodo_materia2 == req.body.periodo_materia1 ||
               req.body.periodo_materia3 == req.body.periodo_materia2) {
                res.render('usuario/confirmRegisterProfessor', { errorDisciplinasIguais: true });
            }
            else{
                let newDisciplina1 = new Disciplina();
                newDisciplina1.curso     = req.body.curso;
                newDisciplina1.nome      = req.body.periodo_materia1;
                newDisciplina1.professor = user;
                newDisciplina1.save( (err) => {
                    if(err) console.log(err);
                        let newDisciplina2 = new Disciplina();
                        newDisciplina2.curso     = req.body.curso;
                        newDisciplina2.nome      = req.body.periodo_materia1;
                        newDisciplina2.professor = user;
                        newDisciplina2.save( (err) => {
                            if(err) console.log(err);
                                let newDisciplina3 = new Disciplina();
                                newDisciplina3.curso     = req.body.curso;
                                newDisciplina3.nome      = req.body.periodo_materia1;
                                newDisciplina3.professor = user;
                                newDisciplina3.save( (err) => {
                                    if(err) console.log(err);
                                    res.render('principal');
                                });
                            });
                });
            }
        }
    }
	

    return UserController;
}