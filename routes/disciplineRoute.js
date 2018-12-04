module.exports = (app) => {
    const disciplina = app.controllers.disciplineController;
    
    // methods de HTTP, GET, POST, PUT , DELETE
    app.get ('/disciplinasbyaluno',    disciplina.disciplinasByAluno);
    app.get ('/disciplinasbycurso',    disciplina.disciplinasByCurso);
    app.post('/disciplinaaluno',       disciplina.associateDisciplinaAluno);
    app.post('/disciplinasprofessor',  disciplina.associateDisciplinaProfessor);
    app.get ('disciplinasbyprofessor', disciplina.disciplinasByProfessor);
}