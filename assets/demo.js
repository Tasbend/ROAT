/**
 * Moves the map to display over Berlin
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function moveMapToBerlin(map){
  map.setCenter({lat:44.725803, lng:37.762416});
  map.setZoom(14);
}

/**44.725803, 37.762416
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: 'YdbAWjtM0dc5-QsjEru2CjVguQhXroTYyzzNZpzhD_g'
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:50, lng:5},
  zoom: 4,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
window.onload = function () {
  moveMapToBerlin(map);
}                  
// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Instantiate the default behavior, providing the mapEvents object:
new H.mapevents.Behavior(mapEvents);
var service = platform.getCustomLocationService();

// create tile provider and layer that displays CLE layer
var provider = new mapsjs.service.extension.customLocation.TileProvider(service, {
  layerId: 'SEATTLE_14'
}, {
  resultType: mapsjs.service.extension.TileProvider.ResultType.POLYGON, 
  min: 15
});

var layer = new mapsjs.map.layer.TileLayer(provider);
map.addLayer(layer);

map.addEventListener('tap', function(ev) {
  var row;
  if (ev.target !== map) {
    row = ev.target.getData();
    console.log('SHAPE_AREA: ', row.getCell('SHAPE_AREA'));
  }
});
