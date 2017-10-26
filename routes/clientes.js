module.exports = (app) => {
    var clientes = app.controllers.clientes;
    
    // methods de HTTP, GET, POST, PUT , DELETE
    app.get ("/cliente",                 clientes.getClientByLoginAndPassword );
    app.get ("/cliente/verifyDevice",    clientes.isDeviceAssociated);
    app.post("/cliente/getAdress",       clientes.getAdressFromClient);
        
}