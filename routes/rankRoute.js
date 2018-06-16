module.exports = (app) => {
    const rank = app.controllers.rankController;
    
    // methods de HTTP, GET, POST, PUT , DELETE
    app.post ('/createrank',    rank.createRank);
}