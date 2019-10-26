<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--CDN stylesheets for bootstrap-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href=https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css>
    
    <!--Custom CSS-->
    <link rel="stylesheet" href="css/visual.css">
</head>

<body>
    <?php include 'navigation.php';?>

    <div class="container-fluid">
        <div style="position: relative;">
            <div class="leftDropdown">
                <h4>Factors</h4>                
                <div class="dropdown">
                    <button class="stylo btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Options
                    </button>
                    <div class="options dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <p class="attrb" >Year: <output id="yearValue" ></output><br />
                            <input id="yearSlider" type="range" min="120" max="220" value="160.0" oninput="yearSliderChange(this.value)" style="width: 180px">
                        </p>
                        <p class="attrb" >Global Temperature(°C): <output id="temperatureValue"></output><br />
                            <input id="temperatureSlider" type="range" min="50" max="300" value="150.0" oninput="temperatureSliderChange(this.value)" style="width: 180px">
                        </p>
                        <p class="attrb" >Vehicles: <output id="vehicleValue"></output><br />
                            <input id="vehicleSlider" type="range" min="120" max="220" value="160.0" oninput="vehicleSliderChange(this.value)" style="width: 180px">
                        </p>
                    </div>
                </div>
                <!--<h4>Projection</h4>-->
                <!--<div class="dropdown" id="projectionDropdown"></div>-->
                <br>
                <h4>Layers</h4> 
                <div class="layers-list-section">           
                    <div class="list-group" id="layerList"></div>
                </div>          
                <br>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <canvas id="canvasOne">Your browser does not support HTML5 Canvas.</canvas>
            </div>
        </div>
        <div class="country-section">
            <h4 class="country-title">Sinking Cities</h4>
            <div class="country-list-section"> 
                <ul id="country-display"></ul>
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
        function yearSliderChange(val) {
            document.getElementById('yearValue').innerHTML = (val * 10) + 300;          
        }

        function temperatureSliderChange(val) {
            document.getElementById('temperatureValue').innerHTML = val/100;            
        }  
        
        function vehicleSliderChange(val) {
            document.getElementById('vehicleValue').innerHTML = val * 100000;            
        }  
    </script>
</body>
</html>