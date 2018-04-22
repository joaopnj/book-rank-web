//VARIAVEL GLOBAL PARA O MAP SER ENCONTRADO NAS FUNÇÕES.
var map;

//FUNÇÃO PARA CRIAR MAPA ASSIM QUE ENTRA NA TELA, ESSENCIAL PARA ATUALIZAR APENAS O MAPA.
$(document).ready(function(){
  CreateMap();
});


//Função de Criar o Mapa
function CreateMap(){
  //CORRDENADAS ONDE O MAPA IRÁ FOCAR,
  var myLatLng = {lat: -13.123800 , lng: -50.8998864 };
  //CRIANDO O MAPA
  map = new google.maps.Map(document.getElementById('map'), {
  //Opções para aparencia do mapa.
  zoom: 4, //ZOOM É OBRIGATORIO.
  center: myLatLng, // CENTER É OBRIGATORIO.
  maxZoom: 20, //ZOOM DE APROXIMAÇÃO.
  minZoom: 2,  // ZOOM DE AFASTAMENTO.
  zoomControl: true,
  zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
  },
  streetViewControl: false

});
}

//ICONES DOS MARKES
var iconSOS = 'images/SOS_B1.png';
var iconAlarme = 'images/Alarme_B1.png';
var iconSigaMe = 'images/sigaMe_B1.png';
var iconOk = 'images/Ok_B1.png';
var iconPersonalizada = 'images/Personalizada_B1.png';


var somAlarme = new Audio("audio/Alarme.mp3");


//Variavel global que recebe os dados do dispositivo.
//var markersData;

//Variavel para fazer os traços entre dois pontos.
var flightPath;



//VARIAVEL PARA MOSTRAR ROTA, CASO SEJA UTILIZADO A ROTA.
var directionsDisplay;

//VARIAVEL PARA CONFIGURAR O ZOOM DE ACORDO COM OS MARKERS DO MAPA.
var bounds;


var Estacaorevisada;
var EstacaoExtenso;
var trechoFerro;
var ambiente15m1;
var ambiente15m2;

var vetorDeMarkers = [];

//FUNÇÃO QUE DESENHA OS MAPAS 
function InitMap(dispositivos) {
  
  if(vetorDeMarkers.length > 0){
    removerMarcadores(vetorDeMarkers);
    
  }
//CONVERTE O VALOR DE STRING PARA JSON
var markersData  = JSON.parse(dispositivos);

//FUNÇÃO QUE CRIA A TABELA, PARA ELA DAR IMPRESSÃO DE SER DINÂMICA
  gerarTabela(markersData);
  
// Cria a nova Info Window com referência à variável infoWindow.
// O conteúdo da Info Window é criado na função createMarker.
 infoWindow = new google.maps.InfoWindow();

  //CONDIÇÃO PARA O MAPA NÃO FOCAR NA ÁGUA.
  if (markersData.length > 0){
   //FUNÇÃO QUE CRIA OS MARKER NO MAPA E SUA INFOWINDOWS  
    displayMarkers(markersData);
   }

  //DEFINE EM QUE MAPA SERÁ MOSTRADO A ROTA. SEM FUNCIONALIDADE NO MOMENTO.
 //directionsDisplay.setMap(map);

 //RouteMap - ESSA FUNÇÃO GERA ROTA, POR ENQUANTO ENTRE DOIS PONTOS APENAS, VERIFICAR SE É POSSÍVEL MAIS.
 //RouteMap();

 //map.data.loadGeoJson('Ferrovia.json');

  // //FUNÇÃO QUE LIGA OS MARKERS ATRAVÉS DE UMA LINHA(Polyline)
  // PolyMap(markersData);

}

function removeLines(){
  flightPath.setMap(null);
}


//FUNÇAO QUE CONECTA OS MARKERS POR LINHAS.
function PolyMap(markersData){
  

  for (var i = 0; i < markersData.length; i++){
  
  var aux =true;
  
    if(typeof markersData[i].lng !== 'undefined' && typeof markersData[i].lat !== 'undefined'){

      for (var j = i+1; j < markersData.length; j++){
    
      //COMPARAÇÃO PARA APENAS OS MESMOS DISPOSITIVOS SEJAM CONECTADOS
      //   if(markersData[i].dispositivo.imei === markersData[j].dispositivo.imei && aux){
    
        if(markersData[i].dispositivo.nome == markersData[j].dispositivo.nome && aux){
        //PASSA AS POSIÇÕES DOS DOIS DISPOSITIVOS IGUAIS ENCONTRADOS
    
        var cordenadas  =[
        {lat: markersData[i].lat, lng: markersData[i].lng},
        {lat: markersData[j].lat, lng: markersData[j].lng}
        ];

        //REPOSAVEL POR FAZER A LIGAÇÃO DOS PONTOS ONDE O PATH FOI DEFINIDO NA VARIAVEL CORDENADAS.
          flightPath = new google.maps.Polyline({
            path: cordenadas,
            geodesic: true,
            strokeColor: cores[Math.floor(markersData[i].dispositivo.nome[markersData[i].dispositivo.nome.length-1])] //ultimo algarismo da variavel
          // strokeColor: cores[Math.floor(markersData[i].dispositivo.imei[markersData[i].dispositivo.imei.length-1])]
          });

        //aux = false PARA QUE A LINHA SEJA LIGADA APENAS AO SEU SUCESSOR.
        aux = false;

          //INDICA EM QUAL MAPA SERÁ DESENHADO O Polyline.
        flightPath.setMap(map);
      }


     }
    }
 }

}

//PARAMETROS SÃO PASSADOS NA FUNÇÃO DISPLAYMARKERS.
function createMarker(latlng ,  passo , ultimo, item ){
  
   //CRIANDO O MARKER NO MAPA
   var marker = new google.maps.Marker({
      icon: null,
       label:{
             color : "#000000",
             text : passo.toString(),
             fontSize: '8px',
             fontWeight:'900'
              },
      map: map, //OBRIGATORIO
      position: latlng    //OBRIGATORIO
   });  


   //DE ACORDO COM O PARAMETRO PASSADO É SETADO O ICONE DO MARKER
   //CADA MARKER POSSUI UM LABELORIGIN DIFERENTE PARA QUE O NUMERO SEJA CENTRALIZADO, NO BALÃO.POIS OS TAMANHOS
   //SÃO DIFERENTES.
   switch (item.mensagem){
          case 'SIGA-ME':          
              marker.icon = {url: iconSigaMe,
              labelOrigin: new google.maps.Point(32.5, 6.5) };        
            break;
          case 'ESTOU-AQUI'://'OK':
              marker.icon = {url: iconOk,
              labelOrigin: new google.maps.Point(31.5, 6.5) };
            break;
          case 'PERSONALIZADA':
              marker.icon = {url: iconPersonalizada,
              labelOrigin: new google.maps.Point(24.5, 6) };
            break;
          case 'SOS':

            marker.icon = {url: iconSOS,
            labelOrigin: new google.maps.Point(31.5, 6.5)};                        
            marker.setAnimation(google.maps.Animation.BOUNCE);
              if(item.visto === true || !ultimo){
                  marker.setAnimation(null);
                  somAlarme.pause();              
              }
              else{
                  $('#mostrar_notificacao').show();  
                  somAlarme.play();
                  NotificacaoSOS();                  
              }
            break;
          case 'QUEDA':
          case 'AJUDA': 
            marker.icon = {url: iconAlarme,
            labelOrigin: new google.maps.Point(36.5, 5.5) };             
            marker.setAnimation(google.maps.Animation.BOUNCE);
                if(item.visto === true || !ultimo)
                  marker.setAnimation(null);
                  else{
                    $('#mostrar_notificacao').show();  
                     somAlarme.play();                     
                     NotificacaoAjuda(item.dispositivo.nome);
                     
                  }
            break;
            
         }

   //CAIXA DE INFORMAÇÃO GERADA NO CLICK
   google.maps.event.addListener(marker, 'click', function() {

      var iwContent;
      //BUSCA REALIZADO POR USUÁRIO, OU TELA PRINCIPAL.
      if(item.userDispositivo[0] !== undefined ){

        iwContent = '<div id="iw_container">' +
        '<div class="iw_title"> <strong> Usuário:</strong> '+ item.userDispositivo[0].nome+'  &nbsp'+item.userDispositivo[0].sobrenome +' &nbsp <a href="#"  title="Editar Usuario",  id="esconderNoInicio" , data-toggle="modal" data-target="#modalUsuario"  onclick=selPersona(\'' + JSON.stringify      (item.userDispositivo[0],substitui)+ '\'); > <img class="icone-modal-map" src="images/visualizar.svg"/> </a></div>'+
        '<div class="iw_content"> <strong> Dispositivo:</strong> '+item.dispositivo.nome +'</br> <strong> Mensagem:</strong> '+ item.mensagem+
        '</br><strong> Localização:</strong> '+ latlng + '</br> <strong> Data:</strong> '+item.data+'</br> <strong> Hora:</strong> '+item.hora+
        '</div>';
      }
      else if(item.user){
        //BUSCA REALIZADA POR OUTRO ATRIBUTO.
          if(item.user[0]=== undefined){
            iwContent = '<div id="iw_container">' +
            '<div class="iw_title"><strong> Usuário:</strong> Sem Usuário </div>' +
            '<div class="iw_content"><strong> Dispositivo: </strong>'+item.dispositivo.nome +'</br><strong> Mensagem:</strong> '+ item.mensagem+
            '</br><strong>Localização:</strong> '+latlng+'</br><strong>Data:</strong> '+item.data+ '</br><strong>Hora:</strong> '+item.hora+
            '</div>';
          }else{
            //BUSCA QUANDO NÃO POSSUI USUÁRIO.
              iwContent = '<div id="iw_container">' +
              '<div class="iw_title"> <strong> Usuário:</strong> '+ item.user[0].nome+'  &nbsp'+item.user[0].sobrenome +' &nbsp <a href="#"  title="Editar Usuario", name="esconderNoInicio" type="button", id="esconderNoInicio" , data-toggle="modal" data-target="#modalUsuario"  onclick=selPersona(\'' + JSON.stringify(item.user[0],substitui)+ '\');> <img class="icone-modal-map" src="images/visualizar.svg"/> </a></div>'+
              '<div class="iw_content"><strong> Dispositivo:</strong> '+item.dispositivo.nome +'</br><strong> Mensagem:</strong> '+ item.mensagem+
              '</br><strong>Localização:</strong> '+ latlng + '</br><strong>Data:</strong>'+item.data+'</br><strong>Hora:</strong> '+item.hora+
              '</div>';
            }
      }
    else {
      //BUSCA QUANDO NÃO POSSUI USUÁRIO.
      iwContent = '<div id="iw_container">' +
      '<div class="iw_title"><strong> Usuário:</strong> Sem Usuário </div>' +
      '<div class="iw_content"><strong> Dispositivo: </strong>'+item.dispositivo.nome +'</br><strong> Mensagem:</strong> '+ item.mensagem+
      '</br><strong>Localização:</strong> '+latlng+'</br><strong>Data:</strong> '+item.data+ '</br><strong>Hora:</strong> '+item.hora+
      '</div>';
      }

      

      
      // O conteúdo da variável iwContent é inserido na Info Window.
      infoWindow.setContent(iwContent);

      // A Info Window é aberta com um click no marcador.
      infoWindow.open(map, marker);
      marker.setAnimation(null);
      somAlarme.pause();
     // getInformacaoQualquer(item.dispositivo.imei,item.dispositivo.nome);
      getInformacaoQualquer(item.dispositivo.nome); // PARAR AS ANIMAÇÕES DOS MARKERS.

     });

     vetorDeMarkers.push(marker);
     

}

function displayMarkers(markersData){

   // esta variável vai definir a área de mapa a abranger e o nível do zoom
   // de acordo com as posições dos marcadores
   var bounds = new google.maps.LatLngBounds();

   var latlng;
   // Loop que vai percorrer a informação contida em markersData
   // para que a função createMarker possa criar os marcadores
   var passo =[];

  for (var i = 0; i < markersData.length; i++){

        passo [i] = 1;
   

       if(typeof markersData[i].lng !== 'undefined' && typeof markersData[i].lat !== 'undefined'  ){
          latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
        }
     
     //Contador de passos
       for (var j= i+1; j < markersData.length ;j++){

           //if(markersData[i].dispositivo.imei === markersData[j].dispositivo.imei){
           if(markersData[i].dispositivo.nome === markersData[j].dispositivo.nome){
              passo[i] = passo[i] + 1;
            }

          }
        //  //PEGA O ULTIMO PASSO PARA SABER SE TEM QUE TER O ALARME OU NÃO.
        var ultimo = eUltimo(markersData, markersData[i].dispositivo.nome); //(markersData, markersData[i].dispositivo.imei);


         //Parametros que são passados para a manipulação dos dados.    
         if(typeof markersData[i].lng !== 'undefined' && typeof markersData[i].lat !== 'undefined'  ){
           createMarker(latlng,passo[i], ultimo,markersData[i]);
          }
          else if((markersData[i].mensagem == 'SOS' ) && markersData[i].visto === false){
           // $.get("/principal/notification");
           somAlarme.play();
           NotificacaoSOS(markersData[i].dispositivo.nome);
          }
          else if(( markersData[i].mensagem == 'AJUDA'|| markersData[i].mensagem == 'QUEDA') && markersData[i].visto === false){
            NotificacaoAjuda(markersData[i].dispositivo.nome);
            somAlarme.play();
          }

           // Os valores de latitude e longitude do marcador são adicionados à
           // variável bounds que adapta o zoom.   
          if(typeof markersData[i].lng !== 'undefined' && typeof markersData[i].lat !== 'undefined'  ){
            bounds.extend(latlng);
        }


   }

   // Depois de criados todos os marcadores,
   // a API, através da sua função fitBounds, vai redefinir o nível do zoom
   // e consequentemente a área do mapa abrangida de acordo com
   // as posições dos marcadores
  

   //FUNÇÃO QUE LIGA OS MARKERS ATRAVÉS DE UMA LINHA(Polyline)
   PolyMap(markersData);
  
   map.fitBounds(bounds);
   
   
}

//USADO PARA DEFINIR AS CORES DA LINHA, ULTIMO VALOR DO NOME DO dispositivo.
var linha;
var cores = ['#000080', //Azul
'#FF1493', // Rosa
'#FF4500', // Laranja
'#006400', // Verde
'#000000 ', // Preto
'#660066 ', //Roxo
'#993333', // Marrom
'#003300 ', //verde musgo
];

function removerMarcadores(vetorDeMarkers){
  removeLines();
  vetorDeMarkers.forEach(function(element) {
    element.setMap(null);    
  }, this);

  vetorDeMarkers.length = 0;
  
}



//count = 0;
// //Para a animação acontecer apenas no ultimo marker;
function eUltimo(dispositivo,imei)
{
  
  for (var i = 0; i < dispositivo.length;i++)
    {

        //if(dispositivo[i].dispositivo.imei == imei)
        if(dispositivo[i].dispositivo.nome === imei)
          return false;
    }

    return true;
}

//FUNÇÃO QUE CENTRALIZA O MAPA DE ACORDO COM O CLICK NA TABELA.
function mostrarMarker(nome,data, mensagem, posicaoTabela){

    for(var i =0; i < posicaoTabela.length; i ++ ){

        //IMPEDE A CENTRALIZAÇÃO CASO A POSIÇÃO CLICADA NÃO TENHA LATITUDE E LONGITUDE.
        if(nome == posicaoTabela[i].dispositivo.nome && data == posicaoTabela[i].hora){ 
            if(typeof posicaoTabela[i].lng !== 'undefined' && typeof posicaoTabela[i].lat !== 'undefined'  ){
          
              var latlng  = new google.maps.LatLng(posicaoTabela[i].lat, posicaoTabela[i].lng);
                map.setZoom(19);
                map.panTo(latlng);
              //map.setCenter(latlng);
              
                        var marker = new google.maps.Marker({                                                
                                icon: null,
                                map: map, //OBRIGATORIO
                                position: latlng,    //OBRIGATORIO
                            });

                             switch (mensagem){
                              case 'SIGA-ME':
                                marker.icon = {url: iconSigaMe };
                                break;
                              case 'ESTOU-AQUI'://'OK':
                                  marker.icon = {url: iconOk };
                                break;
                              case 'PERSONALIZADA':
                                  marker.icon = {url: iconPersonalizada };
                                break;
                              case 'SOS':
                                marker.icon = {url: iconSOS};                            
                                break;
                              case 'QUEDA':
                              case 'AJUDA': //'ALARME':
                                marker.icon = {url: iconAlarme};                               
                                break; 
                               
                            }
                        
                      marker.setAnimation(google.maps.Animation.BOUNCE);
                      setTimeout(function(){
                        marker.setAnimation(null);
                        marker.setMap(null);                     
                      },750);
                      getInformacaoQualquer(nome);  
                      
            }
                  else{
                      getInformacaoQualquer(nome);

                      if(somAlarme.currentTime > 0)
                        somAlarme.pause();
                     
                    return  toastr.info("Não foi possível pegar a Posição desse alarme!");//alertify.alert("","Não foi possível pegar a posição desse Alarme !")
                  }
        }
    }

}


//FUNÇÃO DAS LINHAS FERREAS DA VALE.
function EstacaoRevisada(trechos){

  if((document.getElementById("checkbox1").checked === true) && (trechos == "LIFELINK" || trechos == "VLI" || trechos == "ATHENE" ||trechos == "MEDICAR" )){
   Estacaorevisada =  new google.maps.KmlLayer({
       url:'https://sites.google.com/site/kmlmapateste/testenovodestation/estacaoRevisada3.kml',  //'https://sites.google.com/site/kmlmapateste/estrevisada/estacaoRevisada.kml',
       preserveViewport: true,
       map: null
    });

    Estacaorevisada.setMap(map);

  }else{

     Estacaorevisada.setMap(null);
  }
}


function ExtensoEstacao(trechos){

  if((document.getElementById("checkbox2").checked === true) && (trechos == "LIFELINK" || trechos == "VLI" || trechos == "ATHENE" ||trechos == "MEDICAR")){
    EstacaoExtenso =  new google.maps.KmlLayer({
       url:'https://sites.google.com/site/kmlmapateste/estacaoextensonova/estacoesExtenso1.kml',//'/VLI_MAPAS/Ferrovia.kml',
       preserveViewport: true,
       map: null
    });
    EstacaoExtenso.setMap(map);

  }
  else{

     EstacaoExtenso.setMap(null);
  }
}


function FerroTrecho(trechos){

  if((document.getElementById("checkbox3").checked === true) && (trechos == "LIFELINK" || trechos == "VLI"|| trechos == "ATHENE" ||trechos == "MEDICAR" )){
    trechoFerro =  new google.maps.KmlLayer({
       url:'https://sites.google.com/site/kmlmapateste/trechopequenho/trechoFerroviario.kml',//'/VLI_MAPAS/Ferrovia.kml',
       preserveViewport: true
    });
    trechoFerro.setMap(map);


  }
  else{

     trechoFerro.setMap(null);
  }
}


function AtlanticaLinha(trechos){

  if((document.getElementById("checkbox4").checked === true) && (trechos == "LIFELINK" || trechos == "VLI" || trechos == "ATHENE" ||trechos == "MEDICAR")){
 ambiente15m1 =  new google.maps.KmlLayer({
       url:'https://sites.google.com/site/kmlmapateste/trechogrande1/meioAmbienteAtlantica.kml',//'/VLI_MAPAS/Ferrovia.kml',
       preserveViewport: true

    });
    ambiente15m1.setMap(map);

 ambiente15m2 =  new google.maps.KmlLayer({
       url:'https://sites.google.com/site/kmlmapateste/trechogrande2/atlanticapt2.kml',//'/VLI_MAPAS/Ferrovia.kml',
       preserveViewport: true

    });
   ambiente15m2.setMap(map);

  }
  else{

     ambiente15m1.setMap(null);
     ambiente15m2.setMap(null);
  }
}


// //BASE PARA CRIAÇÃO DA COMUNICAÇÃO AJAX.
//   var request = null;
//   function createRequest() {
//     try {
//       request = new XMLHttpRequest();
//     }
//     catch (trymicrosoft){
//       try {
//          request = new ActiveXObject("Msxml2.XMLHTTP");
//         } catch (othermicrosoft){
//            try {
//              request = new ActiveXObject("Microsoft.XMLHTTP");
//              } catch (failed)
//               { request = null; }
//             }
//           } if (request == null)
//            alert("Error creating request object!");
//         }


// //FUNÇÃO PARA ACABAR COM O A ANIMAÇÃO E O AUDIO APOS O CLICK.
//   function getInformacaoQualquer(nome) {
//      createRequest();
//      //var url = "/principal/viu?imei="+imei+"&nome="+nome+"&visto=true";
//      var url = "/principal/viu?nome="+nome+"&visto=true";
//      request.open("POST", url, true);
//      request.onreadystatechange = atualizaPagina;
//      request.send();// "imei="+imei+"&nome="+nome+"&status=TRUE"
//   }


// //FUNÇÃO QUE VERIFICA SE A COMUNICAÇÃO OCORREU.
// function atualizaPagina() {
//   if (request.readyState == 4) {
//     var respostaDoServidor = request.responseText;
//   }
// }








