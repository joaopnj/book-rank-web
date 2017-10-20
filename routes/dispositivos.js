module.exports = (app) => {
    var dispositivos = app.controllers.dispositivos;

    // methods de HTTP, GET, POST, PUT , DELETE
    app.post ("/dipositivos", dispositivos.insertDevice );
    
}