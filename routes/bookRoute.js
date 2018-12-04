module.exports = (app) => {
    const livro = app.controllers.bookController;
    
    // methods de HTTP, GET, POST, PUT , DELETE
    app.get ('/livrosbydisciplina',    livro.listByDisciplina);
    app.post('/createbook',            livro.createBook);
    app.get ('/findlivrobyname',       livro.findByName);
}