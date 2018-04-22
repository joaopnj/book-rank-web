//TABELA PARA CLIENTES.
$('#lista_cliente').ready(function () {
    //ROTA PARA BUSCAR OS DADOS DOS USUÁRIOS.
    $.ajax({
        url: "/cliente/listcliente",
        method: "get",
        datatype: 'json',
        success: function (data) {
            $('#lista_cliente').dataTable({
                //COLOCA OS DADOS EM PORTUGUÊS.
                "oLanguage": {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sProcessing": "Aguarde enquanto os dados são carregados ...",
                    "sLengthMenu": "Mostrar _MENU_ registros por pagina",
                    "sZeroRecords": "Nenhum registro correspondente encontrado",
                    "sInfoEmtpy": "Exibindo 0 a 0 de 0 registros",
                    "sInfo": "Exibindo de _START_ a _END_ de _TOTAL_ registros",
                    "sInfoFiltered": "",
                    "sSearch": "Procurar",
                    "oPaginate": {
                        "sFirst": "Primeiro",
                        "sPrevious": "Anterior",
                        "sNext": "Próximo",
                        "sLast": "Último"
                    }
                },
                "bLengthChange": false,
                responsive: true,
                iDisplayLength: 10,
                data: data,
                //PREENCHE A TABELA COM OS DADOS BUSCADOS.
                columns: [
                    { "data": "nome" },
                    { "data": "login" },
                    { "data": "cliente" },
                    {
                        "data": "_id",
                        "searchable": false,
                        "orderable": false,
                        'render': function (data) {
                            console.log("cliente");
                            return '<a href="/cliente/show/' + data + '" title="Visualizar" class="icone" > <span class="glyphicon glyphicon-pencil" style="margin-left: 25px;"> Editar  </span></a>';
                        }
                    },

                ],

            });
        },
        complete: function () {
            $('#loadingUsuario').remove();
        }
    });

});

var tabelaUsuario;
//GERA A TABELA DE LISTA DE USUÁRIOS.
$('#tableListaUser').ready(function () {
    
    //ROTA PARA BUSCAR OS DADOS DOS USUÁRIOS.
    $.ajax({
        url: "/usuario/listauser",
        method: "get",
        datatype: 'json',
        success: function (data) {
        tabelaUsuario = $('#tableListaUser').dataTable({
                "pageLength": 10,
                "responsive": true,
                "bLengthChange": false,
                //COLOCA OS DADOS EM PORTUGUÊS.
                "oLanguage": {
                    "sProcessing": "Aguarde enquanto os dados são carregados ...",
                    "sLengthMenu": "Mostrar _MENU_ registros por pagina",
                    "sZeroRecords": "Nenhum registro correspondente encontrado",
                    "sInfoEmtpy": "Exibindo 0 a 0 de 0 registros",
                    "sInfo": "Exibindo de _START_ a _END_ de _TOTAL_ registros",
                    "sInfoFiltered": "",
                    "sSearch": "Procurar",
                    "oPaginate": {
                        "sFirst": "Primeiro",
                        "sPrevious": "Anterior",
                        "sNext": "Próximo",
                        "sLast": "Último"
                    }
                },
                data: data,
                //PREENCHE A TABELA COM OS DADOS BUSCADOS.
                columns: [
                    { "data": "nome" },
                    { "data": "sobrenome" },
                    { "data": "cliente" },
                    { "data": "dispositivo" },
                    {
                        "data": "_id",
                        "searchable": false,
                        "orderable": false,
                        'render': function (data) {
                            return '<a href="/usuario/editar/' + data + '" class="icone"> <span class="glyphicon glyphicon-pencil">  Editar </span></a>';
                        }
                    }

                ],

            });
        },
        complete: function () {
            $('#loadingUsuario').remove();
        }
    });

});


//FUNÇÃO QUE ATUALIZA A TABELA DE ACORDO COM OS DADOS DO MAPA. (TEM QUE SER CHAMADA ONDE OS MARKERS SÃO CRIADOS.)
function gerarTabela(data) {

    //ARMAZENA O CORPO DA TABELA NA VARIÁVEL (TABELA).
    var tabela = document.getElementById("tablealarmesbody");
    var tableLinhas = tabela.rows.length;

    //APAGA OS DADOS PARA NÃO DUPLICAR OS DADOS DA TABELA
    for (var i = 0; i < tableLinhas; i++) {
        tabela.deleteRow(i);
        tableLinhas--;
        i--;
    }


    //FUNÇÃO QUE PREENCHE A TABELA DE ACORDO COM OS DADOS RECEBIDOS.              
    $.each(data, function (index, value) { //(data).each(function(){    

        //CASO A PESQUISA SEJA FEITA PELO O USUÁRIO OU ESTEJA NA TELA PRINCIPAL PREENCHE:.
        if (value.userDispositivo[0] !== undefined) {

            $('#tablealarmesbody').append('<tr><td> <a href="#"  title="Editar Usuario",   data-toggle="modal" data-target="#modalUsuario"  onclick=selPersona(\'' + JSON.stringify(value.userDispositivo[0], substitui) + '\'); style="color:black">' + value.userDispositivo[0].nome +
                '</a></td><td>' + value.dispositivo.nome + "</td><td>" +
                value.mensagem + "</td><td>" + value.data + ' ' + value.hora + "</td> </tr>");


        }
        //CASO A PESQUISA NÃO SEJA FEITA PELO NOME DO USUÁRIO PREENCHE.
        else if (value.nome !== undefined) {

            $('#tablealarmesbody').append('<tr><td><a href="#"  title="Editar Usuario",   data-toggle="modal" data-target="#modalUsuario"  onclick=selPersona(\'' + JSON.stringify(value.user[0], substitui) + '\'); style="color:black">' + value.nome[0] +
                "</td><td>" + value.dispositivo.nome + "</td><td>" +
                value.mensagem + "</td><td>" + value.data + ' ' + value.hora + "</td> </tr>");

        }

        //CASO NÃO TENHA USUÁRIO PREENCHE.
        else {

            $('#tablealarmesbody').append("<tr><td> Sem Usuário" +
                "</td><td>" + value.dispositivo.nome + "</td><td>" +
                value.mensagem + "</td><td>" + value.data + ' ' + value.hora + "</td> </tr>");

        }

    });


    $('#tablealarmesbody tr').on('click', function () {
        tableText(this);
    });

    function tableText(tableCell) {
        var hora = tableCell.children[3].textContent.split(" ");

        //FUNÇÃO PARA O CLICK DA TABELA CASO ESTEJA USANDO O LEAFLET A FUNÇÃO USADA É A COM O 1.
        mostrarMarker(tableCell.children[1].textContent, hora[1], tableCell.children[2].textContent, data);

    }
}
