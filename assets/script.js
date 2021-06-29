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

//button click to add to search history
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
    
// Request Open Weather API based on user input
function  currentConditions(searchValue) {
    
    //AJAX API call
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=" + APIkey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
        City.text(response.name);
        City.append("<small class='text-muted' id='current-date'>");
        $("#current-date").text("(" + currentDate + ")");
        City.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />" )
        Temp.text(response.main.temp);
        Temp.append("&deg;F");
        Humidity.text(response.main.humidity + "%");
        Wind.text(response.wind.speed + "MPH");

        var lat = response.coord.lat;
        var long = response.coord.long;
        

        var UVurl = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + long + "&appid=" + APIkey;
        //AJAX call - UV index
        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function(response){
            UVindex.text(response.value);
        });

        //finding country code
        var countryCode = response.sys.country;
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + APIkey + "&lat=" + lat +  "&lon=" + lon;

        });

    }

    


