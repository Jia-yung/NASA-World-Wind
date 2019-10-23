window.onload = function(){   
    var $countryList = $("#country-display");
    var displayCountry = "" +
    "<li data-id='{{countryName}}' latitude='{{latitude}}' longitude='{{longitude}}' population='{{population}}' class='country-list'>" + 
    "<p><strong>City Name: </strong> {{countryName}} </p>" +
    "<p><strong>Elevation: </strong> {{elevation}}(meter)</p>" +
    "<p><strong>Population: </strong> {{population}} </p>" +
    "<p><strong>Income Group: </strong> {{income group}} </p>" +
    "</li>";

    function renderCountryList(data){
        $countryList.append(Mustache.render(displayCountry, data))                 
    }
    
    $.ajax({
        type: "GET",
        url: "../data/city.json",
        success: function(data){
            $.each(data, function(i, data){
                renderCountryList(data);
            })
        }
    });
};