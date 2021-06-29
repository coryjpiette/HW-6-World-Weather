var findCityInput = $("#find-city");
var findCityBtn = $("#find-city-button");
var savedHistory = $('#saved-history');
var clearDataBtn = $("#clear-data");
var City = $("#city");
var Temp = $("#temp");
var Wind = $("#wind");
var Humidity = $("#humidity");
var UVindex = $("#uvindex");
var weatherData = $('#weather-data');
var cityList = []


//Retrieve current date
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")")

//look for history and clear (if wanted)
lookupHistory();

clearHistory();


//register city input from search hox
$(document).on("submit", function () {
    event.preventDefault();

    var searchValue = findCityInput.val().trim();

    currentConditions(searchValue)
    searchHistory(searchValue);
    findCityInput.val("");
});

//my API key from Open Weather
var APIkey = "d8b1de6dc1f6e8219e73d53dc5f1c2c3";

//button click to add to search history
findCityBtn.on("click", function (event) {
    event.preventDefault();
    var searchValue = findCityInput.val().trim();

    currentConditions(searchValue)
    searchHistory(searchValue);
    findCityInput.val("");
});

// Clearing search history
clearHistoryButton.on("click", function () {
    cityList = [];

    // Update city list history in local storage
    listArray();

    $(this).addClass("hide");
});

// Clicking button will prompt city info
savedHistory.on("click", "li.city-btn", function (event) {

    var value = $(this).data("value");
    currentConditions(value);
    searchHistory(value);
});

// Request Open Weather API based on user input
function currentConditions(searchValue) {

    //AJAX API call
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            City.text(response.name);
            City.append("<small class='text-muted' id='current-date'>");
            $("#current-date").text("(" + currentDate + ")");
            City.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />")
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
            }).then(function (response) {
                UVindex.text(response.value);
            });

            //finding country code
            var countryCode = response.sys.country;
            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;

            // AJAX call - 5-day forecast
            $.ajax({
                url: forecastURL,
                method: "GET"
            })

                .then(function (response) {
                    console.log(response);
                    $('#five-day-forecast').empty();
                    for (var i = 1; i < response.list.length; i += 8) {

                        var forecastDateString = moment(response.list[i].dt_txt).format("L");
                        console.log(forecastDateString);

                        var forecastCol = $("<div class='col-12 col-md-6 col-lg forecast-day mb-3'>");
                        var forecastCard = $("<div class='card'>");
                        var forecastCardLayout = $("<div class='card-layout'>");
                        var forecastDate = $("<h4 class='card-title'>");
                        var forecastTemp = $("<p class='card-input mb-0'>");
                        var forecastWind = $("<p class='card-input mb-0'>");
                        var forecastHumidity = $("<p class='card-input mb-0'>");
                        var forecastIcon = $("<img>");

                        $('#five-day-forecast').append(forecastCol);
                        forecastCol.append(forecastCard);
                        forecastCard.append(forecastCardBody);

                        forecastCardLayout.append(forecastDate);
                        forecastCardLayout.append(forecastIcon);
                        forecastCardLaytout.append(forecastTemp);
                        forecastCardLayout.append(forecastHumidity);
                        forecastDate.text(forecastDateString);
                        forecastTemp.text(response.list[i].main.temp);
                        forecastTemp.prepend("Temp: ");
                        forecastTemp.append("&deg;F");
                        forecastWind.text(response.list[i].main.wind);
                        forecastWind.prepend("Wind: ");
                        forecastWind.append("MPH");
                        forecastHumidity.text(response.list[i].main.humidity);
                        forecastHumidity.prepend("Humidity: ");
                        forecastHumidity.append("%");
                        forecastIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                        forecastIcon.attr("alt", response.list[i].weather[0].main)


                    }
                });
        });

};

// Saving search history
function searchHistory(searchValue) {
   
    if (searchValue) {
        if (cityList.indexOf(searchValue) === -1) {
            cityList.push(searchValue);


// Display city history
listArray();
clearHistoryButton.removeClass("hide");
weatherContent.removeClass("hide");
} else {

var removeIndex = cityList.indexOf(searchValue);
cityList.splice(removeIndex, 1);


cityList.push(searchValue);

// retrieiving search history
listArray();
clearHistoryButton.removeClass("hide");
weatherContent.removeClass("hide");
}
}

}

// List the array into the search history sidebar
function listArray() {
    // Empty out the elements in the sidebar
    savedHistory.empty();

    // DIsplay cities on the side

    cityList.forEach(function(city){
        var searchHistoryItem = $('<li class="list-group-item city-btn">');
        searchHistoryItem.attr("data-value", city);
        searchHistoryItem.text(city);
        savedHistory.prepend(searchHistoryItem);
    });
    // Update city list history in local storage
    localStorage.setItem("cities", JSON.stringify(cityList));
    
}


