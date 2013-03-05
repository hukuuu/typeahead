define([
	"jquery"],

function($) {

	var _from,
	_to;

	var Typeahead = {
		getFrom: function() {
			return _from;
		},
		getTo: function() {
			return _to;
		},
		initialize: function(options) {
			initialize(options);
		}
	};

	function initialize(options) {

		var me = this,

			settings = $.extend({
				'inputFrom': 'input.autocomplete-from',
				'inputTo': 'input.autocomplete-to',
				'mapHolder': 'div#map_canvas'
			}, options),

			from = new google.maps.places.Autocomplete(document.querySelector(settings.inputFrom), {
				types: ['(cities)']
			}),

			to = new google.maps.places.Autocomplete(document.querySelector(settings.inputTo), {
				types: ['(cities)']
			}),

			map = initializeMap(document.querySelector(settings.mapHolder)),

			directionsDisplay = new google.maps.DirectionsRenderer(),
			directionsService = new google.maps.DirectionsService();

		directionsDisplay.setMap(map);


		handleChange(from, map, function(place) {
			_from = place;
			drawRoad(_from, _to, map, directionsDisplay, directionsService);
		});

		handleChange(to, map, function(place) {
			_to = place;
			drawRoad(_from, _to, map, directionsDisplay, directionsService);
		});

		return me;
	}

	function initializeMap(element) {
		var mapOptions = {
			center: new google.maps.LatLng(42.26917949243506, 24.818115234375),
			zoom: 7,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(element, mapOptions);
		return map;
	}

	function handleChange(autocomplete, map, callback) {
		google.maps.event.addListener(autocomplete, 'place_changed', function() {
			var place = autocomplete.getPlace();
			if (!place.geometry) {
				// Inform the user that a place was not found and return.
				alert('could not find this place');
				return;
			}

			// If the place has a geometry, then present it on a map.
			// if (place.geometry.viewport) {
				// Use the viewport if it is provided.
				// map.fitBounds(place.geometry.viewport);
			// } else {
				// Otherwise use the location and set a chosen zoom level.
				map.setCenter(place.geometry.location);
				// map.setZoom(17);
			// }
			// var image = {
			// 	url: place.icon,
			// 	size: new google.maps.Size(71, 71),
			// 	origin: new google.maps.Point(0, 0),
			// 	anchor: new google.maps.Point(17, 34),
			// 	scaledSize: new google.maps.Size(25, 25)
			// };

			// if (autocomplete.marker) {
			// 	autocomplete.marker.setMap(null);
			// }

			// var newMarker = new google.maps.Marker({
			// 	icon: image,
			// 	position: place.geometry.location,
			// 	map: map
			// });
			// autocomplete.marker = newMarker;

			if (callback && typeof callback == 'function') {
				callback(autocomplete.getPlace());
			}
		});
	}

	function drawRoad(from, to, map, directionsDisplay, directionsService) {
		if (!from || !to) return;
		var request = {
			origin: from.geometry.location,
			destination: to.geometry.location,
			travelMode: google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(result);
			}
		});



	}

	return Typeahead;

});