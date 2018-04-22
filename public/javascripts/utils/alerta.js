var source;
var liberaAtualizacao;
var senhaCerta = false;
//CONFIGURAÇÃO DO PLUGIN TOASTR
function alerta(teste){
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "2000",
        "hideDuration": "2000",
        "timeOut": "4000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    
     if(senhaCerta){
         toastr.info("Senha atual inválida !");
         return false;
     }

     else if(document.modalTrocaSenha.senha1.value == document.modalTrocaSenha.senha2.value ){
            
            toastr.success("Senha Alterada com sucesso!");
            return true;

            }
      else
             {
                 toastr.error("Confirmação de senha incorreta !");
                    return false;
               }


}

//Compara senha digitada com senha atual do usuario.
function verificaSenhaModal(teste){
    $.get("/cliente/pegasenha?login="+teste+"&senha="+$('#senhaAtual').val(), function(dado){
            if(dado != "TRUE"){
                senhaCerta = true;
               
            }
            console.log(dado);
         });
}

//FUÇÃO QUE PASSA A ROTA PARA Excluir O USUARIO.
function desassociar(){

 alertify.confirm("","Deseja excluir o usuário?", function(){
      //CASO A RESOSTA SEJA SIM EXECUTA ESSES DOIS PASSOS.

<<<<<<< HEAD
         document.tlEditarUser.action = "/usuario/desassociar/"+ document.getElementById('idUsuarioTlEditar').value;
=======
         document.tlEditarUser.action = "/usuario/desassociar/"+ document.getElementById('Tl_editarUsuario_id_Usuario').value;
>>>>>>> f441cccb7120592f7b26185fdcdfb29c6022939a
         document.tlEditarUser.submit();
            $('#quandoClica').addClass('loader');

    },function(){
         }).set('labels', {ok:'Sim', cancel:'Não'});

}

<<<<<<< HEAD



//FUÇÃO QUE PASSA A ROTA PARA Excluir O USUARIO.
function voltarSemAlterar(botao){
 alertify.confirm("","Deseja voltar sem Salvar as alterações ?", function(){

      //CASO A RESOSTA SEJA SIM EXECUTA ESSES DOIS PASSOS.

        var url = "/principal";
        source.close();
        $(location).attr('href',url);
         $('#quandoClica').addClass('loader');

    },function(){
         }).set('labels', {ok:'Sim', cancel:'Não'});

}

//VARIAVEIS QUE PASSADAS COMO PARAMETRO NA ROTA PARA ENCONTRAR USUARIO COM OS DADOS SEM SER EDITADOS.
//var userAntigo;
//var cpfAntigo;

//VARIAVEL PARA PRREENCHER O SELECT COM O VALOR DE CLIENNTE JÁ EXISTENTE.
var clienteParaCombo;

//FUNÇÃO PRA PREENCHER A TELA DE EDITAR DADOS, COM DADOS DO BANCO.
 function editarDados (item){
    
   var dados = JSON.parse(item);

   document.getElementById('idUsuarioTlEditar').value = dados._id;
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

    //document.getElementById('editarAlergias').value = dados.alergia;
    //document.getElementById('editarmedicamentosUser').value = dados.medicamento_em_uso;
    //document.getElementById('editarInstrucoes').value = dados.instrucoes_especiais;

    
    document.getElementById('editarInstrucoes').value = AdicionarQuebraDeLinha(dados.instrucoes_especiais);
    document.getElementById('editarAlergias').value = AdicionarQuebraDeLinha(dados.alergia);
    document.getElementById('editarmedicamentosUser').value = AdicionarQuebraDeLinha(dados.medicamento_em_uso);
    document.getElementById('observacaoEdit').value = AdicionarQuebraDeLinha(dados.observacao);


    // document.getElementById('instruEspeciais').value = AdicionarQuebraDeLinha(dados.instrucoes_especiais);
    // document.getElementById('alergia').value = AdicionarQuebraDeLinha(dados.alergia);
    // document.getElementById('medicamentoEmUso').value = AdicionarQuebraDeLinha(dados.medicamento_em_uso);
    // document.getElementById('observacaoModal').value = AdicionarQuebraDeLinha(dados.observacao);


    document.getElementById('editarOutro').value = dados.HistoricoMedico.outro;
    //document.getElementById('observacaoEdit').value = dados.observacao;

    //document.getElementById('PassarParam').value = nome;
    //userAntigo = dados.dispositivo;
    //cpfAntigo = dados.cpf;

   mascaraTelefone_DataList();
//Jogar essa parte para dentro de uma função.

//     var inputDispoEdit = document.getElementById("editarDispositivoUser");
//     inputDispoEdit.setAttribute("list","dispositivosDataListEditar");

//     var listaDispositivosEdit = document.createElement("datalist");
//     listaDispositivosEdit.setAttribute("id","dispositivosDataListEditar");

//     inputDispoEdit.appendChild(listaDispositivosEdit);
  
//     $.get('/dispositivo/cadatrados', preencherDataListEditar);

//     var auxCel;
// $(".telefone").on('input propertychange',function(){
//  		console.log("Carregou o Script!");
//     var texto = $(this).val();
    
//     texto = texto.replace(/[^\d]/g, '');
    
//     if (texto.length > 0)
//     {
//     texto = "(" + texto;
        
//         if (texto.length > 3)
//         {
//             texto = [texto.slice(0, 3), ") ", texto.slice(3)].join('');  
//         }
//         if (texto.length > 12)
//         {      
//             if (texto.length > 13) {
//             		//alert(texto.length);
//                 var x = texto.substring(0,7);
//                 if(x == "(08) 00"){
//                     texto = texto.replace('(','').replace(')','').replace('-','').replace(/\s+/, ""); 
//                     texto = texto.substr(0,4)+" "+texto.substr(4);	   
                
//                     }else{
//                     //alert(texto.length)
//                     texto = [texto.slice(0, 10), "-", texto.slice(10)].join('');
                    
//                     }
//                }

//             else{
//             		//alert(texto.length)
//                  texto = [texto.slice(0, 9), "-", texto.slice(9)].join('');
//                 }
        
//         }                 
//         if (texto.length > 15 && texto.length <= 16 ){
            
//                texto = texto.replace('(','').replace(')','').replace('-','').replace(/\s+/, ""); 
//                texto =  texto.substr(0,2)+" "+texto.substr(2);
//                texto =  texto.substr(0,5)+" "+texto.substr(5);
//                texto =  texto.substr(0,10)+"-"+texto.substr(10);
                
//                auxCel = "+"+ texto;
               
               
               
//                texto = auxCel;
//               // alert(texto.length)
//                }
//                else if(texto.length > 16){
//                		if(auxCel){
//                   		texto = auxCel;
//                         auxCel = false;
//                   }else{
//                			texto = texto.substr(0,16);
//                         }
//                }
//     }
//    $(this).val(texto);     
// });


  };


///
function preencherDataListEditar(data,status){

            var option = [];
                $.each(data, function(i, obj){
						
						option[i] = document.createElement('option');//criando o option
						$( option[i] ).attr( {value : obj.nome} );//colocando o value no option
						//$( option[i] ).append( obj );//colocando o 'label'                        
                        
						$("#dispositivosDataListEditar").append( option[i] );
                      
                     });
}



  //MUDA A ROTA PARA ATUALIZAR OS DADOS DO USUARIO.
  MudarActionEditar = function(){

  document.tlEditarUser.action = "/usuario/atualizar/"+document.getElementById('idUsuarioTlEditar').value ; //"/"+ cpfAntigo;

};
=======
//VARIAVEL PARA PRREENCHER O SELECT COM O VALOR DE CLIENNTE JÁ EXISTENTE.
var clienteParaCombo;

>>>>>>> f441cccb7120592f7b26185fdcdfb29c6022939a
//Botão Limpar pesquisa caso seja utilizado.
VoltaParaInicio = function(){

 document.getElementById('nomeNoFiltro').value = "";
 document.getElementById('mensagemNoFiltro').value = "";
 document.getElementById('datepicker').value = "";
 document.formFiltro.action ="/principal";

};
  //MUDA A ACTION PARA EXCLUIR O CLIENTE, QUANDO ELE ENTRA NESSA OPÇÃO.
  mudarActionClienteExcluir = function(identi){

           
       var resp = confirm("Deseja excluir usuáio?");
       if(resp)
            document.tlClienteOpcoes.action ="/cliente/delete/"+ identi;        
        
      
  };

  //MUDA O ACTION PARA A ROTA EDITAR CLIENTE QUANDO ELE CLICAR NO BOTÃO ENVIAR. 
  mudarActionClienteEditar = function(identi){

      document.tlClienteOpcoes.action="/cliente/edit/"+ identi;
   }; 

  //ROTA PARA JOGAR, DA TELA DA MODAL PARA O EDITAR USUÁRIO.
  alterar = function(){
      
<<<<<<< HEAD
      //document.getElementById('btnencaminha').href="/usuario/editar/"+ document.getElementById('dispositivoUserModal').value;
    document.getElementById('btnencaminha').href="/usuario/editar/"+ document.getElementById('idUsuario').value;
=======
      document.getElementById('btnencaminha').href="/usuario/editar/"+ document.getElementById('idUsuario').value;
>>>>>>> f441cccb7120592f7b26185fdcdfb29c6022939a
  };


//SAIR DO ADA (CRIA UM HREF PARA O BOTAO.)
sairAda = function(){
   
    alertify.confirm("","Realmente deseja sair do ADA ?", function(){ 
        //FUNÇÃO PARA O SIM.
        var url = "/logout";
        source.close();
        $(location).attr('href',url);
        
         }, function(){
             //FUNÇÃO PARA O NÃO.(NÃO FAZ NADA.)
          }).set('labels', {ok:'Sim', cancel:'Não'});
             
};

<<<<<<< HEAD
//MUDA ROTA NO SHOW USUARIO PARA CHAMAR A ROTA DE EDITAR.
//SEM UTILIZAÇÃO POR ENQUANTO.
 MudarAction = function(){
  document.modalUser.action = "/usuario/editar/"+ document.getElementById('idUsuario').value;
  };
=======
>>>>>>> f441cccb7120592f7b26185fdcdfb29c6022939a

//FUNÇÃO QUE COLOCA UM CARACTER ESPECIAL PARA QUE SEJA POSSÍVEL, ACRESCENTAR OS ESPAÇOS.
function substitui(key,value){
  if (typeof value === "string") {
    return value.replace(/\s/gm,'\u20BB');
  }
  return value;
};

<<<<<<< HEAD
//FUNÇÃO QUE BUSCA OS DADOS PARA PREENCHIMENTO DA MODAL.
selPersona = function(item){
//RETIRA O VALOR ESPECIAL PARA COLOCAR ESPAÇO.
   var teste = item.replace(/\u20BB/gm, " ");

//CONVERTE A STRING PARA JSON, (AQUI A STRING JA POSSUI ESPAÇAMENTO).
   var dados = JSON.parse(teste);

   document.getElementById('dispositivoUserModal').value = dados.dispositivo; //dados.dispositivo.nome;
   document.getElementById('nomeUserModal').value = dados.nome; //dados.dispositivo.usuario.nome;
   document.getElementById('SobrenomeUserModal').value = dados.sobrenome; //dados.dispositivo.usuario.sobrenome;
   //document.getElementById('matriculaUserModal').value =  dados.matricula;//dados.dispositivo.usuario.matricula;
   document.getElementById('telefone').value =  dados.telefone;//dados.dispositivo.usuario.telefone;
   document.getElementById('usercelular').value = dados.celular; //dados.dispositivo.usuario.celular;
   document.getElementById('cpf').value = dados.cpf; //dados.dispositivo.usuario.cpf;
   document.getElementById('DataNascimento').value = dados.data_nascimento;//dados.dispositivo.usuario.data_nascimento;
   document.getElementById('rua').value = dados.Endereco.rua; //dados.dispositivo.usuario.Endereco.rua;
   document.getElementById('enderecoNumero').value = dados.Endereco.numero; //dados.dispositivo.usuario.Endereco.numero;
   document.getElementById('bairro').value = dados.Endereco.bairro; //dados.dispositivo.usuario.Endereco.bairro;
   document.getElementById('showComplemento').value = dados.Endereco.complemento;
   document.getElementById('cidade').value = dados.Endereco.cidade;//dados.dispositivo.usuario.Endereco.cidade;
   document.getElementById('cep').value = dados.Endereco.cep; //dados.dispositivo.usuario.Endereco.cep;
   document.getElementById('uf').value = dados.Endereco.uf; //dados.dispositivo.usuario.Endereco.uf;
   document.getElementById('pontoReferencia').value = dados.Endereco.ponto_referencia;//dados.dispositivo.usuario.Endereco.ponto_referencia;
   document.getElementById('peso').value = dados.peso;//dados.dispositivo.usuario.peso;
   document.getElementById('sexo').value = dados.sexo; //dados.dispositivo.usuario.sexo;
   document.getElementById('altura').value = dados.altura; //dados.dispositivo.usuario.altura;
   document.getElementById('modaltipoSanguineo').value = dados.tipo_sanguineo;//dados.dispositivo.usuario.tipo_sanguineo;
  // document.getElementById('observacaoModal').value = dados.observacao;//dados.dispositivo.usuario.observacao;

   document.getElementById('medico').value = dados.Medico.nome_medico; //dados.dispositivo.usuario.Medico.nome_medico;
   document.getElementById('telConsultorio').value = dados.Medico.tel_consultorio; //dados.dispositivo.usuario.Medico.tel_consultorio;
   document.getElementById('telMedicoResidencial').value = dados.Medico.tel_residencial;//dados.dispositivo.usuario.Medico.tel_residencial;
   document.getElementById('celMedico').value = dados.Medico.celular_medico; //dados.dispositivo.usuario.Medico.celular_medico;
   document.getElementById('hospitalPreferencia').value = dados.Medico.hospital_preferencia;//dados.dispositivo.usuario.Medico.hospital_preferencia;
   document.getElementById('planoSaude').value = dados.Medico.plano_saude; //dados.dispositivo.usuario.Medico.plano_saude;
   document.getElementById('modelidentPlano').value = dados.Medico.plano_identi; //dados.dispositivo.usuario.Medico.plano_identi;
   document.getElementById('telefonePlano').value = dados.Medico.plano_telefone; //dados.dispositivo.usuario.Medico.plano_telefone;
   document.getElementById('modalTelefoneHospital').value = dados.Medico.tel_hospital; //dados.dispositivo.usuario.Medico.tel_hospital;

   document.getElementById('nome1').value = dados.Contato1.nome1;//dados.dispositivo.usuario.Contato1.nome1;
   document.getElementById('chave1').checked = dados.Contato1.chaves1;//dados.dispositivo.usuario.Contato1.chaves1;
   document.getElementById('relacao1').value = dados.Contato1.relacao1;//dados.dispositivo.usuario.Contato1.relacao1;
   document.getElementById('telResidencia1').value = dados.Contato1.telefone1_residencial;//dados.dispositivo.usuario.Contato1.telefone1_residencial;
   document.getElementById('telComercial1').value = dados.Contato1.telefone1_comercial;//dados.dispositivo.usuario.Contato1.telefone1_comercial;
   document.getElementById('telCelular1').value =  dados.Contato1.telefone1_celular; //dados.dispositivo.usuario.Contato1.telefone1_celular;

   document.getElementById('nome2').value = dados.Contato2.nome2;//dados.dispositivo.usuario.Contato2.nome2;
   document.getElementById('chave2').checked = dados.Contato2.chaves2;//dados.dispositivo.usuario.Contato2.chaves2;
   document.getElementById('relacao2').value = dados.Contato2.relacao2; //dados.dispositivo.usuario.Contato2.relacao2;
   document.getElementById('telResidencia2').value = dados.Contato2.telefone2_residencial; //dados.dispositivo.usuario.Contato2.telefone2_residencial;
   document.getElementById('telComercial2').value = dados.Contato2.telefone2_comercial; //dados.dispositivo.usuario.Contato2.telefone2_comercial;
   document.getElementById('telCelular2').value = dados.Contato2.telefone2_celular; //dados.dispositivo.usuario.Contato2.telefone2_celular;

   document.getElementById('nome3').value = dados.Contato3.nome3; //dados.dispositivo.usuario.Contato3.nome3;
   document.getElementById('chave3').checked = dados.Contato3.chaves3; //dados.dispositivo.usuario.Contato3.chaves3;
   document.getElementById('relacao3').value = dados.Contato3.relacao3;//dados.dispositivo.usuario.Contato3.relacao3;
   document.getElementById('telResidencia3').value = dados.Contato3.telefone3_residencial;//dados.dispositivo.usuario.Contato3.telefone3_residencial;
   document.getElementById('telComercial3').value = dados.Contato3.telefone3_comercial;//dados.dispositivo.usuario.Contato3.telefone3_comercial;
   document.getElementById('telCelular3').value = dados.Contato3.telefone3_celular; //dados.dispositivo.usuario.Contato3.telefone3_celular;

   document.getElementById('nome4').value = dados.Contato4.nome4; //dados.dispositivo.usuario.Contato4.nome4;
   document.getElementById('chave4').checked = dados.Contato4.chaves4; //dados.dispositivo.usuario.Contato4.chaves4;
   document.getElementById('relacao4').value = dados.Contato4.relacao4; //dados.dispositivo.usuario.Contato4.relacao4;
   document.getElementById('telResidencia4').value = dados.Contato4.telefone4_residencial; //dados.dispositivo.usuario.Contato4.telefone4_residencial;
   document.getElementById('telComercial4').value = dados.Contato4.telefone4_comercial;//dados.dispositivo.usuario.Contato4.telefone4_comercial;
   document.getElementById('telCelular4').value = dados.Contato4.telefone4_celular; //dados.dispositivo.usuario.Contato4.telefone4_celular;

   document.getElementById('nome5').value = dados.Contato5.nome5; //dados.dispositivo.usuario.Contato5.nome5;
   document.getElementById('chave5').checked = dados.Contato5.chaves5; //dados.dispositivo.usuario.Contato5.chaves5;
   document.getElementById('relacao5').value =  dados.Contato5.relacao5; //dados.dispositivo.usuario.Contato5.relacao5;
   document.getElementById('telResidencia5').value = dados.Contato5.telefone5_residencial; //dados.dispositivo.usuario.Contato5.telefone5_residencial;
   document.getElementById('telComercial5').value =  dados.Contato5.telefone5_comercial;//dados.dispositivo.usuario.Contato5.telefone5_comercial;
   document.getElementById('telCelular5').value =  dados.Contato5.telefone5_celular;//dados.dispositivo.usuario.Contato5.telefone5_celular;

    document.getElementById('audicao').checked = dados.HistoricoMedico.audicao; //dados.dispositivo.usuario.HistoricoMedico.audicao;
    document.getElementById('visao').checked = dados.HistoricoMedico.visao; //dados.dispositivo.usuario.HistoricoMedico.audicao;
    document.getElementById('fala').checked =  dados.HistoricoMedico.fala;//dados.dispositivo.usuario.HistoricoMedico.fala;
    document.getElementById('respiracao').checked = dados.HistoricoMedico.respiracao; //dados.dispositivo.usuario.HistoricoMedico.respiracao;
    document.getElementById('coracao').checked = dados.HistoricoMedico.coracao; //dados.dispositivo.usuario.HistoricoMedico.coracao;
    document.getElementById('pressao').checked =  dados.HistoricoMedico.pressao;//dados.dispositivo.usuario.HistoricoMedico.pressao;
    document.getElementById('diabete').checked = dados.HistoricoMedico.diabete; //dados.dispositivo.usuario.HistoricoMedico.diabete;
    document.getElementById('artrite').checked =  dados.HistoricoMedico.artrite;//dados.dispositivo.usuario.HistoricoMedico.artrite;
    document.getElementById('derrame').checked = dados.HistoricoMedico.derrame; //dados.dispositivo.usuario.HistoricoMedico.derrame;
    document.getElementById('riscoQueda').checked = dados.HistoricoMedico.riscoQueda; //dados.dispositivo.usuario.HistoricoMedico.riscoQueda;

    // document.getElementById('alergia').value = dados.alergia; //dados.dispositivo.usuario.alergia;
    // document.getElementById('medicamentoEmUso').value = dados.medicamento_em_uso;//dados.dispositivo.usuario.medicamento_em_uso;
    // document.getElementById('instruEspeciais').value = dados.instrucoes_especiais;//dados.dispositivo.usuario.instrucoes_especiais;

   

    document.getElementById('outro').value = dados.HistoricoMedico.outro;//dados.dispositivo.usuario.HistoricoMedico.outro;

    document.getElementById('idUsuario').value = dados._id;
    //document.getElementById('PassarParam').value = nome;
    var identficaQuem = dados.dispositivo;
    var VLI = identficaQuem.slice(0,3);
    if(VLI =="VLI"){
         document.getElementById('mensagemVLI').hidden = false;            
    }

    
    document.getElementById('instruEspeciais').value = AdicionarQuebraDeLinha(dados.instrucoes_especiais);
    document.getElementById('alergia').value = AdicionarQuebraDeLinha(dados.alergia);
    document.getElementById('medicamentoEmUso').value = AdicionarQuebraDeLinha(dados.medicamento_em_uso);
    document.getElementById('observacaoModal').value = AdicionarQuebraDeLinha(dados.observacao);

  };



$(document).ready(function() {
//CONTA NUMERO DE ALARMES E SOS.
$('#avisa_notificacao').mouseenter(function(){
   
    $.get("/principal/atendimento",function(dados){    
    
     $('#qtdSosAjuda').text(dados);
    
=======

$(document).ready(function() {
//CONTA NUMERO DE ALARMES E SOS.
$('#avisa_notificacao').mouseenter(function(){
   $.get("/principal/atendimento",function(dados){    
    $('#qtdSosAjuda').text(dados);
   
>>>>>>> f441cccb7120592f7b26185fdcdfb29c6022939a
    });
});

   

//INFORMAÇÃO PARA TER CUIDADO NO PREENCHIMETO DO NOME DISPOSITIVO.
$('[data-toggle="popover"]').popover();


//VERIFICAR SE JA POSSUI UM USUARIO COM O DISPOSITIVO.
$('[name^=nomeDisposi]').blur(function(){
    //ACESSA ROTA PARA VERIFICAR SE JA POSSUI ALGUEM COM O DISPOSITIVO.
     $.get("/usuario/verificar?dispositivo="+ $('[name^=nomeDisposi]').val(),possuiDispositivo);
    });
});

//CALLBACK DA FUNÇAO QUE VERIFICA SE O USUÁRIO JÁ POSSUI UM DISPOSITIVO.
var dispositivoPossuiUsuario;
//FUNÇÃO QUE ATUA NA RESPOSTA DO GET DE VERIFICAÇÃO DO USUÁRIO.
 function possuiDispositivo(data, status){
    if (data == "TRUE"){
        alertify.alert("","Este dispositivo já possui um usuário");

        //SETA O VALOR PARA TRUE, PARA IMPEDIR O CADASTRO.
        dispositivoPossuiUsuario =true;
        }else if(data == "FALSE")
            dispositivoPossuiUsuario =false; //SETA PARA FALSE PARA PERMITIR O CADASTRO.
<<<<<<< HEAD
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

=======
 }

//ADICIONA QUEBRA DE LINHA NOS CAMPOS QUE POSSUEM TEXT AREA PARA MELHOR VISUALIZAÇÃO DOS DADOS. 
function AdicionarQuebraDeLinha(valorComCaracterEspecial){

    return valorComCaracterEspecial.split('\u0152').join('\n');
   }
>>>>>>> f441cccb7120592f7b26185fdcdfb29c6022939a


$(document).ready(function() {      
//FUNÇÂO PARA PREENCHIMENTO DO CEP AUTOMATICO.
       function limpa_formulário_cep() {
                // Limpa valores do formulário de cep.
                $("[name^=rua]").val("");
                $("[name^=bairro]").val("");
                $("[name^=cidade]").val("");
                $("[name^=uf]").val("");
            }

            //Quando o campo cep perde o foco.
            $('[name=cep]').blur(function() {

                //Nova variável "cep" somente com dígitos.
                var cep = $(this).val().replace(/\D/g, '');

                //Verifica se campo cep possui valor informado.
                if (cep !== "") {

                    //Expressão regular para validar o CEP.
                    var validacep = /^[0-9]{8}$/;

                    //Valida o formato do CEP.
                    if(validacep.test(cep)) {

                        //Preenche os campos com "..." enquanto consulta webservice.

                            $("[name^=rua]").val("...");
                                $("[name^=bairro]").val("...");
                                $("[name^=cidade]").val("...");
                                $("[name^=uf]").val("...");


                        //Consulta o webservice viacep.com.br/
                        $.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                            if (!("erro" in dados)) {
                                //Atualiza os campos com os valores da consulta.

                                $("[name^=rua]").val(dados.logradouro);
                                $("[name^=bairro]").val(dados.bairro);
                                $("[name^=cidade]").val(dados.localidade);
                                $("[name^=uf]").val(dados.uf);


                            } //end if.
                            else {
                                //CEP pesquisado não foi encontrado.
                                limpa_formulário_cep();
                                alertify.alert("Ops!","CEP não encontrado.");
                                //alert("CEP não encontrado.");
                            }
                        });
                    } //end if.
                    else {
                        //cep é inválido.
                        limpa_formulário_cep();
                        alertify.alert("Ops!","Formato de CEP inválido.");
                        //alert("Formato de CEP inválido.");
                    }
                } //end if.
                else {
                    //cep sem valor, limpa formulário.
                    limpa_formulário_cep();
                }
            });
 });


//ESCONDE OS DADOS NO INICIO, DA TELA DA MODAL.
$(document).ready(function(){
    $("#myModal1").ready(function(){
        $("[name=EsconderDados]").hide();
    });

    var trocaTexto = true;
    $("[name=mostraOculta]").click(function(){
        $("[name=EsconderDados]").toggle();

        if(trocaTexto){
            $("[name=mostraOculta]").val("ocultar");
            trocaTexto = false;
            $(this).find('i').removeClass('glyphicon-arrow-down');
            $(this).find('i').addClass('glyphicon-arrow-up');
            $(this).find('span').text('Ocultar');
        }else {
            $("[name=mostraOculta]").val("mostrar");
            trocaTexto = true;
            $(this).find('i').removeClass('glyphicon-arrow-up');
            $(this).find('i').addClass('glyphicon-arrow-down');
            $(this).find('span').text('Mostrar');
        }

    });


});



//FUNÇÃO PARA ATUALIZAR APENAS O MAPA. 
//SERVER-SENT EVENT, FAZ COM QUE O SERVIDOR ENVIA OS DADOS PARA O CLIENTE.
  source = new EventSource('/principal/atualizar');
  source.addEventListener('message', function(e) {
    if(liberaAtualizacao == "true" && e.data != 'N'){

            InitMap(e.data);       
            
    }
            
 },false); //mapAtualizar);

//IMPEDIRA QUE A DATA SEJA INVALÍDA EM TESTE.
function validarData(data)
{

    var x = [];
    var nova = data.value;
    x  = nova.split("/");
    if(x[0] > 31 || x[0] < 0)
        alertify.alert("","Data Invalida dia maior que 31 ou menor que 0.");
    else if(x[1] > 12 || x[1] < 0)
        alertify.alert("","Data Invalida mês maior que 12 ou menor que 0.");

    
};



function validarCamposRelatorio(form){

    var erros = 0;
    var mensagem = "";

    if(form.dispositivoRelatorio.value == "" && form.mensagemRelatorio.value == "" && form.dataRelatorio1.value == ""
    && form.dataRelatorio2.value == ""){
        
        erros ++;
        mensagem += "Não é possível fazer uma busca vazia por favor informe ao menos um intervalo.";
    }
    else if(form.dataRelatorio1.value == "" || form.dataRelatorio2.value == ""){
        
        erros ++;
        mensagem += "Por favor, informe o intevalo da busca.";
    }

    if(erros > 0){
        
        alertify.alert("Campos necessários",mensagem);
        return false;
    }
    form.submit();
    
};

//IMPEDE QUE SEJA EDITADO UM CLIENTE EM BRANCO.
function validarEditarCliente(form){
    var erros = 0;
    var mensagem = "";

    if(form.nome.value === ""){
        erros++;
        mensagem += "* O Nome está em branco. </br>";
    }

    if(form.login.value === ""){
        erros++;
        mensagem += "* O login está em branco. </br>";
    }

    if(erros > 0){
        alertify.alert("Campos Obrigatórios!", mensagem);
        $('#quandoClica').remove();
        return false;
    }

    form.submit();

};
//VALIDAR O CAMPO RESET SENHA.
function validarResetSenha(form){
    var erros = 0;
    var mensagem = "";

    if(form.senha.value === ""){
        erros ++;
        mensagem +="* Por favor informe a nova senha.</br>";
    }
    if(form.confirmSenha.value === ""){
        erros++;
        mensagem +="* Por favor informe a confirmação da nova senha.</br>";
    }
    if(form.confirmSenha.value != form.senha.value){
        erros++;
        mensagem +="* Senha e confimação de senha estão diferentes";
    }

    if(erros > 0){
        alertify.alert("Campos Obrigatórios!", mensagem);
        $('#quandoClica').remove();
        return false;
    }

    form.submit();


};

//VERIFICA SE O CLIENTE ESTÁ TODO PREENCHIDO, PARA IMPEDIR QUE TENHA UM USUÁRIO EM BRANCO.
function validarCadastroCliente(form){

    var erros = 0 ;
    var mensagem = "";

    if(form.cliente.value === ""){
        erros++;
        mensagem += "* Por favor informe o cliente.</br>";
    }
    if(form.nome.value === ""){
        erros++;
        mensagem += "* Por favor informe o nome do cliente.</br>";
    }
    if(form.login.value === ""){
        erros++;
        mensagem += "* Por favor informe o Login.</br>";
    }
    if(form.senha.value === ""){
        erros ++;
        mensagem += "* Por favor informe a senha.</br>";
    }
    if(form.confirmSenha.value === ""){
        erros++;
        mensagem +="* Por favor confirme a senha.</br>";
    }
    if(form.senha.value != form.confirmSenha.value){
        erros++;
        mensagem +="* Senha e confimação de senha estão diferentes.</br>";
    }
    
    if(erros > 0){
        alertify.alert("Campos Obrigatórios!", mensagem);
        $('#quandoClica').remove();
        return false;
    }

    form.submit();
};

//VERIFICA SE O USUÁRIO PREENCHEU OS CAMPOS BASÍCOS PARA CADASTRO
function validarCampos(form){

var erros = 0;
var mensagem = "";

    if(dispositivoPossuiUsuario){
        erros++;
        mensagem +="* Informe um dispositivo válido.  </br>\n";
    }
    if(form.NomeUsuario.value === ""){
        erros++;
        mensagem +="* Informe o nome.  </br>\n";
    }
    if(form.dispositivoUser.value === ""){
<<<<<<< HEAD
        form.dispositivoUser.value =  "Sem Usuario";
=======
        form.dispositivoUser.value =  "Sem Dispositivo";
>>>>>>> f441cccb7120592f7b26185fdcdfb29c6022939a
        // erros++;
        // mensagem +="* Informe o dispositivo do usuário.  </br>\n";
    }
    if(form.SobrenomeUsuario.value === ""){
        erros++;
        mensagem +="* Informe o sobrenome.  </br>\n";
    }
    // if(form.cPf.value == ""){
    //     erros++;
    //     mensagem +="* Informe o CPF.  </br>\n";
    // }
    if(form.usuarioResidencia.value === "" && form.usuarioceluar.value === ""){
        erros++;
        mensagem +="* Informe algum telefone do usuário. </br>\n";
    }
    // if(form.cEp.value == "" ){
    //     erros++;
    //     mensagem +="* Informe o CEP.  </br>\n";
    // }

if((form.tlCreateNome1.value === "" || form.tlCreateNome2.value === "" || form.tlCreateNome3.value === "")||(form.telResidencia1.value === "" && form.telComercial1.value === "" && form.telCelular1.value === "") || (form.telResidencia2.value === "" && form.telComercial2.value ==="" && form.telCelular2.value === "")|| (form.telResidencia3.value === "" && form.telComercial3.value ==="" && form.telCelular3.value === ""))
   {
        erros++;
        mensagem +="* Informe ao menos três contatos para o usuário.  \n";
    }

    if(erros > 0){

            alertify.alert( "Campos Obrigatórios!",mensagem);
            $('#quandoClica').remove();
            return false;
        }

     form.submit();
};


//VERIFICA SE O USUÁRIO PREENCHEU OS CAMPOS BASÍCOS PARA CADASTRO NA TELA DE EDITAR.
function validarEditarCampos(form){

var erros = 0;
var mensagem = "";


    if(dispositivoPossuiUsuario){
        erros++;
        mensagem +="* Informe um dispositivo válido.  </br>\n";
    }
    if(form.editarNomeUsuario.value === ""){
        erros++;
         mensagem +="* Informe o nome.  </br>\n";
    }
    if(form.editarSobrenomeUsuario.value === ""){
        erros++;
         mensagem +="* Informe o sobrenome.  </br>\n";
    }
    // if(form.editarCPF.value == ""){
    //     erros++;
    //      mensagem +="* Informe o CPF.  </br>\n";
    // }
    if(form.editarUsuarioResidencia.value === "" && form.editarUserCelular.value === ""){
        erros++;
        mensagem +="*  Informe algum telefone do usuário.  </br>\n";
    }
    // if(form.editarCep.value == "" ){
    //     erros++;
    //     mensagem +="*  Informe o CEP.  </br>\n";
    // }

if((form.editarContato1Nome1.value === "" || form.editarNome2.value === "" || form.editarNome3.value === "")||(form.editartelResidencia1.value === "" && form.editartelComercial1.value ==="" && form.editartelCelular1.value === "" ) ||(form.editartelResidencia2.value === "" && form.editartelComercial2.value ==="" && form.editartelCelular2.value === "") ||(form.editartelResidencia3.value === "" && form.editartelComercial3.value ==="" && form.editartelCelular3.value === "")
 ){
        erros++;
        mensagem +="* Informe ao menos três contatos do usuário.  </br>\n";
    }

    if(erros > 0){

            alertify.alert("",mensagem);
              $('#quandoClica').remove();
            return false;
        }

     form.submit();
<<<<<<< HEAD
};


=======
}
>>>>>>> f441cccb7120592f7b26185fdcdfb29c6022939a

//FUNÇÃO QUE APAGA O SIMBOLO DE NOTIFICACAO.
function apaganotifi(){
     $('#mostrar_notificacao').hide();
};

//INICIA COM A NOTIFICAÇÃO APAGADA.
$(document).ready(function(){   
    
     liberaAtualizacao = document.getElementById('podeAtualizar').value;

     if(liberaAtualizacao == "true"){
         $('#botaoLipaPesquisa').hide();
     }

     $('#mostrar_notificacao').hide();    


  //Solicita permissão para notificar.   
  Notification.requestPermission(function(perm) {
    console.log(perm);
});


});

//pede permissão para notificar o usuario.
 Notification.requestPermission(function(perm) {
    console.log(perm);
});
//NOTIFICAÇÃO DE SOS 
function NotificacaoSOS(nome){

var notification = new Notification("Chegou um SOS!", {
    dir: "auto",
    icon: "images/SOS_B1.png",
    lang: "",
    vibrate: "[200, 100, 200]",
    body: "Olá, por favor entre em contato com o usuário do dispositivo " + nome,
    tag: "tag",

});

<<<<<<< HEAD
};
//var notification;
function testeNotificacaoAjuda(nome){
=======
}
//NOTIFICAÇÃO DE AJUDA
function NotificacaoAjuda(nome){
>>>>>>> f441cccb7120592f7b26185fdcdfb29c6022939a

var notification = new Notification("Chegou um novo Alarme!", {
    dir: "auto",
    icon: "images/Alarme_B1.png",
    lang: "",
    vibrate: "[200, 100, 200]",
    body: "Olá, por favor entre em contato com o usuário do dispositivo "+ nome,
    tag: "tag",

});
    
  notification.onclick = function(){
      //window.open("principal")
      };

<<<<<<< HEAD
};
=======
}

//FUNÇÃO AJAX ESCRITA EM JAVASCRIPT PURO.
>>>>>>> f441cccb7120592f7b26185fdcdfb29c6022939a
  var request = null;
  function createRequest() {
    try {
      request = new XMLHttpRequest();
    }
    catch (trymicrosoft){
      try {
         request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (othermicrosoft){
           try {
             request = new ActiveXObject("Microsoft.XMLHTTP");
             } catch (failed)
              { request = null; }
            }
          } if (request === null)
           alert("Error creating request object!");
        };


//FUNÇÃO PARA ACABAR COM O A ANIMAÇÃO E O AUDIO APOS O CLICK.
  function getInformacaoQualquer(nome) {
     createRequest();
     //var url = "/principal/viu?imei="+imei+"&nome="+nome+"&visto=true";
     var url = "/principal/viu?nome="+nome+"&visto=true";
     request.open("POST", url, true);
     request.onreadystatechange = atualizaPagina;
     request.send();// "imei="+imei+"&nome="+nome+"&status=TRUE"
  };


//FUNÇÃO QUE VERIFICA SE A COMUNICAÇÃO OCORREU.
function atualizaPagina() {
  if (request.readyState == 4) {
    var respostaDoServidor = request.responseText;
  }
};

//FUNÇÃO QUE CRIA O LOOP DE CARREGANDO.
function testeCarregando(){ 
   //document.getElementById('quandoClica').class('loader');
   $('#quandoClica').addClass('loader');
}

//VALIDAR MODAL DE RECUPERAÇÃO DE SENHA NA TELA PRINCIPAL
function validarLoginModal(form){

     var response = grecaptcha.getResponse();
        //recaptcha failed validation
        if (response.length == 0) {
            $('#errorMensagem').show();
            $('#errorMensagem').text("Captcha não marcado!");
          return false;
        }

        $.get('/cliente/temlogin?login='+form.email.value, function(data,status){
            if(data == "1"){
                form.submit();
                return true;
            }
            else{
                    $('#errorMensagem').show();
                    $('#errorMensagem').text("Login inexistente!");
                return false;
            }
        });

}


$(document).ready(function(){

    $('#errorMensagem').hide();
    $('#tableListaRelatorio').hide();
    $('#btnDownloadRelatorioCSV').hide();
    $('#btnDownloadKML').hide();
    $('#btnDownloadRelatorioPDF').hide();
    $('#btnDownloadSHP').hide();
    $('#removeTabela').hide();
});




function gerarRelatorioPDF(){
    
    $.get("/usuario/tablerelatorio?dispositivoRelatorio="+$('#dispositivoRelatorio').val()+"&mensagemRelatorio="+$('#mensagemNoFiltroRelatorio').val()+'&dataRelatorio1='+$('#dataRelatorio1').val()+'&dataRelatorio2='+$('#dataRelatorio2').val(),function(data)
       {
           initPDF(data); 
       });
    
    //  $.ajax({
    //      url:"/usuario/tablerelatoriopdf?dispositivoRelatorio="+$('#dispositivoRelatorio').val()+"&mensagemRelatorio="+$('#mensagemNoFiltroRelatorio').val()+'&dataRelatorio1='+$('#dataRelatorio1').val()+'&dataRelatorio2='+$('#dataRelatorio2').val(),
    //      method:"get",
    //      datatype: 'json',
    //      success:initPDF(data) //function(data){
    //          //initPDF(data);
    //      //}
    //  })
};


function VerificaRelatorio (){
     //ROTA PARA BUSCAR OS DADOS DOS USUÁRIOS.
    

     if(!( $('#dataRelatorio1').val() && $('#dataRelatorio2').val() ))
     {
        $('#quandoClica').removeClass('loader');
         alertify.alert("","Informa ao menos um intervalo.");
     
        return false;
     }
      
     $('#quandoClica').addClass('loader');
     $('#tableListaRelatorio').show();
     $('#btnDownloadRelatorioCSV').show();
     $('#btnDownloadKML').show();
     $('#btnDownloadRelatorioPDF').show();
     $('#removeTabela').show(); 
     $('#btnDownloadSHP').show();

                var tableRelatorioCSV = $('#tableListaRelatorio').DataTable();
                tableRelatorioCSV.destroy();         
                $('#tableListaRelatorio').empty();
         

                $('#tableListaRelatorio').append('<thead> <tr> <th> Nome </th> <th> Dispositivo </th>'+
                '<th> Mensagem </th> <th> Latitude </th> <th> Longitude </th> <th> Data </th> <th> hora </th>'+
                '</tr> </thead>');   

                $.ajax({
                     url:"/usuario/tablerelatorio?dispositivoRelatorio="+$('#dispositivoRelatorio').val()+"&mensagemRelatorio="+$('#mensagemNoFiltroRelatorio').val()+'&dataRelatorio1='+$('#dataRelatorio1').val()+'&dataRelatorio2='+$('#dataRelatorio2').val(),
                     method:"get",
                     datatype: 'json',
                     success: function(data){
                     tableRelatorioCSV =  $('#tableListaRelatorio').dataTable({
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
                                {"data" : "userDispositivo[0].nome",
                                    "defaultContent": ""},
                                {"data" : "dispositivo.nome",
                                     "defaultContent":""},                                
                                {"data" : "mensagem"},
                                {"data": "lat",
                                    "defaultContent": ""},
                                {"data": "lng",
                                    "defaultContent": ""},
                                {"data": "data"},
                                {"data": "hora"}                      
                    
                            ],
                               
                            });
                           },
                           complete: function(){
                               $('#quandoClica').removeClass('loader');;
                               
                           }
                          });
                
                                    
         };


        function gerarKML(){
            $('#tlcRelatorio').attr('action','/usuario/gerarkml');
            $('#tlcRelatorio').submit();
            // $.get("/usuario/gerarkml?dispositivoRelatorio="+$('#dispositivoRelatorio').val()+"&mensagemRelatorio="+$('#mensagemNoFiltroRelatorio').val()+'&dataRelatorio1='+$('#dataRelatorio1').val()+'&dataRelatorio2='+$('#dataRelatorio2').val() );
         }
        
        function gerarCSV(){
            $('#tlcRelatorio').attr('action','/usuario/gerarelatorio');
            $('#tlcRelatorio').submit();
        }
<<<<<<< HEAD
// -  /usuario/gerarelatorio


function AdicionarQuebraDeLinha(valorComVirgula){

        return valorComVirgula.split('\u0152').join('\n');
    }


function mascaraTelefone_DataList(){

    var inputDispoEdit = document.getElementById("editarDispositivoUser");
    inputDispoEdit.setAttribute("list","dispositivosDataListEditar");

    var listaDispositivosEdit = document.createElement("datalist");
    listaDispositivosEdit.setAttribute("id","dispositivosDataListEditar");

    inputDispoEdit.appendChild(listaDispositivosEdit);
  
    $.get('/dispositivo/cadatrados', preencherDataListEditar);

    var auxCel;
$(".telefone").on('input propertychange',function(){
 		console.log("Carregou o Script!");
    var texto = $(this).val();
    
    texto = texto.replace(/[^\d]/g, '');
    
    if (texto.length > 0)
    {
    texto = "(" + texto;
        
        if (texto.length > 3)
        {
            texto = [texto.slice(0, 3), ") ", texto.slice(3)].join('');  
        }
        if (texto.length > 12)
        {      
            if (texto.length > 13) {
            		//alert(texto.length);
                var x = texto.substring(0,7);
                if(x == "(08) 00"){
                    texto = texto.replace('(','').replace(')','').replace('-','').replace(/\s+/, ""); 
                    texto = texto.substr(0,4)+" "+texto.substr(4);	   
                
                    }else{
                    //alert(texto.length)
                    texto = [texto.slice(0, 10), "-", texto.slice(10)].join('');
                    
                    }
               }

            else{
            		//alert(texto.length)
                 texto = [texto.slice(0, 9), "-", texto.slice(9)].join('');
                }
        
        }                 
        if (texto.length > 15 && texto.length <= 16 ){
            
               texto = texto.replace('(','').replace(')','').replace('-','').replace(/\s+/, ""); 
               texto =  texto.substr(0,2)+" "+texto.substr(2);
               texto =  texto.substr(0,5)+" "+texto.substr(5);
               texto =  texto.substr(0,10)+"-"+texto.substr(10);
                
               auxCel = "+"+ texto;
               
               
               
               texto = auxCel;
              // alert(texto.length)
               }
               else if(texto.length > 16){
               		if(auxCel){
                  		texto = auxCel;
                        auxCel = false;
                  }else{
               			texto = texto.substr(0,16);
                        }
               }
    }
   $(this).val(texto);     
});

}
=======

        function gerarSHP(){
            $('#tlcRelatorio').attr('action','/usuario/gerarSHP');
            $('#tlcRelatorio').submit();
        }
// -  /usuario/gerarelatorio
>>>>>>> f441cccb7120592f7b26185fdcdfb29c6022939a
