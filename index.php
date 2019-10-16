<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--CDN stylesheets for bootstrap-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/custom.css">
</head>

<body>
    <?php include 'navigation.php';?>

    <div class="container-fluid">
        <div style="position: relative;">
            <div class="leftDropdown">
                <h4>Projection</h4>
                <div class="dropdown" id="projectionDropdown"></div>
                <br>
                <h4>Layers</h4>
                <p>Year: <output id="lengthValue" style="color: blue"></output><br />
                    <input id="lengthSlider" type="range" min="170" max="220" value="100.0"
                        oninput="lengthSliderChange(this.value)" style="width: 200px"></p>
                <div class="list-group" id="layerList">
                </div>
                <br>
                <h4>Destination</h4>
                <div class="input-group" id="searchBox">
                    <input type="text" class="form-control" placeholder="GoTo" id="searchText" />
                    <div class="input-group-btn">
                        <button id="searchButton" class="btn btn-primary" type="button">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <canvas id="canvasOne">Your browser does not support HTML5 Canvas.</canvas>
            </div>
        </div>
        <div>           
            <div class="countryDisplaySection"> 
                <p class="countryDisplayHeader">List of Sinking country</p>  
                <ul id="countryDisplay"></ul>
            </div>
        </div>     
       
    </div>

    <!--jQuery-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

   <!--popper and javascript plugin-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    
    <!--script to load list of country display section-->
    <script src="javascript/GetCountry.js"></script>
    <script src="/node_modules/mustache/mustache.js"></script> 

    <!--script element to include Web WorldWind library-->
     <script src="https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/worldwind.min.js" type="text/javascript"></script>

    <!--javascript to render the globe-->
    <script data-main="javascript/Globe" src="javascript/requirejs2.3.6.js"></script>
    
    <!--javascript to resize the globe on display size change-->
    <script src="javascript/ResizeCanvas.js"></script>
     
    <script>
        function lengthSliderChange(val) {
            document.getElementById('lengthValue').innerHTML = val * 10;
        }    
    </script>
</body>
</html>