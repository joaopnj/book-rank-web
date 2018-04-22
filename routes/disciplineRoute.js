module.exports = (app) => {
    const user = app.controllers.userController;
    
    // methods de HTTP, GET, POST, PUT , DELETE
    app.get ('/',               user.index);
}