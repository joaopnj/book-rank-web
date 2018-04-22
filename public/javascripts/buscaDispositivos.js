
$(document).ready(function(){   

    criaDataListCreate();     

});


function criaDataListCreate(){

    var inputDispo = document.getElementById("dispositivoUser");
    inputDispo.setAttribute("list","dispositivosDataList");

    var listaDispositivos = document.createElement("datalist");
    listaDispositivos.setAttribute("id","dispositivosDataList");

    inputDispo.appendChild(listaDispositivos);
  
    $.get('/dispositivo/cadatrados', preencherDataList);
}

function preencherDataList(data,status){

            var option = [];
                $.each(data, function(i, obj){
						
						option[i] = document.createElement('option');//criando o option
						$( option[i] ).attr( {value : obj.nome} );//colocando o value no option
						//$( option[i] ).append( obj );//colocando o 'label'                        
                        
						$("#dispositivosDataList").append( option[i] );
                      
                     });
}






//codigo para mascara universal
// var aux;
// $("#phone").bind('input propertychange',function(){
 		
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
//               if(x == "(08) 00"){
//                 texto = texto.replace('(','').replace(')','').replace('-','').replace(/\s+/, ""); 
// ;									texto = texto.substr(0,4)+" "+texto.substr(4);	   
              
//                 }else{
//                 //alert(texto.length)
//                 texto = [texto.slice(0, 10), "-", texto.slice(10)].join('');
                
//                 }
//                }
//             else{
//             		//alert(texto.length)
//                 texto = [texto.slice(0, 9), "-", texto.slice(9)].join('');
//                 }
        
//         }                 
//             if (texto.length > 15 && texto.length <= 16 ){
//             	     texto = texto.replace('(','').replace(')','').replace('-','').replace(/\s+/, ""); 
//                texto =  texto.substr(0,2)+" "+texto.substr(2);
//                texto =  texto.substr(0,5)+" "+texto.substr(5);
//                texto =  texto.substr(0,10)+"-"+texto.substr(10);
                
//                aux = "+"+ texto;
               
               
               
//                texto = aux;
//               // alert(texto.length)
//                }else{
//                		if(aux){
//                   		texto=aux;
//                       aux = false;
//                   }else{
//                			texto = texto.substr(0,16);
//                }
//                }
//     }
//    $(this).val(texto);     
// })

// var auxTel;
// $("[name^=tel]").on('input propertychange',function(){
 		
//     var texto = $(this).val();
    
//     texto = texto.replace(/[^\d]/g, '');
    
//     if (texto.length > 0)
//     {
//          texto = "(" + texto;
        
//         if (texto.length > 3)
//             {
//                 texto = [texto.slice(0, 3), ") ", texto.slice(3)].join('');  
//             }

//         if (texto.length > 12)
//         {      
//             if (texto.length > 13) {
//             		//alert(texto.length);
//               var x = texto.substring(0,7);
//               if(x == "(08) 00"){
//                 texto = texto.replace('(','').replace(')','').replace('-','').replace(/\s+/, ""); 
// 				texto = texto.substr(0,4)+" "+texto.substr(4);	   
              
//                 }
//                 else{
//                 //alert(texto.length)
//                     texto = [texto.slice(0, 10), "-", texto.slice(10)].join('');
//                 }
//                }
//             else{
//             		//alert(texto.length)
//                 texto = [texto.slice(0, 9), "-", texto.slice(9)].join('');
//                 }
        
//         }                 
//             if (texto.length > 15 && texto.length <= 16 ){
//                texto = texto.replace('(','').replace(')','').replace('-','').replace(/\s+/, ""); 
//                texto =  texto.substr(0,2)+" "+texto.substr(2);
//                texto =  texto.substr(0,5)+" "+texto.substr(5);
//                texto =  texto.substr(0,10)+"-"+texto.substr(10);
                
//                auxTel = "+"+ texto;
              
//                texto = auxTel;
//               // alert(texto.length)
//                }else if(texto.length > 16) {
//                         if(aux){
//                             texto = auxTel;
//                         auxTel = false;
//                     }else{
//                             texto = texto.substr(0,16);
//                     }
//                }
//     }
//    $(this).val(texto);     
// });


// var auxCel;
// $("[name^=cel]").on('input propertychange',function(){
 		
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
//                		if(aux){
//                   		texto = auxCel;
//                         auxCel = false;
//                   }else{
//                			texto = texto.substr(0,16);
//                         }
//                }
//     }
//    $(this).val(texto);     
// });

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

