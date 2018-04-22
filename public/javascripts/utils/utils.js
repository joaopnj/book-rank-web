function getPosition(lat,lng){
    navigator.geolocation.getCurrentPosition(function (err, position) {
        if (err) throw err;
        lng = position.coords.longitude;
        lat = position.coords.latitude;
        console.log("Latitude "+position.coords.latitude+"\n"+"Longitude "+position.coords.longitude);
    });
}

$(document).ready(function(){
	$('#controlDevice').click(function(event) {
		$(this).toggleClass('close_device');
		$('.panel_device').toggleClass('show_device');
	});
    $('#fecharModal').click(function(){
        $('.close').trigger('click');
    });

    $('.box_icone_nav').click(function (e){
       $(this).toggleClass('menufixo');
    });


    var colunaTable = true;
    $('#control-grid').click(function (e){
        $('.coluna-control').toggleClass('disable-coluna');
        if(colunaTable){
            colunaTable = false;
            $(this).find('i').removeClass('glyphicon-eye-open');
            $(this).find('i').addClass('glyphicon-eye-close');
            $(this).find('span').text('Ocultar todos os campos');
        }else{
            colunaTable = true;
            $(this).find('i').removeClass('glyphicon-eye-close');
            $(this).find('i').addClass('glyphicon-eye-open');
            $(this).find('span').text('Exibir todos os campos');
        }
    });


    qtdMensagens = parseInt($("#qtdSosAjuda").text());

    if(qtdMensagens === 0){
        $('.qtd_notificacao').css('display','none');
    }

    if(qtdMensagens <= 1){
        $("#controlPluralMensagem").text(' Emergência');
    }else{
        $("#controlPluralMensagem").text(' Emergências');
    }

});