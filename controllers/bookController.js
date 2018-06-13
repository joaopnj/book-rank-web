module.exports = (app) => {
    
    var Livro        = app.models.livros;

    var BooksController = {

        createLivro: (req, res) => {
            let livro = new Livro();
            livro.nome = req.body.nome;
            livro.descricao = req.body.descricao;
            livro.autor = req.body.autor;
            livro.editora = req.body.editora;
            livro.disciplina = req.body.disciplina;
            livro.save( (err) => {
                return res.json(livro);
            });
        },

        listByDisciplina: (req, res) => {
            Livro.find({disciplina : req.query.disciplina}, (err, livros) => {
                if(err) res.status(400).send("Erro ao achar o livro");
                return !livros ? res.send(400, "Não existe livros para essa disciplina no momento") : res.json(livros);
            });
        }

    }

    return BooksController;
}