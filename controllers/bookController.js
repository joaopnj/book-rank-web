module.exports = (app) => {
    
    var Livro        = app.models.livro;

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

        findByName: (req, res) => {
            Livro.findOne({'nome': req.query.book}, (err, livro) => {
                if(err) res.status(400).send("Erro ao achar o livro");
                return !livro ? res.send(400, "Não existe livros para essa disciplina no momento") : res.json(livro);
            });
        },

        listByDisciplina: (req, res) => {
            let disciplinaObj = req.query.disciplina.trim();
            Livro.find({'disciplina' : disciplinaObj}, (err, data) => {
                console.log(data);
                if(err) res.status(400).send("Erro ao achar o livro");
                return !data ? res.send(400, "Não existe livros para essa disciplina no momento") : res.json(data);
            });
        }

    }

    return BooksController;
}