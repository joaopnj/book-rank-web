var temAlteracao = false;
//FUNÇÃO PRA PREENCHER A TELA DE EDITAR DADOS, COM DADOS DO BANCO, É UTILIZADO O ID DO USUÁRIO.
function editarDados (item){
    
  var dados = JSON.parse(item);

  document.getElementById('Tl_editarUsuario_id_Usuario').value = dados._id;
  document.getElementById('editarDispositivoUser').value = dados.dispositivo;

//CONDIÇÃO QUE SO VERIFICA SE O CLIENTE É LIFE LINK OU ATHENE.
if(document.getElementById('podeEditarDispositivo').value == 'LIFELINK' || document.getElementById('podeEditarDispositivo').value == 'ATHENE'){
     document.getElementById('editarDispositivoUser').disabled = false;
  }

  //VERIFICA SE O CAMPO EXISTE, POIS NEM TODOS OS CLIENTES POSSUEM ESSE CAMPO.
 if(document.getElementById('identificadorClienteEditar') !== null){
        document.getElementById('identificadorClienteEditar').value = dados.cliente;
        clienteParaCombo = dados.cliente;
    }

  document.getElementById('tl_editar_identificador_usuario').value = dados.cliente;
  
  
  document.getElementById('editarNomeUsuario').value = dados.nome;
  document.getElementById('editarSobrenomeUsuario').value = dados.sobrenome;
  //document.getElementById('editarMatricula').value = dados.matricula;
  document.getElementById('editarUsuarioResidencia').value = dados.telefone;
  document.getElementById('editarUserCelular').value = dados.celular;
  document.getElementById('editarCPF').value = dados.cpf;
  document.getElementById('editardatanascimento').value = dados.data_nascimento;
  document.getElementById('editarRua').value = dados.Endereco.rua;
  document.getElementById('editarNumeroEndereco').value = dados.Endereco.numero;
  document.getElementById('editarBairro').value = dados.Endereco.bairro;
  document.getElementById('editarCidade').value = dados.Endereco.cidade;
  document.getElementById('editarComplemento').value = dados.Endereco.complemento;
  document.getElementById('editarCep').value = dados.Endereco.cep;
  document.getElementById('editarUf').value = dados.Endereco.uf;
  document.getElementById('editarPontodeReferencia').value = dados.Endereco.ponto_referencia;
  document.getElementById('editarPeso').value = dados.peso;
  document.getElementById('editarSexo').value = dados.sexo;
  document.getElementById('editarAltura').value = dados.altura;
  document.getElementById('editarTipoSanguineo').value = dados.tipo_sanguineo;
  document.getElementById('editarMedico').value = dados.Medico.nome_medico;
  document.getElementById('editartelconsultorio').value = dados.Medico.tel_consultorio;
  document.getElementById('editarTelResidenciaMedico').value = dados.Medico.tel_residencial;
  document.getElementById('editarMedicoCelular').value = dados.Medico.celular_medico;
  document.getElementById('editartelefoneHospital').value = dados.Medico.tel_hospital;
  document.getElementById('editarHospitalPreferencia').value = dados.Medico.hospital_preferencia;
  document.getElementById('editarPlano').value = dados.Medico.plano_saude;
  document.getElementById('editarIdentiPlano').value = dados.Medico.plano_identi;
  document.getElementById('editartelefonePlano').value = dados.Medico.plano_telefone;

  document.getElementById('editarContato1Nome1').value = dados.Contato1.nome1;
  document.getElementById('editarChave1').checked = dados.Contato1.chaves1;
  document.getElementById('editarRelacao1').value = dados.Contato1.relacao1;
  document.getElementById('editartelResidencia1').value = dados.Contato1.telefone1_residencial;
  document.getElementById('editartelComercial1').value = dados.Contato1.telefone1_comercial;
  document.getElementById('editartelCelular1').value = dados.Contato1.telefone1_celular;

  document.getElementById('editarNome2').value = dados.Contato2.nome2;
  document.getElementById('editarChave2').checked = dados.Contato2.chaves2;
  document.getElementById('editarRelacao2').value = dados.Contato2.relacao2;
  document.getElementById('editartelResidencia2').value = dados.Contato2.telefone2_residencial;
  document.getElementById('editartelComercial2').value = dados.Contato2.telefone2_comercial;
  document.getElementById('editartelCelular2').value = dados.Contato2.telefone2_celular;

  document.getElementById('editarNome3').value = dados.Contato3.nome3;
  document.getElementById('editarChave3').checked = dados.Contato3.chaves3;
  document.getElementById('editarRelacao3').value = dados.Contato3.relacao3;
  document.getElementById('editartelResidencia3').value = dados.Contato3.telefone3_residencial;
  document.getElementById('editartelComercial3').value = dados.Contato3.telefone3_comercial;
  document.getElementById('editartelCelular3').value = dados.Contato3.telefone3_celular;

  document.getElementById('editarNome4').value = dados.Contato4.nome4;
  document.getElementById('editarChave4').checked = dados.Contato4.chaves4;
  document.getElementById('editarRelacao4').value = dados.Contato4.relacao4;
  document.getElementById('editartelResidencia4').value = dados.Contato4.telefone4_residencial;
  document.getElementById('editartelComercial4').value = dados.Contato4.telefone4_comercial;
  document.getElementById('editartelCelular4').value = dados.Contato4.telefone4_celular;

  document.getElementById('editarNome5').value = dados.Contato5.nome5;
  document.getElementById('editarChave5').checked = dados.Contato5.chaves5;
  document.getElementById('editarRelacao5').value = dados.Contato5.relacao5;
  document.getElementById('editartelResidencia5').value = dados.Contato5.telefone5_residencial;
  document.getElementById('editartelComercial5').value = dados.Contato5.telefone5_comercial;
  document.getElementById('editartelCelular5').value = dados.Contato5.telefone5_celular;

   document.getElementById('editarAudicao').checked = dados.HistoricoMedico.audicao;
   document.getElementById('editarVisao').checked = dados.HistoricoMedico.visao;
   document.getElementById('editarFala').checked = dados.HistoricoMedico.fala;
   document.getElementById('editarRespiracao').checked = dados.HistoricoMedico.respiracao;
   document.getElementById('editarCoracao').checked = dados.HistoricoMedico.coracao;
   document.getElementById('editarPressao').checked = dados.HistoricoMedico.pressao;
   document.getElementById('editarDiabete').checked = dados.HistoricoMedico.diabete;
   document.getElementById('editarArtrite').checked = dados.HistoricoMedico.artrite;
   document.getElementById('editarDerrame').checked = dados.HistoricoMedico.derrame;
   document.getElementById('editarRiscoQueda').checked = dados.HistoricoMedico.riscoQueda;

   document.getElementById('editarAlergias').value = AdicionarQuebraDeLinha(dados.alergia);
   document.getElementById('editarmedicamentosUser').value = AdicionarQuebraDeLinha(dados.medicamento_em_uso);
   document.getElementById('editarInstrucoes').value =  AdicionarQuebraDeLinha(dados.instrucoes_especiais);

   document.getElementById('editarOutro').value = dados.HistoricoMedico.outro;
   document.getElementById('observacaoEdit').value = AdicionarQuebraDeLinha(dados.observacao);

  }

 //MUDA A ROTA PARA ATUALIZAR OS DADOS DO USUARIO, ROTA QUE CHAMA O UPDATE.
 MudarActionEditar = function(){

 document.tlEditarUser.action = "/usuario/atualizar/"+document.getElementById('Tl_editarUsuario_id_Usuario').value;

};



//MUDA ROTA NO SHOW USUARIO PARA CHAMAR A ROTA DE EDITAR.
//SEM UTILIZAÇÃO POR ENQUANTO.
MudarAction = function(){
    document.modalUser.action = "/usuario/editar/"+ document.getElementById('dispositivoUserModal').value;
    };
  

//FUNÇÃO QUE BUSCA OS DADOS PARA PREENCHIMENTO DA MODAL, COM OS DADOS DO USUÁRIO.
selPersona = function(item){
    //RETIRA O VALOR ESPECIAL PARA COLOCAR ESPAÇO.
       var teste = item.replace(/\u20BB/gm, " ");
    
    //CONVERTE A STRING PARA JSON, (AQUI A STRING JA POSSUI ESPAÇAMENTO).
       var dados = JSON.parse(teste);

       
       document.getElementById('dispositivoUserModal').value = dados.dispositivo; 
       document.getElementById('nomeUserModal').value = dados.nome; 
       document.getElementById('SobrenomeUserModal').value = dados.sobrenome;
       document.getElementById('telefone').value =  dados.telefone;
       document.getElementById('usercelular').value = dados.celular;
       document.getElementById('cpf').value = dados.cpf;
       document.getElementById('DataNascimento').value = dados.data_nascimento;
       document.getElementById('rua').value = dados.Endereco.rua;
       document.getElementById('enderecoNumero').value = dados.Endereco.numero;
       document.getElementById('bairro').value = dados.Endereco.bairro; 
       document.getElementById('showComplemento').value = dados.Endereco.complemento;
       document.getElementById('cidade').value = dados.Endereco.cidade;
       document.getElementById('cep').value = dados.Endereco.cep;
       document.getElementById('uf').value = dados.Endereco.uf; 
       document.getElementById('pontoReferencia').value = dados.Endereco.ponto_referencia;
       document.getElementById('peso').value = dados.peso;
       document.getElementById('sexo').value = dados.sexo;
       document.getElementById('altura').value = dados.altura;
       document.getElementById('modaltipoSanguineo').value = dados.tipo_sanguineo;
       document.getElementById('observacaoModal').value = AdicionarQuebraDeLinha(dados.observacao);
    
       document.getElementById('medico').value = dados.Medico.nome_medico;
       document.getElementById('telConsultorio').value = dados.Medico.tel_consultorio;
       document.getElementById('telMedicoResidencial').value = dados.Medico.tel_residencial;
       document.getElementById('celMedico').value = dados.Medico.celular_medico; 
       document.getElementById('hospitalPreferencia').value = dados.Medico.hospital_preferencia;
       document.getElementById('planoSaude').value = dados.Medico.plano_saude; 
       document.getElementById('modelidentPlano').value = dados.Medico.plano_identi;
       document.getElementById('telefonePlano').value = dados.Medico.plano_telefone;
       document.getElementById('modalTelefoneHospital').value = dados.Medico.tel_hospital;
    
       document.getElementById('nome1').value = dados.Contato1.nome1;
       document.getElementById('chave1').checked = dados.Contato1.chaves1;
       document.getElementById('relacao1').value = dados.Contato1.relacao1;
       document.getElementById('telResidencia1').value = dados.Contato1.telefone1_residencial;
       document.getElementById('telComercial1').value = dados.Contato1.telefone1_comercial;
       document.getElementById('telCelular1').value =  dados.Contato1.telefone1_celular;
    
       document.getElementById('nome2').value = dados.Contato2.nome2;
       document.getElementById('chave2').checked = dados.Contato2.chaves2;
       document.getElementById('relacao2').value = dados.Contato2.relacao2;
       document.getElementById('telResidencia2').value = dados.Contato2.telefone2_residencial;
       document.getElementById('telComercial2').value = dados.Contato2.telefone2_comercial; 
       document.getElementById('telCelular2').value = dados.Contato2.telefone2_celular; 
    
       document.getElementById('nome3').value = dados.Contato3.nome3; 
       document.getElementById('chave3').checked = dados.Contato3.chaves3;
       document.getElementById('relacao3').value = dados.Contato3.relacao3;
       document.getElementById('telResidencia3').value = dados.Contato3.telefone3_residencial;
       document.getElementById('telComercial3').value = dados.Contato3.telefone3_comercial;
       document.getElementById('telCelular3').value = dados.Contato3.telefone3_celular; 
    
       document.getElementById('nome4').value = dados.Contato4.nome4; 
       document.getElementById('chave4').checked = dados.Contato4.chaves4;
       document.getElementById('relacao4').value = dados.Contato4.relacao4;
       document.getElementById('telResidencia4').value = dados.Contato4.telefone4_residencial;
       document.getElementById('telComercial4').value = dados.Contato4.telefone4_comercial;
       document.getElementById('telCelular4').value = dados.Contato4.telefone4_celular; 
    
       document.getElementById('nome5').value = dados.Contato5.nome5; 
       document.getElementById('chave5').checked = dados.Contato5.chaves5;
       document.getElementById('relacao5').value =  dados.Contato5.relacao5;
       document.getElementById('telResidencia5').value = dados.Contato5.telefone5_residencial;
       document.getElementById('telComercial5').value =  dados.Contato5.telefone5_comercial;
       document.getElementById('telCelular5').value =  dados.Contato5.telefone5_celular;
    
        document.getElementById('audicao').checked = dados.HistoricoMedico.audicao; 
        document.getElementById('visao').checked = dados.HistoricoMedico.visao; 
        document.getElementById('fala').checked =  dados.HistoricoMedico.fala;
        document.getElementById('respiracao').checked = dados.HistoricoMedico.respiracao;
        document.getElementById('coracao').checked = dados.HistoricoMedico.coracao;
        document.getElementById('pressao').checked =  dados.HistoricoMedico.pressao;
        document.getElementById('diabete').checked = dados.HistoricoMedico.diabete; 
        document.getElementById('artrite').checked =  dados.HistoricoMedico.artrite;
        document.getElementById('derrame').checked = dados.HistoricoMedico.derrame; 
        document.getElementById('riscoQueda').checked = dados.HistoricoMedico.riscoQueda;
    
        document.getElementById('alergia').value = AdicionarQuebraDeLinha(dados.alergia);
        document.getElementById('medicamentoEmUso').value = AdicionarQuebraDeLinha(dados.medicamento_em_uso);
        document.getElementById('instruEspeciais').value = AdicionarQuebraDeLinha(dados.instrucoes_especiais);
    
        document.getElementById('outro').value = dados.HistoricoMedico.outro;
        document.getElementById('idUsuario').value = dados._id;
            
        var identficaQuem = dados.dispositivo;
        var VLI = identficaQuem.slice(0,3);
        if(VLI =="VLI"){
             document.getElementById('mensagemVLI').hidden = false;            
        }
      };
    

//FUNÇÃO PARA PREENCHER O SELECT COM OS INDETIFICADORES JÁ CADASTRADOS.
//'[name^=identificadorCliente]'
$('[name^=identificadorCliente]').ready(function(){
  
       $.getJSON("/cliente/combo", preencherCombo);
       $.getJSON("/cliente/combo", preencherCombo2);
  
             function preencherCombo(data,status){
                 
                  var option = [];
                  $.each(data, function(i, obj){
              
              option[i] = document.createElement('option');//criando o option
              $( option[i] ).attr( {value : obj} );//colocando o value no option
              $( option[i] ).append( obj );//colocando o 'label'                        
                          
              $("select[name=identificadorClienteCreate]").append( option[i] );
                        
                       });
              }
              function preencherCombo2(data,status){
                 
                  var option = [];
                  $.each(data, function(i, obj){
              
              option[i] = document.createElement('option');//criando o option
              $( option[i] ).attr( {value : obj} );//colocando o value no option
              $( option[i] ).append( obj );//colocando o 'label'                        
                          
                          if(document.getElementById('identificadorClienteEditar') !== null){
                  $("select[name=identificadorClienteEditar]").append( option[i] );
                              document.getElementById('identificadorClienteEditar').value = clienteParaCombo;
                          }
                       });
              }
      
  });

//ALERTA PARA CONFIRMAÇÃO DO USUÁRIO, ONDE O USUÁRIO NÃO EDITA O USUARIO.
function voltarSemAlterar(botao){
    if(temAlteracao){
        
     alertify.confirm("","Deseja voltar sem Salvar as alterações ?", function(){
        
          //CASO A RESOSTA SEJA SIM EXECUTA ESSES DOIS PASSOS.
          voltaParaListaUsuario();
            // var url = "/principal";
            // source.close();
            // $(location).attr('href',url);
            //  $('#quandoClica').addClass('loader');
    
        },function(){
             }).set('labels', {ok:'Sim', cancel:'Não'});
            }
            else{
                voltaParaListaUsuario();
            }
    }

$(document).ready(function(){  
var formEditarUsuario = document.getElementById('tlEditarUser');

formEditarUsuario.onload = verificaMudancas();
console.log(formEditarUsuario);


});
var verificaMudancas = function(){
    
    document.querySelectorAll('input').forEach(function(input){
        input.addEventListener('input',houveAlteracao);
    });

    document.querySelectorAll('textarea').forEach(function(input){
        input.addEventListener('input',houveAlteracao);
    });
}

function houveAlteracao(){
  
        temAlteracao = true;
}


function voltaParaPrincipal(){
    var url = "/principal";
    source.close();
    $(location).attr('href',url);
     $('#quandoClica').addClass('loader');

}

function voltaParaListaUsuario(){
    var url = "/usuario/lista";
    source.close();
    $(location).attr('href',url);
     $('#quandoClica').addClass('loader');

}