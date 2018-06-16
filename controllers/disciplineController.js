module.exports = (app) => {

    var Disciplina = app.models.disciplina;
    var Disciplina_Aluno = app.models.disciplinaaluno;


    var DisciplineController = {

        disciplinasByAluno: (req, res) => {
            Disciplina_Aluno.find({ 'aluno.login': req.query.user }, (err, disciplinas_aluno) => {
                if (err) res.send(400).send('Erro ao recuperar disciplinas por aluno');
                let response = [];
                for (let i = 0; i < disciplinas_aluno.length; i++) {
                    response.push(disciplinas_aluno[i]);
                }
                res.json(response);
            });
        },

        disciplinasByCurso: (req, res) => {
            Disciplina.find({ curso: req.query.curso }, (err, disciplinas) => {
                if (err) res.send(400).send("Erro no banco!");
                !disciplinas ? res.send(400).send("O curso não tem disciplinas") : res.json(disciplinas);
            });
        },

        associateDisciplinaAluno: (req, res) => {
            let disciplinas = req.body.disciplinas;
            let aluno = req.body.aluno;

            let newDisciplinaAluno = new Disciplina_Aluno();
            for (let i = 0; i < disciplinas.length; i++) {
                newDisciplinaAluno.aluno = aluno;
                newDisciplinaAluno.disciplina = disciplinas[i];
                newDisciplinaAluno.save((err) => {
                    if(err) res.send(400).send("Erro ao associar!");
                });
            }
            res.json(newDisciplinaAluno);
        },

        associateDisciplinaProfessor: (req, res) => {
            let disciplinas = req.body.disciplinas;
            let professor = req.body.aluno;
            for (let i = 0; i < disciplinas.length; i++) {
                Disciplina.findOne({nome : disciplinas[i]}, (disciplina, err) =>{
                    if (err) res.send(400).send('Erro ao associar disciplinas com professor');
                    if (disciplina.professor === disciplinas[i].professor || disciplina.professor) {
                        res.send(400).send('Erro ao associar disciplinas com professor');
                    }
                    if (!disciplina.professor) {
                        disciplina.professor = professor;
                        disciplinas.save((err) => {
                            if(err) res.send(400).send("Erro ao associar!");
                        });
                    }
                });
            }
            res.json(disciplinas);
        }

    }

    return DisciplineController;
}