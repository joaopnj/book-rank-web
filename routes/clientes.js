module.exports = (app) => {
    var clientes = app.controllers.clientes;
    
    // methods de HTTP, GET, POST, PUT , DELETE
    app.post  ("/cliente", clientes.index);
        
}