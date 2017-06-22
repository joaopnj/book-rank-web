var iconSOS = 'imagens/SOS.png';
var iconAlarme = 'imagens/Alarme.png';
var iconSigaMe = 'imagens/sigaMe.png';
var iconOk = 'imagens/Ok.png';
var sos = 'imagens/_SOS.png';
var alarme = 'imagens/-Alarme.png';


var markersData;
var flightPath;

//VARIAVEL GLOBAL PARA O MAP SER ENCONTRADO NAS FUNÇÕES.
var map;
//VARIAVEL PARA MOSTRAR ROTA, CASO SEJA UTILIZADO A ROTA.
var directionsDisplay;
//VARIAVEL PARA CONFIGURAR O ZOOM DE ACORDO COM OS MARKERS DO MAPA.
var bounds;

//var InfoWindow;


function InitMap(dispositivos) {
  //Cache para poder trabalhar com o Json
  //dispositivos =  JSON.parse(dispositivos);
  
  markersData  = JSON.parse(dispositivos);
  
  //Centralizador do mapa, mostra o foco do mapa.
  //bounds = new google.maps.LatLngBounds();

  directionsDisplay = new google.maps.DirectionsRenderer();
  //FUNÇÃO PARA MOSTRAR O MAPA NA TELA.
  CreateMap();
  
  
   // Cria a nova Info Window com referência à variável infoWindow.
   // O conteúdo da Info Window é criado na função createMarker.
   infoWindow = new google.maps.InfoWindow();

   // Evento que fecha a infoWindow com click no mapa.
  
   // Chamada para a função que vai percorrer a informação
   // contida na variável markersData e criar os marcadores a mostrar no mapa
   displayMarkers();
  //     google.maps.event.addListener(map, 'click', function() {
  //     infoWindow.close();
  //  });

   PolyMap(); 


  //DEFINE EM QUE MAPA SERÁ MOSTRADO A ROTA.
 // directionsDisplay.setMap(map);

  //RouteMap - ESSA FUNÇÃO GERA ROTA, POR ENQUANTO ENTRE DOIS PONTOS APENAS, VERIFICAR SE É POSSÍVEL MAIS.
 //RouteMap(dispositivos);
 
  //FUNÇÃO QUE LIGA OS MARKERS ATRAVÉS DE UMA LINHA(Polyline)
  // PolyMap(); 
  

  }


//Função de Criar o Mapa 
function CreateMap(){
    //CORRDENADAS ONDE O MAPA IRÁ FOCAR, 
    var myLatLng = {lat: -13.123800 , lng: -50.8998864 };
    //CRIANDO O MAPA
    map = new google.maps.Map(document.getElementById('map'), {
    //Opções para aparencia do mapa.
    zoom: 4, //ZOOM É OBRIGATORIO.
    center: myLatLng, // CENTER É OBRIGATORIO.
    streetViewControl: false
  });
}






//
function PolyMap(){
  
  
  for (var i = 0; i < markersData.length; i++){
  var aux =true;   

   for (var j = i+1; j < markersData.length; j++){

     if(markersData[i].idSpot === markersData[j].idSpot && aux){
     //Adiciona o Marker no mapa na posição recebida por parametro.
       var cordenadas  =[
       {lat: markersData[i].lat, lng: markersData[i].lng},
       {lat: markersData[j].lat, lng: markersData[j].lng}
       ];
       

         flightPath = new google.maps.Polyline({
          path: cordenadas,
          geodesic: true,
          strokeColor: '#FF0000'
        });
       
       
         aux = false;
        //  flightPath.setMap(map);
     }    
     flightPath.setMap(map);
  //Zoom automatico, para caber todos os marcadores, deve ser declarada para cada marker.
  // bounds.extend(dispositivos[i]);

  //Janela de informação quando clica no marker
  // var infowindow = new google.maps.InfoWindow();
  
  //Evento de click no marker
  // google.maps.event.addListener(marker, 'click', (function(marker, i) {
  //          return function() {

  //            //Conteudo que vai estar na janela.
  //            var conteudo = '<div class="bg-primary"> '+ dispositivos[i].idSpot +' </div></br><div class="bg-info"></br> informacao: '
  //             + dispositivos[i].informacao +'</br>'+'Medico :'+ dispositivos[i].medico+'</br>'+dispositivos[i].data+'</div>' ;
  //            infowindow.setContent(conteudo); //Envia o conteudo para a janela.
  //            infowindow.open(map, marker);
  //          }
  //        })(marker, i));
         
   }
 }
}


function createMarker(latlng, informacao,imei){
   var marker = new google.maps.Marker({
      icon: null,
      map: map,
      position: latlng     
   });

   // Evento que dá instrução à API para estar alerta ao click no marcador.
   // Define o conteúdo e abre a Info Window.

   switch (informacao){
          case 'siga-me':
            marker.icon = iconSigaMe;
            break;
          case 'Ok':
            marker.icon = iconOk;
            break;
          case 'SOS':
            marker.icon = iconSOS;
            break;
          case 'Alarme':
            marker.icon = iconAlarme;
            break;
          case '_SOS':
            marker.icon = sos;
            break;
          case '_Alarme':
            marker.icon = alarme;
            break;            
         }

   google.maps.event.addListener(marker, 'click', function() {
      
      // Variável que define a estrutura do HTML a inserir na Info Window.
      var iwContent = '<div id="iw_container">' +
      '<div class="iw_title"> '+ latlng+' </div>' +
      '<div class="iw_content">'+informacao +' <br />'+ imei +' </div></div>';
      
      // O conteúdo da variável iwContent é inserido na Info Window.
      infoWindow.setContent(iwContent);

      // A Info Window é aberta com um click no marcador.
      infoWindow.open(map, marker);
   });
}




function displayMarkers(){

   // esta variável vai definir a área de mapa a abranger e o nível do zoom
   // de acordo com as posições dos marcadores
   var bounds = new google.maps.LatLngBounds();

   // Loop que vai percorrer a informação contida em markersData 
   // para que a função createMarker possa criar os marcadores 
   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
    
      createMarker(latlng, markersData[i].informacao, markersData[i].idSpot);

 
      // Os valores de latitude e longitude do marcador são adicionados à
      // variável bounds
      bounds.extend(latlng); 
   }

   // Depois de criados todos os marcadores,
   // a API, através da sua função fitBounds, vai redefinir o nível do zoom
   // e consequentemente a área do mapa abrangida de acordo com
   // as posições dos marcadores
   map.fitBounds(bounds);
}

function Mapa(dispositivos){

 
var SosIcon = L.icon({
    iconUrl: 'imagens/SOS.png',
    iconSize:     [40, 38], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 36], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-1, -38] // point from which the popup should open relative to the iconAnchor    
});

var AlarmeIcon = L.icon({
    iconUrl: 'imagens/Alarme.png',
    iconSize:     [40, 38], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 36], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-1, -38] // point from which the popup should open relative to the iconAnchor    
});

var SigameIcon = L.icon({
    iconUrl: 'imagens/sigaMe.png',
    iconSize:     [40, 38], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 36], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-1, -38] // point from which the popup should open relative to the iconAnchor    
});


var OkIcon = L.icon({
    iconUrl: 'imagens/Ok.png',
    iconSize:     [40, 38], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 36], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-1, -38] // point from which the popup should open relative to the iconAnchor    
});





 markersData  = JSON.parse(dispositivos);
 var map = L.map('map').setView([-13.123800, -50.8998864], 3);
 map.setMinZoom(4);


  // var kmlLayer = new L.KML("https://sites.google.com/site/kmlmapateste/teste2/estacaoRevisada2.kml", {async: true});
                                                              
  //        kmlLayer.on("loaded", function(e) { 
  //           map.fitBounds(e.target.getBounds());
  //        });
                                                
  //        map.addLayer(kmlLayer);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    for(var i = 0; i < markersData.length; i++){

       
  //  var marker = new L.marker([markersData[i].lat, markersData[i].lng])
  //   .bindPopup('Teste da popup<br>'+ markersData[i].informacao+'<br>'+markersData[i].medico).addTo(map)();


            //Funciona
            var lon = markersData[i].lng;
            var lat = markersData[i].lat;
            var popupText = " Teste<br> "+markersData[i].medico+"<br>"+markersData[i].informacao;
            
             var markerLocation = new L.LatLng(lat, lon);
             var marker = new L.Marker(markerLocation);
             map.addLayer(marker);

      switch (markersData[i].informacao){
          case 'siga-me':
            marker.setIcon(SigameIcon);
            break;
          case 'Ok':
            marker.setIcon(OkIcon);
            break;
          case 'SOS':
            marker.setIcon(SosIcon);
            break;
          case 'Alarme':
            marker.setIcon(AlarmeIcon);
            break;                  
        }


            // marker.setIcon(greenIcon);         
             marker.bindPopup(popupText);

		    	// marker = new L.marker([markersData[i].lat,markersData[i].lng],{icon : greenIcon})
			  	// .bindPopup("Teste <br>"+ markersData[i].informacao)
				  // .addTo(map);
          

  }
       for(var i = 0 ; i < markersData.length;i++){
         var aux =true;  
           for (var j = i+1; j < markersData.length; j++){
             if (markersData[i].idSpot == markersData[j].idSpot && aux){
              var latlng = [[markersData[i].lat, markersData[i].lng], [markersData[j].lat, markersData[j].lng]];
              var polyline = L.polyline(latlng, {color: 'red'}).addTo(map);
              aux = false;
               }
             }
           }		     
}



//-----------------------------------------------------------------------------------------------------------

function OpenLayer(dispositivos){

markersData  = JSON.parse(dispositivos); 
var iconFeatures=[];

    for (var i = 0; i < markersData.length;i++){

        iconFeatures.push(AddMarker(markersData[i].lng, markersData[i].lat, markersData[i].informacao));
        }

var vectorSource = new ol.source.Vector({
  features: iconFeatures //add an array of features
});

//vectorSource.addFeature( featurething );

//CAMADA DO MAPA
 var vectorLayer = new ol.layer.Vector({
     source: vectorSource
        //style: iconStyle
     });


var rasterLayer = new ol.layer.Tile({
     source: new ol.source.OSM()
     });

var points = [ [0, 0],[33, 33]];


var featureLine = new ol.Feature({
    geometry: new ol.geom.LineString(points)
  });

var sourceLine = new ol.source.Vector({
    features: [featureLine]
  });


// var coordinates = [[0, 0], [33, 33]]; 

//   var layerLines = new ol.layer.Vector({
//       source: new ol.source.Vector({
//           features: [new ol.Feature({
//               geometry: new ol.geom.LineString(coordinates),
//               name: 'Line'
//           })]
//       }),
//   });

  


// var teste = new ol.layer.Vector({
//         source: new ol.source.Vector({
//           url: 'https://sites.google.com/site/kmlmapateste/trechoatlantic2/atlanticapt2.kml', //https://openlayers.org/en/v3.19.1/examples/data/kml/2012-02-10.kml
//           format: new ol.format.KML()// https://sites.google.com/site/kmlmapateste/trechoatlantic2/atlanticapt2.kml
//         })
//       });

//DEFININFO O MAPA
var map = new ol.Map({
    layers: [rasterLayer, vectorLayer],  //CAMADAS
    target: document.getElementById('map'),
    view: new ol.View({  //VISÂO DO MAPA
      center: [-13.123800, -50.8998864],       
      minZoom: 2,   
      zoom: 3
      })
    });


   map.addLayer(vectorLine);

 }


function AddMarker(lat, lng, mensagem)
{


var iconFeature = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.transform([lat , lng], 'EPSG:4326',     
  'EPSG:3857')),
  // name: 'Island',
  // population: 4001,
  // rainfall: 501,
    
});


switch (mensagem){
    case 'SIGA-ME':
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
             src: iconSigaMe
            }))
         });
         break;
      
    case'OK':
       var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
             src: iconOk
            }))
         });
         break;
    case 'SOS':
          var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
             src: iconSOS
            }))
         });
         break;
    case 'ALARME':
          var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
             src: iconAlarme
            }))
         });
         break;
      }

   iconFeature.setStyle(iconStyle);
return iconFeature;

}

// $(document).ready(function(){
//     $("#aparece").click(function(){
//         $("#esconde").slideToggle("slow");
//     });
// });


         

