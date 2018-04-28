module.exports = (app) => {
    const user = app.controllers.userController;
    
    // methods de HTTP, GET, POST, PUT , DELETE
    app.get  ('/',                         user.index); 
    app.post ('/login',                    user.login);  
    app.get  ('/usuario/create',           user.signUp);
    app.post ('/usuario',                  user.confirmSignUp);
    app.post ('/usuario/confirmRegister',  user.completeRegister);
}