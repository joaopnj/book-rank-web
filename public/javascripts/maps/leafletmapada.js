
//VARIAVEL QUE RECEBE OS MARKER, TEM QUE SER UMA ARRAY.
var posicoesMarkers = new Array();

//VARIAVEL GLOBAL, PARA QUE A VARIAVEL MAP, SEJA VISTA EM TODOS OS METODOS.
var map;
//-------------------------------------------------------------------------
//        Leaflet Implantar aqui.

//CONFIGURAÇÃO DOS ICONES QUE SERÃO UTILIZADOS, NO LEAFLET É NECESSÁRIO CONFIGURAR O ICONE FICAR PROPORCIONAL.
var SosIcon = L.icon({
    iconUrl: 'images/SOS.png',
    iconSize:     [25, 41], //[40, 38], // size of the icon
    shadowSize:   [50, 70], // size of the shadow
    iconAnchor:   [14, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 69],  // the same for the shadow
    popupAnchor:  [-8, -39], // point from which the popup should open relative to the iconAnchor    
    labelAnchor: [8, -30]
    
});

var AlarmeIcon = L.icon({
    iconUrl: 'images/Alarme.png',
    iconSize:     [25, 41], //[40, 38], // size of the icon
    shadowSize:   [50, 70], // size of the shadow
    iconAnchor:   [14, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 69],  // the same for the shadow
    popupAnchor:  [-8, -39], // point from which the popup should open relative to the iconAnchor    
    labelAnchor: [8, -30]
});

var SigameIcon = L.icon({
    iconUrl: 'images/sigaMe.png',
     iconSize:     [25, 41], //[40, 38], // size of the icon
    shadowSize:   [50, 70], // size of the shadow
    iconAnchor:   [14, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 69],  // the same for the shadow
    popupAnchor:  [-8, -39], // point from which the popup should open relative to the iconAnchor  
    labelAnchor: [8, -30]
});


var OkIcon = L.icon({
    iconUrl: 'images/OK.png',
    iconSize:     [25, 41], //[40, 38], // size of the icon
    shadowSize:   [50, 70], // size of the shadow
    iconAnchor:   [14, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 69],  // the same for the shadow
    popupAnchor:  [-8, -39], // point from which the popup should open relative to the iconAnchor 
    labelAnchor: [8, -30]
});


var EstacaoIcon = L.icon({
    iconUrl: 'images/estacao.png',
    iconSize:     [25, 25], //[40, 38], // size of the icon
    shadowSize:   [50, 70], // size of the shadow
    iconAnchor:   [14, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 69],  // the same for the shadow
    popupAnchor:  [-8, -39], // point from which the popup should open relative to the iconAnchor    
    
    
});

var PersonalizadaIcon = L.icon({
    iconUrl: 'images/Personalizada.png',
    iconSize:     [25, 41], //[40, 38], // size of the icon
    shadowSize:   [50, 70], // size of the shadow
    iconAnchor:   [14, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 69],  // the same for the shadow
    popupAnchor:  [-8, -39], // point from which the popup should open relative to the iconAnchor    
    labelAnchor: [8, -30]
});


var markersData;
 var somAlarme = new Audio("audio/Alarme.mp3");

//FUNÇÃO QUE CRIA O MAPA 
//OS PARAMETROS SÃO ONDE ELE VAI CENTRALIZAR MAS O ZOOM INICIAL.
function CreateLeaflet(){
  map = L.map('map').setView([-13.123800, -50.8998864], 3);
 
 map.setMinZoom(3);
 
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
    L.control.zoom({
     position:'topright'
  }).addTo(map);

}
 
//FUNÇÃO PARA INICIAR O MAPA, QUANDO A PAGINA CARREGA, SE FOR USAR O LEAFLET ELA É NECESSÁRIA. 

// $(document).ready(function(){
//   CreateLeaflet();
// });

//FUNÇÃO PRINCIPAL QUE RECEBE OS PARAMETROS DA DIV PARA CRIAR OS MARKERS.
function InitMap(dispositivos){
 
 CreateLeaflet();

 markersData  = JSON.parse(dispositivos);

//FUNÇÃO QUE GERA A TABELA COM OS ALARMES.
 gerarTabela(markersData);

var passo =[];
//FUNÇÃO QUE CONTA OS PASSOS DO USUÁRIO.
 for(var i =0 ;i <  markersData.length ; i++){
   
  passo [i] = 1;

  for (var j= i+1; j < markersData.length ;j++){

        // if(markersData[i].dispositivo.imei === markersData[j].dispositivo.imei){           
           if(markersData[i].dispositivo.nome === markersData[j].dispositivo.nome){           
            passo[i] = passo[i] + 1;                   
            }         
              
      }      
//FUNÇÃO QUE CALCULA O ULTIMO PASSO DO DISPOSITIVO, PARA QUE OS EVENTOS FIQUEM APENAS NO ULTIMO.
  //var ultimo = MaiorPasso(markersData, markersData[i].dispositivo.imei);
  var ultimo = MaiorPasso(markersData, markersData[i].dispositivo.nome);

   
   var lng = markersData[i].lng;
   
   var lat = markersData[i].lat;

  //EVITA A CRIAÇÃO DE UM MARKER SEM LATITUDE E LONGITUDE.
    if(typeof lng !== 'undefined' && typeof lat !== 'undefined'  ){

      //FUNÇÃO PARA A CRIAÇÃO DOS MARKERS.
      createMarkers(lat, lng, markersData[i], passo[i], ultimo);

    }else if((markersData[i].mensagem == 'SOS') && markersData[i].visto == false){
      NotificacaoSOS();
      //$.get("/principal/notification");
    }
    else if((markersData[i].mensagem == 'AJUDA' || markersData[i].mensagem == 'QUEDA')&& markersData[i].visto == false )
      NotificacaoAjuda();
      
   //FUNÇÃO QUE CRIA AS LINHAS COM OS LIGAMENTOS DE CADA 
    if(typeof  lng !== 'undefined' && typeof lat !== 'undefined'){
      Ligacoes();
    }
  }
}

//VARIAVEL QUE PEGA O ULTIMO VALOR DO NOME DO DISPOSITIVO E CRIA A COR.
var cores = ['#000080', //Azul
'#FF1493', // Rosa
'#FF4500', // Laranja
'#006400', // Verde
'#000000 ', // Preto
'#660066 ', //Roxo
'#993333', // Marrom
'#003300 ', //verde musgo
];

function createMarkers(lat, lon, item, passo, ultimo){

      //INFOWINDOW PARA QUANDO O USUÁRIO ESTÁ NA TELA PRINCIPAL, OU PESQUISA PELO NOME DO USUÁRIO.
      if(item.userDispositivo[0] !== undefined){

              var popupText = '<div id="iw_container">' +
              '<div class="iw_title"><strong> Usuário:</strong> '+ item.userDispositivo[0].nome +'  &nbsp'+item.userDispositivo[0].sobrenome +' &nbsp <a href="#"  title="Editar Usuario", name="esconderNoInicio" type="button", id="esconderNoInicio" , data-toggle="modal" data-target="#modalUsuario"  onclick=selPersona(\'' + JSON.stringify(item.userDispositivo[0],substitui)+ '\');> <img class="icone-modal-map" src="images/visualizar.svg"/> </a></div>'+
              '<div class="iw_content"> <strong>Dispositivo:</strong> '+item.dispositivo.nome +'</br><strong> Mensagem:</strong> '+item.mensagem+
              '</br><strong>Localização: lat</strong>: '+ lat+'<strong> lon:</strong> ' + lon + '</br><strong>Data:</strong> '+item.data+'</br><strong>Hora:</strong> '+item.hora+'</div>';
            }
            else if(item.user){
              //QUANDO USUÁRIO PESQUISA ALGO SEM SER PELO NOME.
                if(item.user[0] == undefined){
                 
                    var popupText = '<div id="iw_container">' +
                    '<div class="iw_title"><strong> Usuário: </strong>Sem Usuário </div>' +
                    '<div class="iw_content"> <strong>Dispositivo:</strong> '+item.dispositivo.nome +'</br> <strong>Mensagem:</strong> '+ item.mensagem+
                    '</br><strong>Localização: lat:</strong> '+lat+' <strong>lon:</strong> ' +lon+'</br><strong>Data:</strong> '+item.data+ '</br><strong>Hora:</strong> '+item.hora+
                    '</div>';
                }
                else{              
                    var popupText = '<div id="iw_container">' +
                    '<div class="iw_title"><strong> Usuário:</strong> '+ item.user[0].nome +'  &nbsp'+item.user[0].sobrenome +' &nbsp <a href="#"  title="Editar Usuario", name="esconderNoInicio" type="button", id="esconderNoInicio" , data-toggle="modal" data-target="#modalUsuario"  onclick=selPersona(\'' + JSON.stringify(item.user[0],substitui)+ '\');> <img class="icone-modal-map" src="images/visualizar.svg"/> </a></div>'+
                    '<div class="iw_content"><strong> Dispositivo:</strong> '+item.dispositivo.nome +'</br><strong> Mensagem:</strong> '+item.mensagem+
                    '</br><strong>Localização: lat:</strong> '+ lat+' <strong>lon:</strong> ' + lon + '</br><strong>Data:</strong> '+item.data+'</br><strong>Hora:</strong> '+item.hora+'</div>';
                }
            }

            //QUANDO NÃO EXISTE RELAÇÃO COM NENHUM USUÁRIO.
            else{
               var popupText = '<div id="iw_container">' +
              '<div class="iw_title"><strong> Usuário: </strong>Sem Usuário </div>' +
              '<div class="iw_content"> <strong>Dispositivo:</strong> '+item.dispositivo.nome +'</br> <strong>Mensagem:</strong> '+ item.mensagem+
              '</br><strong>Localização: lat:</strong> '+lat+' <strong>lon:</strong> ' +lon+'</br><strong>Data:</strong> '+item.data+ '</br><strong>Hora:</strong> '+item.hora+
              '</div>';
            }
            
  //CRIA A LOCALIZAÇÃO DO MARKER
   var markerLocation = new L.LatLng(lat, lon);

  //ADICONA A POSIÇÃO NA ARRAY.
  posicoesMarkers.push(markerLocation);
  
    var olhou = item.visto;

   //CRIA O MARKER NA POSIÇÃO ENCONTRADA.
   var marker = new L.Marker(markerLocation);

    //  .setBouncingOptions({
    //             bounceHeight: 20
    //         })
    //         .on('click', function() {
    //             this.toggleBouncing();
    //         }).addTo(map);
  
//   map.addLayer(marker);
  //  marker.bindPopup(popupText);  
    // var somAlarme = new Audio("audio/Alarme.mp3");

      switch (item.mensagem){
          case 'SIGA-ME':
            marker.setIcon(SigameIcon);
            break;
          case 'ESTOU-AQUI'://'ESTOU AQUI':           
            marker.setIcon(OkIcon);                      
            break;
          case 'PERSONALIZADA'://'ESTOU AQUI':           
            marker.setIcon(PersonalizadaIcon);                      
            break;
          case 'SOS':          
            marker.setIcon(AlarmeIcon);             
             marker.bounce(); 
             $('#mostrar_notificacao').show(); 
             if(passo != ultimo || olhou == true){
                    marker.stopBouncing();  
                    somAlarme.pause();     
                    $('#mostrar_notificacao').hide();              
             }
             else{
                somAlarme.play();
                NotificacaoSOS();
                //$.get("/principal/notification");                
             }           			     
            break;
          case 'QUEDA':
          case 'AJUDA':
            marker.setIcon(AlarmeIcon);
            marker.bounce(); 
            $('#mostrar_notificacao').show(); 
             if(passo != ultimo || olhou == true){
                    marker.stopBouncing();  
                    somAlarme.pause(); 
                    $('#mostrar_notificacao').hide();                  
             }
             else{
                somAlarme.play();
                NotificacaoAjuda();
               // $.get("/principal/notification"); 
                $('#mostrar_notificacao').hide();                
             }           			     
            break;                  
        }

        //ADICIONA O MARKER NO MAPA.
        map.addLayer(marker);
        
        //LOCAL EM QUE A LABEL COM OS PASSOS VAI APARECER.
        marker.bindLabel(passo.toString(), {permanent: true, direction: 'right'});

        //COLOCA A INFOWINDOW NO MARKER.
        marker.bindPopup(popupText); 

        //FAZ COM QUE O ZOOM FIQUE DE ACORDO COM OS MARKERS ENCONTRADOS.
        map.fitBounds(posicoesMarkers);

        //EVENTO DE CLICK NOS MARKERS.
        marker.on('click', function(){
            this.stopBouncing();
            somAlarme.pause();
           // getInformacaoQualquer(item.dispositivo.imei,item.dispositivo.nome);
            getInformacaoQualquer(item.dispositivo.nome);
        });
        //bounds = L.latLngBounds(markerLocation);
    }


function Ligacoes(){

   for(var i = 0 ; i < markersData.length;i++){
        //PARA IMPEDIR QUE A LIGAÇÃO SEJA FEITA POR TODOS OS MARKER.
         var aux =true;  
          
         //var corLinha = cores[Math.floor(markersData[i].dispositivo.imei[markersData[i].dispositivo.imei.length-1])];
                    var corLinha = cores[Math.floor(markersData[i].dispositivo.nome[markersData[i].dispositivo.nome.length-1])];
                  
                    for(var j = i+1; j < markersData.length; j++){
                      
              //if (markersData[i].dispositivo.imei == markersData[j].dispositivo.imei && aux){
                    if (markersData[i].dispositivo.nome == markersData[j].dispositivo.nome && aux){
                        if( (typeof markersData[i].lng !== 'undefined' && typeof markersData[i].lat !== 'undefined') && (typeof markersData[j].lng !== 'undefined' && typeof markersData[j].lat !== 'undefined') ){ 
                            var latlng = [[markersData[i].lat, markersData[i].lng], [markersData[j].lat, markersData[j].lng]];
                        
                            var polyline = L.polyline(latlng, {color: corLinha}).addTo(map);
                            aux = false;
                        
                   }
                 }
              }
           }		     
   
   }
//}

function MaiorPasso(dispositivo,imei)
{
  var maior = 0;
  for (var i = 0; i < dispositivo.length;i++)
    {
     
        //if(dispositivo[i].dispositivo.imei == imei)
        if(dispositivo[i].dispositivo.nome == imei)
          maior++;
     
    
    }
   
    return maior;
}

//FUNÇÃO PARA CENTRALIZAR O MAPA DE ACORDO COM O CLICK NA TABELA.
function mostrarMarker(nome,data, mensagem){

    for(var i =0; i < markersData.length; i ++ ){
      if(nome == markersData[i].dispositivo.nome && data == markersData[i].hora){ 
        if(typeof markersData[i].lng !== 'undefined' && typeof markersData[i].lat !== 'undefined'){       
                  var markerLocation = new L.LatLng(markersData[i].lat, markersData[i].lng);

                  map.setView(markerLocation,13);
                 
                  var marker = new L.Marker(markerLocation);

                   switch (mensagem){
                            case 'SIGA-ME':
                              marker.setIcon(SigameIcon);
                              marker.bounce(2);
                              break;
                            case 'ESTOU-AQUI'://'ESTOU AQUI':           
                              marker.setIcon(OkIcon);                    
                              marker.bounce(2);  
                              break;
                            case 'PERSONALIZADA'://'ESTOU AQUI':           
                              marker.setIcon(PersonalizadaIcon);                    
                              marker.bounce(2);  
                              break;                              
                            case 'SOS':          
                              marker.setIcon(AlarmeIcon); 
                              marker.bounce(2);
                              break;
                            case 'QUEDA':                           
                            case 'AJUDA':
                              marker.setIcon(AlarmeIcon);                                         
                              marker.bounce(2);
                              break;                  
                          }
                          //  marker.bounce(2);
                  setTimeout(function() {
                  map.removeLayer(marker);  
                  }, 750);  
                           
                  
                  getInformacaoQualquer(nome);      
                  map.addLayer(marker);
                  

        }
         else{
              getInformacaoQualquer(nome);                   
              alert("Sem Localização!")
        }
      }
     
      
    }

}

//FUNÇÃO PARA MOSTRAR AS ESTAÇÕES NO LEAFLET, É NECESSARIO TROCAR OS NOMES DAS FUNÇÕES, ACRESCENTAR UM "Le" NO FINAL.
var estacaoRevisada;
function EstacaoRevisada(trechos){
   
   if((document.getElementById("checkbox1").checked == true) && (trechos == "LIFELINK" || trechos == "VLI" || trechos == "ATHENE" ||trechos == "MEDICAR")){
       estacaoRevisada = omnivore.kml('kml/estacaoRevisada2.kml')
        .on('ready', function(layer) {
            this.eachLayer(function(marker)
            {
                marker.setIcon(EstacaoIcon);
                var popup =
                marker.toGeoJSON().properties.name;
                marker.bindPopup(popup);
            });
            //map.fitBounds(estacaoRevisada);
        })
        .addTo(map);  
        }else{
          estacaoRevisada.removeFrom(map); 
      }
}

var meioAmbiente;
function ExtensoEstacao(trechos){
  
  if((document.getElementById("checkbox2").checked == true) && (trechos == "LIFELINK" || trechos == "VLI" || trechos == "ATHENE" ||trechos == "MEDICAR")){
       meioAmbiente = omnivore.kml('kml/estacoesExtenso.kml')
        .on('ready', function(layer) {
           this.eachLayer(function(marker)
            {
                marker.setIcon(EstacaoIcon);
                var popup =
                marker.toGeoJSON().properties.name;
                marker.bindPopup(popup);
 
            });
            //map.fitBounds(meioAmbiente);
        })
        .addTo(map);  
        }else{
          meioAmbiente.removeFrom(map); 
      }
}

//ESCOLHE A COR QUE IRÁ APARECER NAS TRILHAS.
var customLayer = L.geoJson(null, {
  // http://leafletjs.com/reference.html#geojson-style
  style: function(feature) {
    return {
      color: '#f00'
    };
  }
});

var trechoFerro;
function FerroTrecho(trechos){
  
  if((document.getElementById("checkbox3").checked == true) && (trechos == "LIFELINK" || trechos == "VLI" || trechos == "ATHENE" ||trechos == "MEDICAR")){
       trechoFerro = omnivore.kml('kml/trechoFerroviario.kml',null,customLayer)
        .on('ready', function() {
            map.fitBounds(trechoFerro);
            
        })
        .addTo(map);  
        }else{
          trechoFerro.removeFrom(map); 
      }
}

var atlantica;
function AtlanticaLinha(trechos){
  
  if((document.getElementById("checkbox4").checked == true) && (trechos == "LIFELINK" || trechos == "VLI" || trechos == "ATHENE" ||trechos == "MEDICAR")){
       atlantica = omnivore.kml('kml/meioAmbienteAtlantica.kml',null, customLayer)
        .on('ready', function() {
            map.fitBounds(atlantica);
        })
        .addTo(map);  
        }else{
          atlantica.removeFrom(map); 
      }
}


