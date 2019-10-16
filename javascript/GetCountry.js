window.onload = function(){
    
    var $countryList = $("#countryDisplay");
    var displayCountry = "" +
    "<li data-id='{{countryName}}' class='country-list'>" + 
    "<p><strong>Country Name: </strong> {{countryName}} </p>" +
    "<p><strong>Population: </strong> {{population}} </p>" +
    "</li>";

    function renderCountryList(data){
        console.log(data)
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