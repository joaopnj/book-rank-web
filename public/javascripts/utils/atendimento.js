
var clicks = 0;

 var contato1; 
 var contato2;
 var contato3;
 var contato4;
 var contato5;
 var btnShow;
 var tipoAlarme;
  var intervalo;
  var tempoGasto;

//Função que inicializa a contagem de tempo do atendimento.
//Pensar em uma maneira de diferenciar o temporizadores para atendimento diferente.
function startTime(nomeDispo, mensagem, idAlarme){


    // $.get('/atendimento/teste', atualizaTabela);

   
    $.post('/atendimento/incompleto?identificador='+idAlarme);

    tipoAlarme = mensagem;
    $.getJSON("/usuario/atender?dispositivo="+nomeDispo, preencherAtendimento);
    
    document.getElementById('tl_Atendimento_idAlarme').value = idAlarme; 
    tempoGasto = document.getElementById('tempoAtendimento');

    var hora = "0";
    var minutos = "0";
    var segundos = "0";
    
    intervalo =  setInterval(
        function crono(){


            segundos ++;
            if(segundos == 60){
                segundos = 0;
                minutos ++;
                
            }
            if(segundos < 10)
                segundos = "0"+ segundos


            if(minutos == 60){
                minutos = 0;
                hora ++;
            } 
            if(minutos.toString().length <= 1)
                minutos = "0"+minutos;

            
        tempoGasto.innerHTML = hora+ ":"+minutos + ":"+ segundos;

        },1000);

        
}

//Acaba com o Intervalo.
//

$(document).ready(function(){
     contato1 =  document.getElementById('dadosContato01');
     contato2 =  document.getElementById('dadosContato02');
     contato3 =  document.getElementById('dadosContato03');
     contato4 =  document.getElementById('dadosContato04');
     contato5 =  document.getElementById('dadosContato05');
    
    contato1.hidden = true;
    contato2.hidden = true;
    contato3.hidden = true;
    contato4.hidden = true;
    contato5.hidden = true;


                

    btnShow = document.getElementById('mostrarContatosPorVez');
    btnShow.onclick = showNextContato;
    
});

function showNextContato(){
    clicks++;

    switch(clicks){
        case 1:
        contato1.hidden = false;
        break;
        case 2:
        contato2.hidden = false;
        break;
        case 3:
        contato3.hidden = false;
        break;
        case 4:
        contato4.hidden = false;
        break;
        case 5:
        contato5.hidden = false;
        btnShow.style.display = 'none';
        break;
    }
}

//Modal prenchida
function preencherAtendimento (data,status){
    //console.log(status);
    document.getElementById('atend_dispositivo').value = data.dispositivo;
    document.getElementById('atend_nome').value = data.nome;
    document.getElementById('atend_sobrenome').value = data.sobrenome
    document.getElementById('tel_atend').value = data.telefone; 
    document.getElementById('tel_cel_atend').value = data.celular;
    document.getElementById('atend_observacao').value = AdicionarQuebraDeLinha(data.observacao); 

    //Contato1
    document.getElementById('atend_nome_contato1').value = data.Contato1.nome1;
    document.getElementById('atend_parentesco_contato1').value = data.Contato1.relacao1; 
    document.getElementById('atend_celular_contato1').value = data.Contato1.telefone1_celular; 
    document.getElementById('atend_telefone_contato1').value = data.Contato1.telefone1_residencial; 

    //contato2
    document.getElementById('atend_nome_contato2').value = data.Contato2.nome2;
    document.getElementById('atend_parentesco_contato2').value = data.Contato2.relacao2;
    document.getElementById('atend_celular_contato2').value = data.Contato2.telefone2_celular;
    document.getElementById('atend_telefone_contato2').value = data.Contato2.telefone2_residencial;

    //contato3
    document.getElementById('atend_nome_contato3').value = data.Contato3.nome3;
    document.getElementById('atend_parentesco_contato3').value = data.Contato3.relacao3;
    document.getElementById('atend_celular_contato3').value = data.Contato3.telefone3_celular;
    document.getElementById('atend_telefone_contato3').value = data.Contato3.telefone3_residencial;
    
    //contato4
    document.getElementById('atend_nome_contato4').value = data.Contato4.nome4;
    document.getElementById('atend_parentesco_contato4').value = data.Contato4.relacao4;
    document.getElementById('atend_celular_contato4').value = data.Contato4.telefone4_celular;
    document.getElementById('atend_telefone_contato4').value = data.Contato4.telefone4_residencial;

    //contato5
    document.getElementById('atend_nome_contato5').value = data.Contato5.nome5;
    document.getElementById('atend_parentesco_contato5').value = data.Contato5.relacao5;
    document.getElementById('atend_celular_contato5').value = data.Contato5.telefone5_celular;
    document.getElementById('atend_telefone_contato5').value=  data.Contato5.telefone5_residencial;

    //Dados Medicos
    document.getElementById('atend_medico').value = data.Medico.nome_medico;
    document.getElementById('telConsultorio_atend').value = data.Medico.tel_consultorio;
    document.getElementById('telMedicoResidencial_atend').value = data.Medico.tel_residencial;
    document.getElementById('celMedico_atend').value = data.Medico.celular_medico;

    document.getElementById('hospitalPreferencia_atend').value = data.Medico.hospital_preferencia;
    document.getElementById('modalTelefoneHospital_atend').value = data.Medico.tel_hospital;
    document.getElementById('planoSaude_atend').value = data.Medico.plano_saude;
    document.getElementById('telefonePlano_atend').value = data.Medico.plano_telefone;

    //Historico Medico
    document.getElementById('atend_visao').checked = data.HistoricoMedico.visao;
    document.getElementById('atend_audicao').checked = data.HistoricoMedico.audicao;
    document.getElementById('atend_fala').checked = data.HistoricoMedico.fala;
    document.getElementById('atend_respiracao').checked = data.HistoricoMedico.respiracao;
    document.getElementById('atend_coracao').checked = data.HistoricoMedico.coracao;
    document.getElementById('atend_pressao').checked = data.HistoricoMedico.pressao;
    document.getElementById('atend_diabete').checked = data.HistoricoMedico.diabete;
    document.getElementById('atend_artrite').checked = data.HistoricoMedico.artrite;
    document.getElementById('atend_derrame').checked = data.HistoricoMedico.derrame;
    document.getElementById('atend_riscoQueda').checked = data.HistoricoMedico.riscoQueda;
    document.getElementById('atend_outro').value = data.HistoricoMedico.outro;
    document.getElementById('atend_medicamentoEmUso').value = AdicionarQuebraDeLinha(data.medicamento_em_uso);
    document.getElementById('atend_alergia').value = AdicionarQuebraDeLinha(data.alergia);
    document.getElementById('atend_instruEspeciais').value = AdicionarQuebraDeLinha(data.instrucoes_especiais);

}

function pararCronometro(){
    clearInterval(intervalo);
}

//Muda o Status do alarme e cria o atendimento no Banco 
function finalizarAtendimento(){
   
   $.post('/atendimento/completo?identificador='+document.getElementById('tl_Atendimento_idAlarme').value );
   
    pararCronometro();

    var atendimento = {

        nome : document.getElementById('atend_nome').value,
        sobrenome : document.getElementById('atend_sobrenome').value,
        dispositivo : document.getElementById('atend_dispositivo').value,
        atendente : document.getElementById('tlAtendimentoAtendente').innerText,
        data : new Date(),
        tempo_gasto: document.getElementById('tempoAtendimento').innerText,        
        mensagem: tipoAlarme,
        identificadorAlarme: document.getElementById('tl_Atendimento_idAlarme').value,
        
    }

    var stringAtendimento = JSON.stringify(atendimento);
   

  $('#formAtendimento').attr('action','/atendimento/registrar?dados='+ stringAtendimento);
  $('#formAtendimento').submit();


  
}




function terminarAtendimento(){


 $.post('/atendimento/completo?identificador='+document.getElementById('tl_atender_id_alarme').value);

  var atendimento = {

        nome : document.getElementById('tl_atender_nome').value,
        sobrenome : document.getElementById('tl_atender_sobrenome').value,
        dispositivo : document.getElementById('tl_atender_dispositivo').value,
        //atendente : document.getElementById('tlAtendimentoAtendente').innerText,
        data : new Date(),        
        situacao: 1,
        mensagem: document.getElementById('tl_atender_mensagem').value,
        identificadorAlarme: document.getElementById('tl_atender_id_alarme').value,
        
    }

    var stringAtendimento = JSON.stringify(atendimento);

   // $.post('/atendimento/completo?identificador='+document.getElementById('tl_atender_id_alarme').value);

    $('#tl_atender_formulario').attr('action','/atendimento/terminar?dados='+stringAtendimento);
    $('#tl_atender_formulario').submit();


}



//atualiza status do atendimento.
// function manterAtendimento(){
  
  
// //   $.get('/principal', function(data, status){
// //       InitMap(data);
// //   });


//   $.post('/atendimento/naofinalizado')
  
// }




//Botao mostrar e econder
$(document).ready(function () {

$('#tl_atender_mostrarBotoes').hide();    

$('#tabela_contatos_atendimento').hide();
$('#atendimento_dadosMedicos').hide();

    //Esconde e mostrar os Contatos do Usuario.
    $("#btn_mostrarContatos").on("click", function(){
        if($("#btn_mostrarContatos").text()  != 'Esconder contatos' ){
            $('#tabela_contatos_atendimento').show();
            $("#btn_mostrarContatos").text('Esconder contatos');
        }else{
            $('#tabela_contatos_atendimento').hide();
            $("#btn_mostrarContatos").text('Mostrar contatos');
        }
    });


    //Esconde e mostrar os Dados Medicos
     $("#mostrarDadosMedicos").on("click", function(){
        if($("#mostrarDadosMedicos").text()  != 'Esconder Dados Medicos' ){
            $('#atendimento_dadosMedicos').show();
            $("#mostrarDadosMedicos").text('Esconder Dados Medicos');
        }else{
            $('#atendimento_dadosMedicos').hide();
            $("#mostrarDadosMedicos").text('Mostrar contatos');
        }
    });

    $("#btn_atender_dadosUsuario").on("click", function(){
        $('#tl_atender_mostrarBotoes').show();
        $("#btn_atender_dadosUsuario").hide();    
   
    });


    //Implementação do socket para atualizar tabela de todos.

    var socket = io();
    socket.on('estaAtendendo',function(data){
            $.get('/atendimento/atualizatabela',atualizaTabela);
    });

});


//Prencimento da tela de Atendimento.
function preencherAtendimentoEmAberto(dado){
    var data = JSON.parse(dado);
        
    //document.getElementById('tl_atender_id_atendimento').value = data._id;
    document.getElementById('tl_atender_dispositivo').value = data[0].dispositivo.nome;
    document.getElementById('tl_atender_nome').value = data[0].userDispositivo[0].nome;
    document.getElementById('tl_atender_sobrenome').value = data[0].userDispositivo[0].sobrenome
    document.getElementById('tl_atender_mensagem').value = data[0].mensagem;
    document.getElementById('tl_atender_id_alarme').value = data[0]._id;
    
//}



//function preencherDadosUsuarioAtendimento(data, status){

    document.getElementById('tl_atender_telefone').value = data[0].userDispositivo[0].telefone; 
    document.getElementById('tl_atender_celular').value = data[0].userDispositivo[0].celular;

     // //Contato1
     document.getElementById('tl_atender_contato1_nome').value = data[0].userDispositivo[0].Contato1.nome1;
     document.getElementById('tl_atender_contato1_relacao').value = data[0].userDispositivo[0].Contato1.relacao1; 
     document.getElementById('tl_atender_contato1_celular').value = data[0].userDispositivo[0].Contato1.telefone1_celular; 
     document.getElementById('tl_atender_contato1_comercial').value = data[0].userDispositivo[0].Contato1.telefone1_residencial; 

    // //contato2
    document.getElementById('tl_atender_contato2_nome').value = data[0].userDispositivo[0].Contato2.nome2;
    document.getElementById('tl_atender_contato2_relacao').value = data[0].userDispositivo[0].Contato2.relacao2;
    document.getElementById('tl_atender_contato2_celular').value = data[0].userDispositivo[0].Contato2.telefone2_celular;
    document.getElementById('tl_atender_contato2_residencia').value = data[0].userDispositivo[0].Contato2.telefone2_residencial;

    // //contato3
    document.getElementById('tl_atender_contato3_nome').value = data[0].userDispositivo[0].Contato3.nome3;
    document.getElementById('tl_atender_contato3_relacao').value = data[0].userDispositivo[0].Contato3.relacao3;
    document.getElementById('tl_atender_contato3_celular').value = data[0].userDispositivo[0].Contato3.telefone3_celular;
    document.getElementById('tl_atender_contato3_residencia').value = data[0].userDispositivo[0].Contato3.telefone3_residencial;
    
    // //contato4
    document.getElementById('tl_atender_contato4_nome').value = data[0].userDispositivo[0].Contato4.nome4;
    document.getElementById('tl_atender_contato4_relacao').value = data[0].userDispositivo[0].Contato4.relacao4;
    document.getElementById('tl_atender_contato4_celular').value = data[0].userDispositivo[0].Contato4.telefone4_celular;
    document.getElementById('tl_atender_contato4_residencia').value = data[0].userDispositivo[0].Contato4.telefone4_residencial;

    // //contato5
    document.getElementById('tl_atender_contato5_nome').value = data[0].userDispositivo[0].Contato5.nome5;
    document.getElementById('tl_atender_contato5_relacao').value = data[0].userDispositivo[0].Contato5.relacao5;
    document.getElementById('tl_atender_contato5_celular').value = data[0].userDispositivo[0].Contato5.telefone5_celular;
    document.getElementById('tl_atender_contato5_comercial').value=  data[0].userDispositivo[0].Contato5.telefone5_residencial;

    // //Dados Medicos
     document.getElementById('tl_atender_medico_nome').value = data[0].userDispositivo[0].Medico.nome_medico;
     document.getElementById('tl_atender_telconsultorio').value = data[0].userDispositivo[0].Medico.tel_consultorio;
     document.getElementById('tl_atender_telresidencial').value = data[0].userDispositivo[0].Medico.tel_residencial;
     document.getElementById('tl_atender_medico_celular').value = data[0].userDispositivo[0].Medico.celular_medico;

     document.getElementById('tl_atender_hospital_preferencia').value = data[0].userDispositivo[0].Medico.hospital_preferencia;
     document.getElementById('tl_atender_hospital_telefone').value = data[0].userDispositivo[0].Medico.tel_hospital;
     document.getElementById('tl_atender_plano_saude').value = data[0].userDispositivo[0].Medico.plano_saude;
     document.getElementById('tl_atender_plano_telefone').value = data[0].userDispositivo[0].Medico.plano_telefone;

    // //Historico Medico
    document.getElementById('tl_atender_visao').checked = data[0].userDispositivo[0].HistoricoMedico.visao;
    document.getElementById('tl_atender_audicao').checked = data[0].userDispositivo[0].HistoricoMedico.audicao;
    document.getElementById('ftl_atender_fala').checked = data[0].userDispositivo[0].HistoricoMedico.fala;
    document.getElementById('tl_atender_respiracao').checked = data[0].userDispositivo[0].HistoricoMedico.respiracao;
    document.getElementById('tl_atender_coracao').checked = data[0].userDispositivo[0].HistoricoMedico.coracao;
    document.getElementById('tl_atender_pressao').checked = data[0].userDispositivo[0].HistoricoMedico.pressao;
    document.getElementById('tl_atender_diabete').checked = data[0].userDispositivo[0].HistoricoMedico.diabete;
    document.getElementById('tl_atender_artrite').checked = data[0].userDispositivo[0].HistoricoMedico.artrite;
    document.getElementById('tl_atender_derrame').checked = data[0].userDispositivo[0].HistoricoMedico.derrame;
    document.getElementById('tl_atender_riscoQueda').checked = data[0].userDispositivo[0].HistoricoMedico.riscoQueda;
    document.getElementById('tl_atender_observacao').value = AdicionarQuebraDeLinha(data[0].userDispositivo[0].observacao);
    document.getElementById('tl_atender_medicamentoEmUso').value = AdicionarQuebraDeLinha(data[0].userDispositivo[0].medicamento_em_uso);
    document.getElementById('tl_atender_alergia').value = AdicionarQuebraDeLinha(data[0].userDispositivo[0].alergia);
    document.getElementById('tl_atender_instruEspeciais').value =  AdicionarQuebraDeLinha(data[0].userDispositivo[0].instrucoes_especiais);
    document.getElementById('tl_atender_outro').value = data[0].userDispositivo[0].HistoricoMedico.outro;
}


function preencherAtendimentoConcluido(parametro){

    var dados = JSON.parse(parametro);
    //document.getElementById('tl_show_nome').value = dados.nome;

    $('#tl_show_nome').val(dados[0].nome);
    $('#tl_show_dispositivo').val(dados[0].dispositivo);
    $('#tl_show_mensagem').val(dados[0].mensagem);
    $('#tl_show_atendente').val(dados[0].atendente);
    $('#tl_show_tempo').val(dados[0].tempo_gasto);
    $('#tl_show_data').val(formataDataHora(dados[0].data));
    $('#tl_show_ocorrido').val( AdicionarQuebraDeLinha(dados[0].motivo));



    
}



function atualizaTabela(data,status){
       //var teste = JSON.parse(data);
      gerarTabela(data);
}


function formataDataHora(data){
     
      var agora = new Date(data).toISOString();
      var parteData = agora.split('-');
      var aux = parteData[2].split('T');
      var hora = aux[1].split('.');
      var novaData = aux[0] + "/" + parteData[1] +"/"+ parteData[0]; 
      
      return novaData +" " +hora[0];
}


