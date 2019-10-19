window.onload = function(){
    
    var $countryList = $("#countryDisplay");
    var displayCountry = "" +
    "<li data-id='{{countryName}}' latitude='{{latitude}}' longitude='{{longitude}}' population='{{population}}' class='country-list'>" + 
    "<p><strong>City Name: </strong> {{countryName}} </p>" +
    "<p><strong>Elevation: </strong> {{elevation}}(meter)</p>" +
    "<p><strong>Population: </strong> {{population}} </p>" +
    "</li>";

    function renderCountryList(data){
        $countryList.append(Mustache.render(displayCountry, data))                 
    }
    
    $.ajax({
        type: "GET",
        url: "../data/country_elevation.json",
        success: function(data){
            $.each(data, function(i, data){
                renderCountryList(data);
            })
        }
    });
};