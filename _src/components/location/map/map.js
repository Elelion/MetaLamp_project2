/* jshint esversion: 6 */

var initMap = function() {
    // FIXME: mapMarker - check the path, when importing the block to other projects
    const MAP_MARKER = 'src/assets/images/map-marker.png';
    let marker;

    let setElementMap = function(id) {
        let idMap = id;
        idMap = idMap.replace(/[^0-9]/g, "");

        if (idMap.length === 0) {
            idMap = 0;
        } else {
            idMap = idMap.substr(0, 1)
        }

        let elementMap = document.getElementsByClassName('map')[id];
        return elementMap;
    }

    let getStartCoordinates = function() {
        let startCoordinates = {
            zoom: 15,

            // remove the standard control buttons
            disableDefaultUI: true,

            // start map coordinates
            center: { lat: 37.7945742, lng: -122.415077 }
        };

        return startCoordinates;
    }

    let getInfoWindow = function() {
        var infoWindow = new google.maps.InfoWindow({
            content: '<h1> Bingo...! </h1>'
        });

        return infoWindow;
    }

    let getMapLocation = function() {
        let mapLocation = new google.maps.Map(setElementMap('0'), getStartCoordinates());

        return mapLocation;
    }

    // ---

    function addMap(proporties) {
        marker = new google.maps.Marker({
            position: proporties.markerCoordinates,
            map: proporties.mapCoordinates,
            icon: proporties.markerImage
        });
    }

    addMap({
        markerCoordinates: { lat: 37.7910742, lng: -122.415077 },
        mapCoordinates: getMapLocation(),
        markerImage: MAP_MARKER
    });

    // make the marker a listener
    (function() {
        marker.addListener('click', function() {
            getInfoWindow().open(getMapLocation, marker);
        });
    }());
}
