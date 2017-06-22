function initPDF(lista){
    var posicaoX = 60;
    var posicaoTitulo = 50;
    var posicaoY = 40;

    var img = new Image();
    
    img.addEventListener('load', function() {
       var doc = new jsPDF('p','mm','a4');
       var width = doc.internal.pageSize.width;    
       var height = doc.internal.pageSize.height;
       console.log(doc.getFontList());

       lista = JSON.parse(lista);

       var columns = [
            {title: "Nome", dataKey: "nome"},
            {title: "Login", dataKey: "login"}, 
            {title: "Senha", dataKey: "senha"}
        ];
        var rows = [];
        for (var i = 0; i < lista.length; i++) {
            rows.push({'nome': lista[i].nome, 'login': lista[i].login, 'senha': lista[i].senha });
        }
        doc.autoTable(columns, rows, {
            styles: {fillColor: [60, 60, 60]},
            theme : 'grid',
            columnStyles: { id: {fillColor: [255, 255, 255]}},
            bodyStyles: { fillColor: [255,255,255]},
            margin: {top: 45},
            pageBreak: 'auto',
            addPageContent: function(data) {
                doc.addImage(img, 'png', 0, 0, width, height);
                doc.setFontSize(12);
                doc.setFont('Helvetica');
                doc.setFontSize(35);
                doc.text("Relatório de mensagens", 40, 30);
            }
        });
       doc.output('dataurlnewwindow');
    });

    img.src = '../imagens/adaPapelTimrbado.png';
    // doc.save('Test.pdf');
}