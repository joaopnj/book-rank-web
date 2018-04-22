$(document).ready(function(){

    $('#botãoTrocarAparelho').click(function(){
        $('#modalTrocaDispositivo').modal();

        
        $.get('/usuario/trocar_dispositivo?identificador='+$('#tl_editar_identificador_usuario').val(),preencherSelect);


        $('#tl_trocar_dispositivoAtual').val( $('#editarDispositivoUser').val() );


       

    });

    $("#dispositivoNovo").change(function(){
        console.log("Valor Selecionado "+  $("#dispositivoNovo option:selected").val())
    });

    $('#btn_realiza_troca').click(function(){
        
        var Troca = {
            id_atual : $('#Tl_editarUsuario_id_Usuario').val(),
            dispositivo_atual : $('#tl_trocar_dispositivoAtual').val(),
            dispositivo_id_novo: $("#dispositivoNovo option:selected").val()
        }

        $.post('/usuario/realizar_troca?informacoes='+JSON.stringify(Troca),function(dados){
            if(dados){
                alertify.alert("","Troca realizada !");
                location.reload();
            }
        });
    });
});


function preencherSelect(dados){
    
    dados.forEach(function(element) {
        var device = element.dispositivo.substring(4)

        $('#dispositivoNovo').append('<option value="'+element.dispositivo+'-'+element._id+'"> '+device+' - '+element.nome + '</option>"');
    }, this);


}