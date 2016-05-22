
var animatedOverlay;

// Define the animated overlay, derived from google.maps.OverlayView
function PinAnimation(opt_options) {
    this.setValues(opt_options);
    var div = this.div_ = document.createElement('div');
    div.id = 'holder';

    var span = this.span_ = document.createElement('span');
    span.className = 'pulse';
    div.appendChild(span);
};

PinAnimation.prototype = new google.maps.OverlayView;

PinAnimation.prototype.onAdd = function() {

     //Overlay shadow puts the animation behind the pin
     var pane = this.getPanes().overlayShadow;
     pane.appendChild(this.div_);

     // Ensures the PinAnimation is redrawn if the text or position is changed.
     var me = this;
     this.listeners_ = [
          google.maps.event.addListener(this, 'position_changed',
               function() { me.draw(); }),
     ];
};

// Implement onRemove
PinAnimation.prototype.onRemove = function() {
     this.div_.parentNode.removeChild(this.div_);

     // PinAnimation is removed from the map, stop updating its position/any other listeners added.
     for (var i = 0, I = this.listeners_.length; i < I; ++i) {
          google.maps.event.removeListener(this.listeners_[i]);
     }
};

// Set the visibility to 'hidden' or 'visible'.
PinAnimation.prototype.hide = function() {
    if (this.div_) {
        this.div_.style.visibility = 'hidden';
    }
};
PinAnimation.prototype.show = function() {
    if (this.div_) {
        this.div_.style.visibility = 'visible';
    }
};

// Implement draw
PinAnimation.prototype.draw = function() {
    var topPadding = 0;
    var sizeHeight = 10
    var sizeWidth = sizeHeight;
    var centerX = sizeWidth/2;
    var centerY = sizeHeight/2;

     var projection = this.getProjection();
     var position = projection.fromLatLngToDivPixel(this.get('position'));
     var div = this.div_;
//Adjust overlay position to be centered over the point
     div.style.left = position.x-centerX + 'px';
     div.style.top = position.y-topPadding-centerY + 'px';
     div.style.display = 'block';
};





var options = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    }
]



$(function(){

  var map;

  //Set marker and draw overlay
  function setMarker(location) {


      var marker = new google.maps.Marker({
          position: location,
          icon:"./images/marker.png",
          map: map,
          title: 'Hello World!'
          });

      animatedOverlay = new PinAnimation({
          map: map
      });
      animatedOverlay.bindTo('position', marker, 'position');
      animatedOverlay.show();
  }

  function init() {
      // Basic options for a simple Google Map
      // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
      var mapOptions = {
          // How zoomed in you want the map to start at (always required)
          zoom: 12,

          // The latitude and longitude to center the map (always required)
          center: new google.maps.LatLng(53.551086, 9.8), // New York

          // How you would like to style the map.
          // This is where you would paste any style found on Snazzy Maps.
          styles: options

        };

      // Get the HTML DOM element that will contain your map
      // We are using a div with id="map" seen below in the <body>
      var mapElement = document.getElementById('map');

      // Create the Google Map using our element and options defined above
      map = new google.maps.Map(mapElement, mapOptions);



      setMarker(new google.maps.LatLng(53.551086, 9.8))




  }

  init()

  $(".aktuell").click(function(e){
      e.preventDefault();
      var body = $("html, body, .android-content");
      body.stop().animate({scrollTop:0}, '3000', 'swing')

  })

  $(".live-karte").click(function(e){
    e.preventDefault();
    setInterval(function(){
      var factor = 1;
      if(Math.random() < 0.5){
         factor = -1;
      }
        setMarker(new google.maps.LatLng(53.551086 + Math.random()/4 * factor, 9.8 + Math.random()/4 * factor))
    },1500)


    var body = $("html, body, .android-content");
    body.stop().animate({scrollTop:1900}, '3000', 'swing')
  })

  $(".android-fab").click(function(){
    var body = $("html, body, .android-content");
    var pos = $(".videoFrame").offset().top
    body.stop().animate({scrollTop:pos}, '3000', 'swing', function() {

    });
  })


  window.setTimeout(function(){

      var delta = $(".mdl-layout__header-row").height()
      $(".videoFrame").height($(window).height()-delta)
      $(".videoFrame").width($(window).width())

  },1000);
})
