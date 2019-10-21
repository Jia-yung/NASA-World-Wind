define(function () {
    "use strict";
    /**
     * Constructs a layer manager for a specified {@link WorldWindow}.
     * @alias LayerManager
     * @constructor
     * @classdesc Provides a layer manager to interactively control layer visibility for a WorldWindow.
     * @param {WorldWindow} worldWindow The WorldWindow to associated this layer manager with.
     */
    var LayerManager = function (worldWindow) {
        var thisExplorer = this;
        var $countryList = $("#countryDisplay");
        this.wwd = worldWindow;

        this.roundGlobe = this.wwd.globe;

        this.createProjectionList();
        $("#projectionDropdown").find(" li").on("click", function (e) {
            thisExplorer.onProjectionClick(e);
        });

        this.synchronizeLayerList();

        $("#searchBox").find("button").on("click", function (e) {
            thisExplorer.onSearchButton(e);
        });

        this.geocoder = new WorldWind.NominatimGeocoder();
        this.goToAnimator = new WorldWind.GoToAnimator(this.wwd);     
        
        $("#searchText").on("keypress", function (e) {
            thisExplorer.onSearchTextKeyPress($(this), e);
        });
        
        var placemarkLayer = new WorldWind.RenderableLayer("placemark");
        this.wwd.addLayer(placemarkLayer);

        var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
        placemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.3, WorldWind.OFFSET_FRACTION, 0.0);
        placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
        placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 1.0);
        placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";
        
        $countryList.on("click", ".country-list", function(){ 
            thisExplorer.print();
            var li = $(this).closest('li');
            var name = li[0].dataset.id; 
            var population = li[0].attributes.population.value;
            var latitude = li[0].attributes.latitude.value;
            var longitude = li[0].attributes.longitude.value;
            var position = new WorldWind.Position(latitude, longitude, 100.0);          
            var countryPlacemark = new WorldWind.Placemark(position, false, placemarkAttributes); 
            
            thisExplorer.performSearch(name);

            placemarkLayer.removeAllRenderables();           
            countryPlacemark.label = name + "\n" + "population: " + population;
            countryPlacemark.alwaysOnTop = true;
            placemarkLayer.addRenderable(countryPlacemark);

            thisExplorer.floodPolygon(latitude, longitude);
        });

        //
        //this.wwd.redrawCallbacks.push(function (worldWindow, stage) {
        //    if (stage == WorldWind.AFTER_REDRAW) {
        //        thisExplorer.updateVisibilityState(worldWindow);
        //    }
        //});

       
    };

    LayerManager.prototype.floodPolygon = function(latitude, longitude){
        var floodPolygonLayer = new WorldWind.RenderableLayer("Flood");
        this.wwd.addLayer(floodPolygonLayer);

        var floodPolygonAttributes = new WorldWind.ShapeAttributes(null);
        floodPolygonAttributes.interiorColor = new WorldWind.Color(214, 234, 248, 0.5);

        var floodBoundaries = [];
        floodBoundaries.push(new WorldWind.Position(latitude, longitude, 1001000));
        floodBoundaries.push(new WorldWind.Position(latitude+3, longitude+1, 1001000));
        floodBoundaries.push(new WorldWind.Position(latitude+4, longitude+4, 1001000));

        var floodPolygon = new WorldWind.Polygon(floodBoundaries, floodPolygonAttributes);
        floodPolygon.extrude = false;
        floodPolygonLayer.addRenderable(floodPolygon);
    };

    LayerManager.prototype.print = function(){
        console.log("Hello Here")
    };

    LayerManager.prototype.onProjectionClick = function (event) {
        var projectionName = event.target.innerText || event.target.innerHTML;
        $("#projectionDropdown").find("button").html(projectionName + ' <span class="caret"></span>');

        if (projectionName === "3D") {
            if (!this.roundGlobe) {
                this.roundGlobe = new WorldWind.Globe(new WorldWind.EarthElevationModel());
            }

            if (this.wwd.globe !== this.roundGlobe) {
                this.wwd.globe = this.roundGlobe;
            }
        } else {
            if (!this.flatGlobe) {
                this.flatGlobe = new WorldWind.Globe2D();
            }

            if (projectionName === "Equirectangular") {
                this.flatGlobe.projection = new WorldWind.ProjectionEquirectangular();
            } else if (projectionName === "Mercator") {
                this.flatGlobe.projection = new WorldWind.ProjectionMercator();
            } else if (projectionName === "North Polar") {
                this.flatGlobe.projection = new WorldWind.ProjectionPolarEquidistant("North");
            } else if (projectionName === "South Polar") {
                this.flatGlobe.projection = new WorldWind.ProjectionPolarEquidistant("South");
            } else if (projectionName === "North UPS") {
                this.flatGlobe.projection = new WorldWind.ProjectionUPS("North");
            } else if (projectionName === "South UPS") {
                this.flatGlobe.projection = new WorldWind.ProjectionUPS("South");
            } else if (projectionName === "North Gnomonic") {
                this.flatGlobe.projection = new WorldWind.ProjectionGnomonic("North");
            } else if (projectionName === "South Gnomonic") {
                this.flatGlobe.projection = new WorldWind.ProjectionGnomonic("South");
            }

            if (this.wwd.globe !== this.flatGlobe) {
                this.wwd.globe = this.flatGlobe;
            }
        }

        this.wwd.redraw();
    };

    LayerManager.prototype.onLayerClick = function (layerButton) {
        var layerName = layerButton.text();

        // Update the layer state for the selected layer.
        for (var i = 0, len = this.wwd.layers.length; i < len; i++) {
            var layer = this.wwd.layers[i];
            if (layer.hide) {
                continue;
            }

            if (layer.displayName === layerName) {
                layer.enabled = !layer.enabled;
                if (layer.enabled) {
                    layerButton.addClass("active");
                } else {
                    layerButton.removeClass("active");
                }
                this.wwd.redraw();
                break;
            }
        }
    };

    LayerManager.prototype.synchronizeLayerList = function () {
        var layerListItem = $("#layerList");

        layerListItem.find("button").off("click");
        layerListItem.find("button").remove();

        // Synchronize the displayed layer list with the WorldWindow's layer list.
        for (var i = 0, len = this.wwd.layers.length; i < len; i++) {
            var layer = this.wwd.layers[i];
            if (layer.hide) {
                continue;
            }
            var layerItem = $('<button class="list-group-item btn list-group-item-light btn-block btn-sm">' + layer.displayName + '</button>');
            layerListItem.append(layerItem);

            if (layer.showSpinner && Spinner) {
                var opts = {
                    scale: 0.9,
                };
                var spinner = new Spinner(opts).spin();
                layerItem.append(spinner.el);
            }

            if (layer.enabled) {
                layerItem.addClass("active");
            } else {
                layerItem.removeClass("active");
            }
        }

        var self = this;
        layerListItem.find("button").on("click", function (e) {
            self.onLayerClick($(this));
        });
    };

    LayerManager.prototype.createProjectionList = function () {
        var projectionNames = [
            "3D",
            "Equirectangular",
            "Mercator",
            "North Polar",
            "South Polar",
            "North UPS",
            "South UPS",
            "North Gnomonic",
            "South Gnomonic"
        ];
        var projectionDropdown = $("#projectionDropdown");

        var dropdownButton = $('<button class="btn btn-info btn-block dropdown-toggle" type="button" data-toggle="dropdown">3D<span class="caret"></span></button>');
        projectionDropdown.append(dropdownButton);

        var ulItem = $('<ul class="dropdown-menu">');
        projectionDropdown.append(ulItem);

        for (var i = 0; i < projectionNames.length; i++) {
            var projectionItem = $('<li><a>' + projectionNames[i] + '</a></li>');
            ulItem.append(projectionItem);
        }

        ulItem = $('</ul>');
        projectionDropdown.append(ulItem);
    };

    LayerManager.prototype.onSearchButton = function (event) {
        this.performSearch($("#searchText")[0].value)
    };

    LayerManager.prototype.onSearchTextKeyPress = function (searchInput, event) {
        if (event.keyCode === 13) {
            searchInput.blur();
            this.performSearch($("#searchText")[0].value)
        }
    };

    LayerManager.prototype.performSearch = function (queryString) {
        if (queryString) {
            var thisLayerManager = this,
                latitude, longitude;

            if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
                var tokens = queryString.split(",");
                latitude = parseFloat(tokens[0]);
                longitude = parseFloat(tokens[1]);
                thisLayerManager.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
            } else {
                this.geocoder.lookup(queryString, function (geocoder, result) {
                    if (result.length > 0) {
                        latitude = parseFloat(result[0].lat);
                        longitude = parseFloat(result[0].lon);

                        WorldWind.Logger.log(
                            WorldWind.Logger.LEVEL_INFO, queryString + ": " + latitude + ", " + longitude);

                        thisLayerManager.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
                    }
                });
            }
        }
    };

    return LayerManager;
});
