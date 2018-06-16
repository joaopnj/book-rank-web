module.exports = (app) => {

    var Rank = app.models.rank;
    var Livro = app.models.livro;
    var average = require('average');


    var RankController = {
        createRank: (req, res) => {
            Livro.findOne({"nome" : req.body.book.nome }, (err, book) => {
                if (err) console.log(err);
            
                let rank = new Rank();
                let result = [];
                rank.book = req.body.book;
                rank.descricao = req.body.descricao;
                rank.nota = req.body.rank;
                rank.aluno = req.body.aluno;
                result.push(Number.parseFloat(req.body.rank));
                rank.save((err) => {
                    if (err) res.status(400).send('Erro ao salvar! ');
                    Rank.find({ "book.nome": book.nome }, (ranks) => {
                        if(ranks) {
                            ranks.forEach(theRank => {
                                result.push(theRank.nota);
                            });
                        }
                        book.media = average(result);
                        book.save((err) => {
                            return err ? res.status(400).send('Erro ao salvar! ') : res.json(rank);
                        });
                    });
                });
            });
        },
    }

    return RankController;
}