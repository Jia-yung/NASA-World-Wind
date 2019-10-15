requirejs(['./LayerManager'],
    function (LayerManager) {

    var wwd = new WorldWind.WorldWindow("canvasOne");

    //adding imagery layers
    wwd.addLayer(new WorldWind.BMNGOneImageLayer());
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    wwd.addLayer(new WorldWind.AtmosphereLayer());

    //adding coordinates and controls
    wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
    wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

    //adding compass
    var compassLayer = new WorldWind.RenderableLayer("Compass");
    wwd.addLayer(compassLayer);

    var compass = new WorldWind.Compass();
    compass.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION,4.0,WorldWind.OFFSET_FRACTION,1.0);
    compass.opacity = 0.5
    compass.size = 0.09;
    compassLayer.addRenderable(compass);

    //adding placemark layer
    var placemarkLayer = new WorldWind.RenderableLayer("Placemark");
    wwd.addLayer(placemarkLayer);

    var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    placemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.3, WorldWind.OFFSET_FRACTION, 0.0);
    placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
    placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 1.0);

    placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";

    var position = new WorldWind.Position(55.0, -106.0, 100.0);
    var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

    placemark.label = "Placemark\n" + "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" + "Lon " + placemark.position.longitude.toPrecision(5).toString();
    placemark.alwaysOnTop = true;

    placemarkLayer.addRenderable(placemark);

    // Displaying 3D shapes. Add a polygon
    var polygonLayer = new WorldWind.RenderableLayer("Polygon");
    wwd.addLayer(polygonLayer);

    var polygonAttributes = new WorldWind.ShapeAttributes(null);
    polygonAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.75);
    polygonAttributes.outlineColor = WorldWind.Color.RED;
    polygonAttributes.drawOutline = true;
    polygonAttributes.applyLighting = true;

    var boundaries = [];
    boundaries.push(new WorldWind.Position(20.0, -75.0, 700000.0));
    boundaries.push(new WorldWind.Position(25.0, -85.0, 700000.0));
    boundaries.push(new WorldWind.Position(20.0, -95.0, 700000.0));

    polygon = new WorldWind.Polygon(boundaries, polygonAttributes);
    console.log(polygon);
    polygon.extrude = true;
    polygonLayer.addRenderable(polygon);

    //using slider bar to change the size of polygon
    $("#lengthSlider").on("change", function (event) {
        polygonLayer.removeRenderable(polygon)
        var sliderValue = event.target.value;

        var boundaries = [];
        boundaries.push(new WorldWind.Position(20.0, -75.0, 100000000/sliderValue));
        boundaries.push(new WorldWind.Position(25.0, -85.0, 100000000/sliderValue));
        boundaries.push(new WorldWind.Position(20.0, -95.0, 100000000/sliderValue));  
               
        polygon = new WorldWind.Polygon(boundaries, polygonAttributes);
        polygon.extrude = true
        polygonLayer.addRenderable(polygon);
    });    

    // Add a COLLADA model
    var modelLayer = new WorldWind.RenderableLayer("Duck");
    wwd.addLayer(modelLayer);

    var position = new WorldWind.Position(10.0, -125.0, 800000.0);
    var config = {dirPath: WorldWind.configuration.baseUrl + 'examples/collada_models/duck/'};

    var colladaLoader = new WorldWind.ColladaLoader(position, config);
    colladaLoader.load("duck.dae", function (colladaModel) {
        colladaModel.scale = 9000;
        modelLayer.addRenderable(colladaModel);
    });

    // Add WMS imagery
    var serviceAddress = "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
    var layerName = "MOD_LSTD_CLIM_M";

    var createLayer = function (xmlDom) {
        var wms = new WorldWind.WmsCapabilities(xmlDom);
        var wmsLayerCapabilities = wms.getNamedLayer(layerName);
        var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
        wmsConfig.title = "Average Surface Temp";
        var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
        wwd.addLayer(wmsLayer);
        layerManager.synchronizeLayerList();
    };

    var logError = function (jqXhr, text, exception) {
        console.log("There was a failure retrieving the capabilities document: " +
            text +
        " exception: " + exception);
    };

    $.get(serviceAddress).done(createLayer).fail(logError);

    //Add WMS imagery for LECZ
    
    //
    var parseArgs = function () {
        var result = {};

        var queryString = window.location.href.split("?");
        if (queryString && queryString.length > 1) {
            var args = queryString[1].split("&");

            for (var a = 0; a < args.length; a++) {
                var arg = args[a].split("=");

                // Obtain geographic position to redirect WorldWindow camera view.
                if (arg[0] === "pos") {
                    // arg format is "pos=lat,lon,alt"
                    var position = arg[1].split(","),
                        lat = parseFloat(position[0]),
                        lon = parseFloat(position[1]),
                        alt = parseFloat(position[2]);
                    result.position = new WorldWind.Position(lat, lon, alt);
                }
            }
        }
        return result;
    };

    var args = parseArgs();

    // Now move the view to the requested position.
    if (args.position) {
        wwd.goTo(args.position);
    }

    var layerManager = new LayerManager(wwd);
});