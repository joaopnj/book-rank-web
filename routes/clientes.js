module.exports = (app) => {
    var clientes = app.controllers.clientes;
    
    // methods de HTTP, GET, POST, PUT , DELETE
    app.get ("/cliente",                 clientes.getClientByLoginAndPassword );
    app.get ("/cliente/verifyDevice",    clientes.isDeviceAssociated);
    app.get ("/cliente/getAdress",       clientes.getAdressFromClient);
        
}