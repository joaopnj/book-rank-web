module.exports = (app) => {
    var clientes = app.controllers.clientes;
    
    // methods de HTTP, GET, POST, PUT , DELETE
    app.get  ("/cliente", clientes.getClientByLoginAndPassword );
        
}