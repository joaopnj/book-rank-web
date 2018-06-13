module.exports = (app) => {

    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
    var bcrypt = require('bcrypt-nodejs');
    var axios = require('axios');
    var token = app.middleware.crypto.token();
    var User = app.models.user;
    var DisciplinaAluno = app.models.disciplina_aluno;
    var Disciplina = app.models.disciplina;
    var request = require('request');

    var UserController = {

        index: (req, res) => {
            res.render('login');
        },

        // Método que autentica o usuário.
        login: (req, res) => {
            var user = req.body;
            User.findOne({
                login: user.login,
            }, (err, data) => {
                if (err) console.log(err);
                if (!data) return res.status(400).send('Login não encontrado! ');
                else {
                    bcrypt.compare(user.senha, data.senha, (err, callback) => {
                        if (err) console.log(err);
                        if (!callback) res.status(400).send('Senha incorreta! ');
                        else {
                            bcrypt.genSalt(5, (err, salt) => {
                                if (err) console.log(err);
                                bcrypt.hash(data.login, salt, null, (err, hash) => {
                                    if (err) console.log(err);
                                    localStorage.setItem('user', data.login);
                                    return res.json(user);
                                });
                            });
                        }
                    });
                }
            });
        },

        me: (req, res) => {
            User.findOne({login : req.query.login}, (err, data) => {
                if(err) res.status(400).send("Erro ao encontrar o usuário!");
                return !data ? res.status(400).send('Usuário existente!') : res.json(data);
            });
        },

        // Método que procura o cliente passado como parametro, e associa o despositivo achado por ele.
        confirmSignUp: (req, res) => {
            User.findOne({ "login": req.body.login }, (err, data) => {
                if (err) console.log(err);
                if (data) return res.status(400).send('Usuário existente!');
                else
                    var user = new User();
                    user.nome = req.body.nome;
                    user.login = req.body.login;
                    user.identificador = req.body.identificador;
                    user.senha = req.body.senha;
                    user.save((err) => {
                        return err ? res.status(400).send('Erro ao salvar! ') : res.json(user);
                });
            });
        },

        removeFirstAcess: (req, res) => {
            User.findOne({"login" : req.body.login}, (err, user) => {
                user.isFirstAcess = false;
                user.save( (err) => {
                    return err ? res.status(400).send('Erro ao salvar! ') : res.json(user);
                })
            });
        }
    }


    return UserController;
}