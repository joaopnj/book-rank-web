//TABELA PARA CLIENTES.
$('#lista_cliente').ready(function (){
     //ROTA PARA BUSCAR OS DADOS DOS USUÁRIOS.
                $.ajax({
                     url:"/cliente/listcliente",
                     method:"get",
                     datatype: 'json',
                     success: function(data){
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
                            "sFirst":    "Primeiro",
                            "sPrevious": "Anterior",
                            "sNext":     "Próximo",
                            "sLast":     "Último"
                            }
                        } ,  
                       "bLengthChange": false,
                        responsive: true,
                        iDisplayLength: 10,
                       data : data,
                       //PREENCHE A TABELA COM OS DADOS BUSCADOS.
                        columns : [
                                {"data" : "nome"},
                                {"data" : "login"},  
                                {"data" : "cliente"},                              
                                {"data": "_id",
                                    "searchable": false,
                                    "orderable": false,
                                    'render': function(data){                            
                                        return '<a href="/cliente/show/'+data+'" title="Visualizar" class="icone" > <span class="glyphicon glyphicon-pencil" style="margin-left: 25px;"> Editar  </span></a>';
                                    }                
                                },             
                       
                            ],
                               
                            });
                           },
                           complete: function(){
                               $('#loadingUsuario').remove();
                           }
                          });
                                    
         });


//GERA A TABELA DE LISTA DE USUÁRIOS.
 $('#tableListaUser').ready(function (){
     //ROTA PARA BUSCAR OS DADOS DOS USUÁRIOS.
                $.ajax({
                     url:"/usuario/listauser",
                     method:"get",
                     datatype: 'json',
                     success: function(data){
                     $('#tableListaUser').dataTable({
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
                                "sFirst":    "Primeiro",
                                "sPrevious": "Anterior",
                                "sNext":     "Próximo",
                                "sLast":     "Último"
                            }
                        } ,  
                       data : data,
                       //PREENCHE A TABELA COM OS DADOS BUSCADOS.
                        columns : [
                                {"data" : "nome"},
                                {"data" : "sobrenome"},                                
                                {"data" : "cliente"},
                                {"data": "dispositivo"},
                                {"data": "_id",
                                "searchable": false,
                                "orderable": false,
                                'render': function(data){                            
                                    return '<a href="/usuario/editar/'+data+ '" class="icone"> <span class="glyphicon glyphicon-pencil">  Editar </span></a>';
                                }                
                                }
                    
                            ],
                               
                            });
                           },
                           complete: function(){
                               $('#loadingUsuario').remove();
                           }
                          });
                                    
         });
         

//FUNÇÃO QUE ATUALIZA A TABELA DE ACORDO COM OS DADOS DO MAPA. (TEM QUE SER CHAMADA ONDE OS MARKERS SÃO CRIADOS.)
function gerarTabela(data){

//ARMAZENA O CORPO DA TABELA NA VARIÁVEL (TABELA).
 var tabela = document.getElementById("tablealarmesbody");
 var tableLinhas = tabela.rows.length;

//APAGA OS DADOS PARA NÃO DUPLICAR OS DADOS DA TABELA
 for (var i = 0 ; i< tableLinhas; i++)
 {
     tabela.deleteRow(i);
     tableLinhas --;
     i--;
 }

 
//FUNÇÃO QUE PREENCHE A TABELA DE ACORDO COM OS DADOS RECEBIDOS.              
  $.each(data, function(index, value){ //(data).each(function(){    
    var staus;
    var adicionarAtendimento;
    if(value.status == 0){
        status = "Em Aberto";
        
    }else if(value.status == 1){
        status = "Em Atendimento";
    }else{
        status = "Atendido";
    }


      //CASO A PESQUISA SEJA FEITA PELO O USUÁRIO OU ESTEJA NA TELA PRINCIPAL PREENCHE:.
    if( value.userDispositivo[0] !== undefined){ 

        //Verifica se ja foi Atendido
        if( value.status == 0){    
            $('#tablealarmesbody').append('<tr><td> <a href="#"  title="Editar Usuario",   data-toggle="modal" data-target="#modalUsuario"  onclick=selPersona(\'' + JSON.stringify(value.userDispositivo[0],substitui)+ '\'); style="color:black">' + value.userDispositivo[0].nome +
            '</a></td><td>'+ value.dispositivo.nome +'</td><td>'+
            value.mensagem +'</td><td>'+value.data +' '+value.hora+'</td><td><a href= "#" data-toggle="modal" data-target="#modalAtendimento" onclick="startTime(\''+value.dispositivo.nome+'\',\''+value.mensagem  +'\',\''+ value._id+'\');" style="color:red">'+ status +'</a></td></tr>');
        }else{
            $('#tablealarmesbody').append('<tr><td> <a href="#"  title="Editar Usuario",   data-toggle="modal" data-target="#modalUsuario"  onclick=selPersona(\'' + JSON.stringify(value.userDispositivo[0],substitui)+ '\'); style="color:black">' + value.userDispositivo[0].nome +
            '</a></td><td>'+ value.dispositivo.nome +'</td><td>'+
            value.mensagem +'</td><td>'+value.data +' '+value.hora+'</td><td>'+ status +'</td></tr>');
        }
        
    }
    //CASO A PESQUISA NÃO SEJA FEITA PELO NOME DO USUÁRIO PREENCHE.
      else if(value.nome !== undefined){
                    
        if( value.status == 0){    
            $('#tablealarmesbody').append('<tr><td> <a href="#"  title="Editar Usuario",   data-toggle="modal" data-target="#modalUsuario"  onclick=selPersona(\'' + JSON.stringify(value.userDispositivo[0],substitui)+ '\'); style="color:black">' + value.userDispositivo[0].nome +
            '</a></td><td>'+ value.dispositivo.nome +'</td><td>'+
            value.mensagem +'</td><td>'+value.data +' '+value.hora+'</td><td><a href= "#" data-toggle="modal" data-target="#modalAtendimento" onclick="startTime(\''+value.dispositivo.nome+'\',\''+value.mensagem  +'\',\''+ value._id+'\');" style="color:red">'+ status +'</a></td></tr>');
        }else{
            $('#tablealarmesbody').append('<tr><td> <a href="#"  title="Editar Usuario",   data-toggle="modal" data-target="#modalUsuario"  onclick=selPersona(\'' + JSON.stringify(value.userDispositivo[0],substitui)+ '\'); style="color:black">' + value.userDispositivo[0].nome +
            '</a></td><td>'+ value.dispositivo.nome +'</td><td>'+
            value.mensagem +'</td><td>'+value.data +' '+value.hora+'</td><td>'+ status +'</td></tr>');
        }
      }
  
       //CASO NÃO TENHA USUÁRIO PREENCHE.
       else{
    
        $('#tablealarmesbody').append('<tr><td> Sem Usuário'+
         '</td><td>'+ value.dispositivo.nome +'</td><td>'+
         value.mensagem +'</td><td>'+value.data +' '+value.hora+'</td><td> Sem Usuario</td>  </tr>');
        
        }

    });
    
    //Evento de onClick nas linhas da tabela.
    $('#tablealarmesbody tr').on('click', function(){
        tableText(this);
    });

    function tableText(tableCell) {
        var hora =  tableCell.children[3].textContent.split(" ");
       
        //FUNÇÃO PARA O CLICK DA TABELA CASO ESTEJA USANDO O LEAFLET A FUNÇÃO USADA É A COM O 1.
        mostrarMarker(tableCell.children[1].textContent ,hora[1] ,tableCell.children[2].textContent );

    }
};




 //Função que gera a tabela de alarmes em atendimento e Em aberto.
 $('#tableListaAlarmes').ready(function (){
     //ROTA PARA BUSCAR OS DADOS DOS USUÁRIOS.
                $.ajax({
                     url:"/atendimento/emaberto",
                     method:"get",
                     datatype: 'json',
                     success: function(data){
                     $('#tableListaAlarmes').dataTable({
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
                                "sFirst":    "Primeiro",
                                "sPrevious": "Anterior",
                                "sNext":     "Próximo",
                                "sLast":     "Último"
                            }
                        } ,  
                       data : data,
                       //PREENCHE A TABELA COM OS DADOS BUSCADOS.
                        columns : [
                                {"data" : "userDispositivo[0].nome"},
                                {"data" : function(data,type,full){
                                    return data.data +" "+ data.hora;
                                }},                                
                                {"data" : "mensagem"},
                                {"data": "dispositivo.nome"},
                                {"data" : function(data,type,full){
                                    return '<a href="/atendimento/atender?id='+data._id+'" class="icone"> <span class="glyphicon glyphicon-pencil"> Atender </span></a>';
                                }}
                                                  
                            ],
                               
                            });
                           },
                           complete: function(){
                               $('#loadingUsuario').remove();
                           }
                          });
                                    
         });









//Função que gera a tabela de alarmes em atendimento e Em aberto.
 $('#tableListaAlarmesConcluidos').ready(function (){
     //ROTA PARA BUSCAR OS DADOS DOS USUÁRIOS.
                $.ajax({
                     url:"/atendimento/concluido",
                     method:"get",
                     datatype: 'json',
                     success: function(data){
                     $('#tableListaAlarmesConcluidos').dataTable({
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
                                "sFirst":    "Primeiro",
                                "sPrevious": "Anterior",
                                "sNext":     "Próximo",
                                "sLast":     "Último"
                            }
                        } ,  
                       data : data,
                       //PREENCHE A TABELA COM OS DADOS BUSCADOS.
                        columns : [
                                {"data" : "nome"},
                                {"data" : function(data){
                                    var agora = new Date(data.data).toISOString();
                                    var parteData = agora.split('-');
                                    var aux = parteData[2].split('T');
                                    var hora = aux[1].split('.');
                                    var novaData = aux[0] + "/" + parteData[1] +"/"+ parteData[0]; 
                                    return novaData +" " +hora[0];
                                }},                                
                                {"data" : "mensagem"},
                                {"data": "dispositivo"},
                                {"data" : function(data,type,full){
                                    return '<a href="/atendimento/show?identificador='+data._id+'" class="icone"> <span class="glyphicon glyphicon-eye-open"> Verificar </span></a>';
                                }}
                                // {"data": "userDispositivo[0]._id",
                                // "searchable": false,
                                // "orderable": false,
                                // 'render': function(data){                            
                                //     return '<a href="/atendimento/atender?id='+data+ '" class="icone"> <span class="glyphicon glyphicon-pencil"> Atender </span></a>';
                                // }                
                                // }
                    
                            ],
                               
                            });
                           },
                           complete: function(){
                               $('#loadingUsuario').remove();
                           }
                          });
                                    
         });

