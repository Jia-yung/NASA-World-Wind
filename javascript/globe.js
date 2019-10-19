requirejs(['./LayerManager'],
    function (LayerManager) {

    var wwd = new WorldWind.WorldWindow("canvasOne");

    //adding imagery layers
    var starField = new WorldWind.StarFieldLayer();
    starField.pickEnabled = false;
    wwd.addLayer(starField);
    wwd.addLayer(new WorldWind.BMNGOneImageLayer());
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    wwd.addLayer(new WorldWind.AtmosphereLayer());

    //adding coordinates and controls
    wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
    var controls = new WorldWind.ViewControlsLayer(wwd);
    controls.placement = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.25, WorldWind.OFFSET_FRACTION, 0);
    wwd.addLayer(controls);

    //adding compass
    var compassLayer = new WorldWind.RenderableLayer("Compass");
    wwd.addLayer(compassLayer);

    var compassImage = '../images/compass.png';
    var compass = new WorldWind.Compass(null, compassImage);
    compass.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION,4.0,WorldWind.OFFSET_FRACTION,1.0);
    compass.opacity = 0.5
    compass.size = 0.09;
    compassLayer.addRenderable(compass);

    // Displaying 3D shapes. Add a polygon
    var polygonLayer = new WorldWind.RenderableLayer("Polygon");
    wwd.addLayer(polygonLayer);

    var polygonAttributes = new WorldWind.ShapeAttributes(null);
    polygonAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.75);

    var boundaries = [];
    boundaries.push(new WorldWind.Position(20.0, -75.0, 1001000));
    boundaries.push(new WorldWind.Position(25.0, -85.0, 1001000));
    boundaries.push(new WorldWind.Position(20.0, -95.0, 1001000));

    polygon = new WorldWind.Polygon(boundaries, polygonAttributes);
    polygon.extrude = true;
    polygonLayer.addRenderable(polygon);

    function alterPolygon(height) {
        polygonLayer.removeRenderable(polygon)
        var sliderValue = height;
        console.log("slider value", sliderValue);

        var boundaries = [];
        boundaries.push(new WorldWind.Position(20.0, -75.0, 100001000/sliderValue));
        boundaries.push(new WorldWind.Position(25.0, -85.0, 100001000/sliderValue));
        boundaries.push(new WorldWind.Position(20.0, -95.0, 100001000/sliderValue));  
               
        polygon = new WorldWind.Polygon(boundaries, polygonAttributes);
        polygon.extrude = true
        polygonLayer.addRenderable(polygon);
    }
    /*
    //using slider bar to change the size of polygon
    $("#lengthSlider").on("change", function (event) {
        polygonLayer.removeRenderable(polygon)
        var sliderValue = event.target.value;
        console.log("slider value", sliderValue);

        var boundaries = [];
        boundaries.push(new WorldWind.Position(20.0, -75.0, 100000000/sliderValue));
        boundaries.push(new WorldWind.Position(25.0, -85.0, 100000000/sliderValue));
        boundaries.push(new WorldWind.Position(20.0, -95.0, 100000000/sliderValue));  
               
        polygon = new WorldWind.Polygon(boundaries, polygonAttributes);
        polygon.extrude = true
        polygonLayer.addRenderable(polygon);
    });
    */
    
    height = 200;
    yearSliderDefault = 160;
    temperatureSliderDefault = 150;
    vehicleSliderDefault = 100;

    $("#yearSlider").on("change", function (event) {
        value = event.target.valueAsNumber;
        console.log("year slider value", value);
        console.log("year Default", yearSliderDefault);
        
        if (value > yearSliderDefault) {
            height = height + (value - yearSliderDefault);
            console.log("Height", height);
        } else if (value < yearSliderDefault) {
            height = height - (yearSliderDefault-value);
        }
        yearSliderDefault = value;
        console.log("Height", height); 
        alterPolygon(height);
    });

    $("#temperatureSlider").on("change", function (event) {
        tempValue = event.target.valueAsNumber;
        console.log("temp slider value", tempValue);
        console.log("temp Default", temperatureSliderDefault);
        
        if (tempValue > temperatureSliderDefault) {
            height = height + (tempValue - temperatureSliderDefault);
            console.log("Height", height);
            console.log("difference", tempValue - temperatureSliderDefault)
        } else if (tempValue < temperatureSliderDefault) {
            height = height - (temperatureSliderDefault-tempValue);
            console.log("difference", temperatureSliderDefault-tempValue)
        }
        temperatureSliderDefault = tempValue;
        console.log("Height", height); 
        alterPolygon(height);
    });

    $("#vehicleSlider").on("change", function (event) {
        tempValue = event.target.valueAsNumber;
        console.log("temp slider value", tempValue);
        console.log("temp Default", vehicleSliderDefault);
        
        if (tempValue > vehicleSliderDefault) {
            height = height + (tempValue - vehicleSliderDefault);
            console.log("Height", height);
            console.log("difference", tempValue - vehicleSliderDefault)
        } else if (tempValue < vehicleSliderDefault) {
            height = height - (vehicleSliderDefault-tempValue);
            console.log("difference", vehicleSliderDefault-tempValue)
        }
        vehicleSliderDefault = tempValue;
        console.log("Height", height); 
        alterPolygon(height);
    });
    
    
    //???
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