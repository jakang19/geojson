var url = "https://opendata.arcgis.com/datasets/e3802d2abf8741a187e73a9db49d68fe_2.geojson"

function markerSize(GIS_ACRES){
	return GIS_ACRES * 30000;
}

function markerColor(CAUSE){
	if	(CAUSE == 1){
		return "#800000"
	}
	else if (CAUSE == 2){
		return "#9A6324"
	}
	else if (CAUSE == 3){
		return "#808000"
	}
	else if (CAUSE == 4){
		return "#469990"
	}
	else if (CAUSE == 5){
		return "#000075"
	}
	else if (CAUSE == 6){
		return "#000000"
	}
	else if (CAUSE == 7){
		return "#e6194B"
	}
	else if (CAUSE == 8){
		return "#f58231"
	}
	else if (CAUSE == 9){
		return "#ffe119"
	}
	else if (CAUSE == 10){
		return "#bfef45"
	}
	else if (CAUSE == 11){
		return "#3cb44b"
	}
	else if (CAUSE == 12){
		return "#42d4f4"
	}
	else if (CAUSE == 13){
		return "#4363d8"
	}
	else if (CAUSE == 14){
		return "#911eb4"
	}
	else if (CAUSE == 15){
		return "#f032e6"
	}
	else if (CAUSE == 16){
		return "#a9a9a9"
	}
	else if (CAUSE == 17){
		return "#fabed4"
	}
	else if (CAUSE == 18){
		return "#ffd8b1"
	}
	else if (CAUSE == 19){
		return "#fffac8"
	}
}

// Grab the data with d3
d3.json(url, function(response) {
	createFeatures(response.features);
});

// function to create circles
function createFeatures(data) {
	var info = L.geoJSON(data, {
	onEachFeature: function(feature, layer) {
				layer.bindPopup("<h3>" + feature.properties.FIRE_NAME + "</h3><hr><p>" + new Date(feature.properties.ALARM_DATE) + "</p>" + "<p> Acres: " + feature.properties.GIS_ACRES  + "</p>")

	},
	pointToLayer: function(feature, coord) {
		return new L.circle(coord,
			{radius: markerSize(feature.properties.GIS_ACRES),
			fillColor: markerColor(feature.properties.CAUSE),
			fillOpacity: 0.8,
			color: "white",
			weight: 1
			})
	}
	});

	createMap(info);
}

function createMap(info) {

 	var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    	attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    	tileSize: 512,
    	maxZoom: 18,
    	zoomOffset:-1,
    	id: "mapbox/streets-v11",
    	accessToken: API_KEY
  	});

  	// Define a baseMaps object to hold our base layer
	var baseMaps = {
    	"Street Map": streetmap,
	};


  	// Create our map with streetmap and fire info layers
	var myMap = L.map("map", {
    	center: [37.16611, -119.44944],
    	zoom: 4,
    	layers: [streetmap, info]
  	});

// Legend
var legend = L.control({position: "bottomright"});

legend.onAdd = function() {
	var div = L.DomUtil.create('div', 'info legend');
		var CAUSES = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

	var lengendInfo = "<h4>Fire Cause</h4>" 
	div.innerHTML = lengendInfo;

	for (var i = 0; i < CAUSES.length; i++) {
		div.innerHTML += '<i style = "background: ' +
		markerColor(CAUSES[i] + 1) + 
		'"></i> ' + CAUSES[i] + (CAUSES[i + 1] ? ' - ' + CAUSES[i + 1] + 
		'<br>' : ' + ')
	}
	return div;
};
	legend.addTo(myMap);
};