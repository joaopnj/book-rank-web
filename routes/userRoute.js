module.exports = (app) => {
    const user = app.controllers.userController;
    
    // methods de HTTP, GET, POST, PUT , DELETE
    app.get  ('/',                          user.index); 
    app.post ('/login',                     user.login);  
    app.get  ('/usuario/me',                user.me);
    app.post ('/usuario',                   user.confirmSignUp);
    app.put  ('/usuario/removeFirstAcess',  user.removeFirstAcess);
}