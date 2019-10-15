window.onload = function(){

    var countryContainer = document.getElementById("country-info");
    var $countryList = $("#countryList");

    var displayCountry = "" +
    "<li class='country-list'>" + 
    "<p><strong>Country Name: </strong> {{countryName}} </p>" +
    "<p><strong>Population: </strong> {{population}} </p>" +
    "<button data-id='{{id}}' class='show'>Go To</button>" +
    "</li>";

    function renderCountryList(data){
        var countryName="";
        //for (i = 0; i < data.length; i++){
            console.log(data)
            $countryList.append(Mustache.render(displayCountry, data))                 
        //}
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

    $countryList.on("click", ".show", function(){
        var $li = $(this).closest('li');
        console.log($li);      
    });
};