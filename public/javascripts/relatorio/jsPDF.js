function initPDF(lista){

    if(lista.length >= 1000) { return alertify.alert("","O PDF não pode ser gerado, por ter 1000 ou mais registros! "); }

    var posicaoX = 60;
    var posicaoTitulo = 50;
    var posicaoY = 40;

    var img = new Image();
    img.src = '/images/adaPapelTimbrado1.png';
    img.addEventListener('load', function() {
       var doc = new jsPDF('p','mm','a4');
       var width = doc.internal.pageSize.width;    
       var height = doc.internal.pageSize.height;
       console.log(doc.getFontList());

    //    lista = JSON.parse(lista);
       doc.setFontSize(10);
       doc.setFont('Helvetica');
       
       var columns = [
            {title: "NOME", dataKey: "nome"},
            {title: "DISPOSITIVO", dataKey: "dispositivo"}, 
            {title: "MENSAGEM", dataKey: "mensagem"},
            {title: "DATA", dataKey: "data"}, 
            {title: "HORA", dataKey: "hora"},
        ];
        var rows = [];
        var nomeUsuario;
        for (var i = 0; i < lista.length; i++) {
            lista[i].userDispositivo[0] == undefined ? nomeUsuario = " "  : nomeUsuario = lista[i].userDispositivo[0].nome;
            rows.push({
                    'nome': nomeUsuario,
                    'dispositivo': lista[i].dispositivo.nome,
                    'mensagem': lista[i].mensagem,
                    'data' : lista[i].data,
                    'hora' : lista[i].hora
            });
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
                doc.setFontSize(35);
                doc.text("Relatório de mensagens", 40, 30);
            }
        });
       doc.output('dataurlnewwindow');
   });

//    img.src = 'images/adaPapelTimbrado1.png';
    // doc.save('Test.pdf');
}