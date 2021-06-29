var findCityInput = $("#find-city");
var findCityBtn = $("#find-city-button");
var savedHistory = $('#saved-history');
var clearDataBtn = $("#clear-data");
var City = $("#city");
var Temp = $("#temp");
var Wind = $("#wind");
var Humidity = $("#humidity");
var UVindex = $("#uvindex");
var weatherData =$('#weather-data');
var cityList=[]


//Retrieve current date
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")")

//look for history and clear (if wanted)
checkHistory();
clearHistory();


//register city input from search hox
$(document).on("submit", function(){
    event.preventDefault();

    var searchValue = findCityInput.val().trim();

    currentConditions(searchValue)
    searchHistory(searchValue);
    findCityInput.val(""); 
});
 
//my API key from Open Weather
var APIkey = "d8b1de6dc1f6e8219e73d53dc5f1c2c3";

//butin click to add to search history
findCityBtn.on("click", function(event){
    event.preventDefault();
    var searchValue = findCityInput.val().trim();

    currentConditions(searchValue)
   searchHistory(searchValue);    
   findCityInput.val(""); 
});

// Clearing search history
clearHistoryButton.on("click", function(){ 
    cityList = [];

        // Update city list history in local storage
        listArray();
    
        $(this).addClass("hide");
    });
    
    // Clicking button will prompt city info
    savedHistory.on("click","li.city-btn", function(event) {
      
        var value = $(this).data("value");
         currentConditions(value);
        searchHistory(value); 
    
    });
    