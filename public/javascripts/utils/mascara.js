$(document).ready(function(){
$(function(){
    $("[name^=dat]").datepicker({dateFormat: 'dd/mm/yy',

        dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
        changeYear: true
    });
});
});

//TODO: Teste do to do.
// $(document).ready(function(){
// $(function(){


// $("#datepicker").on('focus','.datepicker', function(){
//     $(this).datepicker({
//         autosize:true
//     });
// });


           
//         });
//     });

 $(function() {
//     $('#telefone').mask("(99) 9999-9999");
//     $("#telefone1").mask("(99) 9999-9999");
//     $("#UsuarioResidencia").mask("(99) 9999-9999");
//     $("#Usuariocelular").mask("(99) 99999-9999");
     $("[name^=cep]").mask("99999-999");
//     //$("#usuarioceluar").mask("(99) 99999-9999");
//     $("[name^=celu]").mask("(99) 99999-9999");
//     $("[name^=Celu]").mask("(99) 99999-9999");
//     $("[name^=Tel]").mask("(99) 9999-9999");
//     $("[name^=tel]").mask("(99) 9999-9999");
//     $("[name^=tel]").mask("(99) 9999-9999");
     $("[name^=cpf]").mask("999.999.999-99");
     $("[name^=data]").mask("99/99/9999");
//     $("[name^=telComercial]").unmask();


 });


function upperCaseF(a){
    setTimeout(function(){
        a.value = a.value.toUpperCase();
    }, 1);
}

function lowerCaseF(b){
    setTimeout(function(){
        b.value = b.value.toLowerCase();
    }, 1);
}
// $(document).ready(function() {
//     $('#tabela').DataTable( {
//         "scrollY":        "250px",
//         "scrollCollapse": true,
//         "paging":         false,
//         "searching":         false
//     } );
// });