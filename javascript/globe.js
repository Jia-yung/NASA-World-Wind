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

    //Add Ice Berg
    


    var polygonLayer = new WorldWind.RenderableLayer("Polygon");
    wwd.addLayer(polygonLayer);

    var polygonAttributes = new WorldWind.ShapeAttributes(null);
    polygonAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.75);

    var boundariesMediumIce = [];
    boundariesMediumIce.push(new WorldWind.Position(66.0, -46.5, 299999.0));//left hill's left point
    boundariesMediumIce.push(new WorldWind.Position(70.0, -25.0, 399999.0));//next to ^ (right)
    boundariesMediumIce.push(new WorldWind.Position(76.7, -37.0, 499999.0));
    boundariesMediumIce.push(new WorldWind.Position(73.2, -37.7, 599999.0));//point between hill
    boundariesMediumIce.push(new WorldWind.Position(73.9, -46.9, 299999.0));//left hill top point

    var boundariesLargeIce = [];
    boundariesLargeIce.push(new WorldWind.Position(-78.7, 273.8, 380000.0));
    boundariesLargeIce.push(new WorldWind.Position(-79.6, 1052.6, 380000.0));
    boundariesLargeIce.push(new WorldWind.Position(-70.9, 0, 380000.0));
    boundariesLargeIce.push(new WorldWind.Position(-73.9, 400.7, 380000.0));
    boundariesLargeIce.push(new WorldWind.Position(-73.1, 453.5, 380000.0));
    boundariesLargeIce.push(new WorldWind.Position(-72.1, 157.5, 380000.0));
    boundariesLargeIce.push(new WorldWind.Position(-85.1, 172.5, 380000.0));
    boundariesLargeIce.push(new WorldWind.Position(-77.0, -135.1, 380000.0));
               
    polygon = new WorldWind.Polygon(boundariesMediumIce, polygonAttributes);
    polygon.extrude = true;
    polygonLayer.addRenderable(polygon);

    iceLarge = new WorldWind.Polygon(boundariesLargeIce, polygonAttributes);
    iceLarge.extrude = true
    polygonLayer.addRenderable(iceLarge);


    function alterFlood(height){
        tempValue = height;
        //floodPolygonLayer.removeRenderable(floodPolygon)
        floodPolygonLayer.removeAllRenderables();

        var floodPolygonAttributes = new WorldWind.ShapeAttributes(null);
        floodPolygonAttributes.interiorColor = new WorldWind.Color(0, 0, 1, 0.5);

        var floodBoundariesItaly = [];
        floodBoundariesItaly.push(new WorldWind.Position(45.429551 - (tempValue/100000), 12.329877 - (tempValue/100000), 100));
        floodBoundariesItaly.push(new WorldWind.Position(45.433707 + (tempValue/100000), 12.332708 , 100));
        floodBoundariesItaly.push(new WorldWind.Position(45.433346 , 12.337855 , 100));
        floodBoundariesItaly.push(new WorldWind.Position(45.429672 , 12.336526 , 100));  
        
        var floodBoundariesJakarta = [];
        floodBoundariesJakarta.push(new WorldWind.Position(-6.115207, 106.777383, 100));
        floodBoundariesJakarta.push(new WorldWind.Position(-6.112979, 106.884453, 100));
        floodBoundariesJakarta.push(new WorldWind.Position(-6.14, 106.86, 100));
        floodBoundariesJakarta.push(new WorldWind.Position(-6.15-(tempValue/10000), 106.86, 100));
        floodBoundariesJakarta.push(new WorldWind.Position(-6.181932-(tempValue/10000), 106.801405, 100));

        var floodBoundariesLouisiana = [];
        floodBoundariesLouisiana.push(new WorldWind.Position(30.022370, -90.198489, 100));
        floodBoundariesLouisiana.push(new WorldWind.Position(30.012858-(tempValue/10000), -90.198489-(tempValue/10000), 100));
        floodBoundariesLouisiana.push(new WorldWind.Position(30.011074-(tempValue/10000), -90.114755+(tempValue/10000), 100));
        floodBoundariesLouisiana.push(new WorldWind.Position(30.027721, -90.101028, 100));

        var floodPolygonItaly = new WorldWind.Polygon(floodBoundariesItaly, floodPolygonAttributes);
        floodPolygonItaly.extrude = false;
        floodPolygonLayer.addRenderable(floodPolygonItaly);

        var floodPolygonJakarta = new WorldWind.Polygon(floodBoundariesJakarta, floodPolygonAttributes);
        floodPolygonJakarta.extrude = false;
        floodPolygonLayer.addRenderable(floodPolygonJakarta);

        var floodPolygonLouisiana = new WorldWind.Polygon(floodBoundariesLouisiana, floodPolygonAttributes);
        floodBoundariesLouisiana.extrude = false;
        floodPolygonLayer.addRenderable(floodPolygonLouisiana);
    };

    function alterPolygon(height) {
        polygonLayer.removeAllRenderables()
        var sliderValue = height/100;
        console.log("slider value", sliderValue);

        var boundariesMediumIce2 = [];
        boundariesMediumIce2.push(new WorldWind.Position(66.0, -46.5, 499999.0/sliderValue));//left hill's left point
        boundariesMediumIce2.push(new WorldWind.Position(70.0, -25.0, 599999.0/sliderValue));//next to ^ (right)
        boundariesMediumIce2.push(new WorldWind.Position(76.7, -37.0, 699999.0/sliderValue));
        boundariesMediumIce2.push(new WorldWind.Position(73.2, -37.7, 799999.0/sliderValue));//point between hill
        boundariesMediumIce2.push(new WorldWind.Position(73.9, -46.9, 499999.0/sliderValue));//left hill top point  

        var boundariesLargeIce2 = [];
        boundariesLargeIce2.push(new WorldWind.Position(-78.7, 273.8, 380000.0/sliderValue));
        boundariesLargeIce2.push(new WorldWind.Position(-79.6, 1052.6, 380000.0/sliderValue));
        boundariesLargeIce2.push(new WorldWind.Position(-70.9, 0, 380000.0/sliderValue));
        boundariesLargeIce2.push(new WorldWind.Position(-73.9, 400.7, 380000.0/sliderValue));
        boundariesLargeIce2.push(new WorldWind.Position(-73.1, 453.5, 380000.0/sliderValue));
        boundariesLargeIce2.push(new WorldWind.Position(-72.1, 157.5, 380000.0/sliderValue));
        boundariesLargeIce2.push(new WorldWind.Position(-85.1, 172.5, 380000.0/sliderValue));
        boundariesLargeIce2.push(new WorldWind.Position(-77.0, -135.1, 380000.0/sliderValue));
               
        polygon = new WorldWind.Polygon(boundariesMediumIce2, polygonAttributes);
        polygon.extrude = true
        polygonLayer.addRenderable(polygon);

        iceLarge = new WorldWind.Polygon(boundariesLargeIce2, polygonAttributes);
        iceLarge.extrude = true
        polygonLayer.addRenderable(iceLarge);
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
        
        if (value > yearSliderDefault) {
            height = height + (value - yearSliderDefault);
        } else if (value < yearSliderDefault) {
            height = height - (yearSliderDefault-value);
        }
        yearSliderDefault = value;
        alterPolygon(height);
        alterFlood(height)
    });

    $("#temperatureSlider").on("change", function (event) {
        tempValue = event.target.valueAsNumber;
        
        if (tempValue > temperatureSliderDefault) {
            height = height + (tempValue - temperatureSliderDefault);
        } else if (tempValue < temperatureSliderDefault) {
            height = height - (temperatureSliderDefault-tempValue);
        }
        temperatureSliderDefault = tempValue;

        alterPolygon(height);
        alterFlood(height);
    });

    $("#vehicleSlider").on("change", function (event) {
        tempValue = event.target.valueAsNumber;
        
        if (tempValue > vehicleSliderDefault) {
            height = height + (tempValue - vehicleSliderDefault);
           
        } else if (tempValue < vehicleSliderDefault) {
            height = height - (vehicleSliderDefault-tempValue);
        }
        vehicleSliderDefault = tempValue;
        alterPolygon(height);
        alterFlood(height)
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

    var floodPolygonLayer = new WorldWind.RenderableLayer("Flood");
    wwd.addLayer(floodPolygonLayer);

    var floodPolygonAttributes = new WorldWind.ShapeAttributes(null);
    floodPolygonAttributes.interiorColor = new WorldWind.Color(0, 0, 1, 0.5);

    var floodBoundariesItaly = [];
    floodBoundariesItaly.push(new WorldWind.Position(45.429551, 12.329877, 100));
    floodBoundariesItaly.push(new WorldWind.Position(45.433707, 12.332708, 100));
    floodBoundariesItaly.push(new WorldWind.Position(45.433346, 12.337855, 100));
    floodBoundariesItaly.push(new WorldWind.Position(45.429672, 12.336526, 100));

    var floodBoundariesJakarta = [];
    floodBoundariesJakarta.push(new WorldWind.Position(-6.115207, 106.777383, 100));
    floodBoundariesJakarta.push(new WorldWind.Position(-6.112979, 106.884453, 100));
    floodBoundariesJakarta.push(new WorldWind.Position(-6.14, 106.86, 100));
    floodBoundariesJakarta.push(new WorldWind.Position(-6.15, 106.86, 100));
    floodBoundariesJakarta.push(new WorldWind.Position(-6.181932, 106.801405, 100));

    var floodBoundariesLouisiana = [];
    floodBoundariesLouisiana.push(new WorldWind.Position(30.022370, -90.198489, 100));
    floodBoundariesLouisiana.push(new WorldWind.Position(30.012858, -90.198489, 100));
    floodBoundariesLouisiana.push(new WorldWind.Position(30.011074, -90.114755, 100));
    floodBoundariesLouisiana.push(new WorldWind.Position(30.027721, -90.101028, 100));


    var floodPolygonItaly = new WorldWind.Polygon(floodBoundariesItaly, floodPolygonAttributes);
    var floodPolygonJakarta = new WorldWind.Polygon(floodBoundariesJakarta, floodPolygonAttributes);
    var floodPolygonLouisiana = new WorldWind.Polygon(floodBoundariesLouisiana, floodPolygonAttributes);
    floodPolygonItaly.extrude = false;
    floodPolygonJakarta.extrude = false;
    floodPolygonLouisiana.extrude = false;
    floodPolygonLayer.addRenderable(floodPolygonItaly);
    floodPolygonLayer.addRenderable(floodPolygonJakarta);
    floodPolygonLayer.addRenderable(floodPolygonLouisiana);

    $("#jiji").on("change", function (event) {
        tempValue = event.target.valueAsNumber;
        //floodPolygonLayer.removeRenderable(floodPolygon)
        floodPolygonLayer.removeAllRenderables();

        var floodPolygonAttributes = new WorldWind.ShapeAttributes(null);
        floodPolygonAttributes.interiorColor = new WorldWind.Color(0, 0, 1, 0.5);

        var floodBoundariesItaly = [];
        floodBoundariesItaly.push(new WorldWind.Position(45.429551 - (tempValue/100000), 12.329877 - (tempValue/100000), 100));
        floodBoundariesItaly.push(new WorldWind.Position(45.433707 + (tempValue/100000), 12.332708 , 100));
        floodBoundariesItaly.push(new WorldWind.Position(45.433346 , 12.337855 , 100));
        floodBoundariesItaly.push(new WorldWind.Position(45.429672 , 12.336526 , 100));  
        
        var floodBoundariesJakarta = [];
        floodBoundariesJakarta.push(new WorldWind.Position(-6.115207, 106.777383, 100));
        floodBoundariesJakarta.push(new WorldWind.Position(-6.112979, 106.884453, 100));
        floodBoundariesJakarta.push(new WorldWind.Position(-6.14, 106.86, 100));
        floodBoundariesJakarta.push(new WorldWind.Position(-6.15-(tempValue/10000), 106.86, 100));
        floodBoundariesJakarta.push(new WorldWind.Position(-6.181932-(tempValue/10000), 106.801405, 100));

        var floodBoundariesLouisiana = [];
        floodBoundariesLouisiana.push(new WorldWind.Position(30.06000, -90.265525, 100));
        floodBoundariesLouisiana.push(new WorldWind.Position(29.969723, -90.364359, 100));
        floodBoundariesLouisiana.push(new WorldWind.Position(29.936407-(tempValue/10000), -90.290233, 100));
        floodBoundariesLouisiana.push(new WorldWind.Position(29.99-(tempValue/10000), -90.21, 100));
        floodBoundariesLouisiana.push(new WorldWind.Position(30.03-(tempValue/10000), -90.183164+(tempValue/10000), 100));
        floodBoundariesLouisiana.push(new WorldWind.Position(30.06000, -90.265525, 100));

        var floodPolygonItaly = new WorldWind.Polygon(floodBoundariesItaly, floodPolygonAttributes);
        floodPolygonItaly.extrude = false;
        floodPolygonLayer.addRenderable(floodPolygonItaly);

        var floodPolygonJakarta = new WorldWind.Polygon(floodBoundariesJakarta, floodPolygonAttributes);
        floodPolygonJakarta.extrude = false;
        floodPolygonLayer.addRenderable(floodPolygonJakarta);

        var floodPolygonLouisiana = new WorldWind.Polygon(floodBoundariesLouisiana, floodPolygonAttributes);
        floodBoundariesLouisiana.extrude = false;
        floodPolygonLayer.addRenderable(floodPolygonLouisiana);
        
    });

    var layerManager = new LayerManager(wwd);
});