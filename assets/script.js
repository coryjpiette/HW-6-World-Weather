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

//registered for my own API key on Open Weather
var APIkey="d8b1de6dc1f6e8219e73d53dc5f1c2c3"

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
 
