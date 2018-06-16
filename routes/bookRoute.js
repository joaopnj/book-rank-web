module.exports = (app) => {
    const livro = app.controllers.bookController;
    
    // methods de HTTP, GET, POST, PUT , DELETE
    app.get ('/livrosbydisciplina',    livro.listByDisciplina);
    app.post('/createivro',            livro.createLivro);
    app.get ('/findlivrobyname',       livro.findByName);
}