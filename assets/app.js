var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city")
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var forecastContainerEl = document.querySelector("#forecast-container");


let APIkey = "a72e3fb63a67ce75037508eeb42b61ef";

var formSubmitHandler = (e) => {
    e.preventDefault();
    // get value from input element
    let cityName = cityInputEl.value.trim();

    if (cityName) {
        getCityDetails(cityName);

        cityInputEl.value = "";
    } else {
        alert("Please enter a city name.");
    }
};

var getCityDetails = (city) => {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;

    fetch(apiURL).then(function (response){
        if (response.ok) {
            response.json().then(function (data){
            //console.log(data);

        // creating vars for getWeatherDetails function
        var cityName = (data.name);
        var currentLat = (data.coord.lat);
        var currentLon = (data.coord.lon);
            console.log(currentLat);

            getWeatherDetails(cityName, currentLat, currentLon);
        });
        } else {
            alert("Error, this city could not be found.");
        }
    });
};

var getWeatherDetails = (city, currentLat, currentLon) => {
    var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLat + "&lon=" + currentLon + "&units=imperial&exclude=minutely,hourly&appid=" + APIkey;

    fetch(oneCallUrl).then( (response) => {
        response.json().then( (data) => {
            console.log(data);
            
        displayCityDetails(data, city);
        displayForcasted(data);

        });
    });
};

var displayCityDetails = (data, city) => {

    var currentTemp = Math.round(data.current.temp);
    console.log(currentTemp);
    var currentWind = Math.round(data.current.wind_speed);
    console.log(currentWind);
    var currentHumidity = (data.current.humidity);
    var currentUV = (data.current.uvi);
    var weatherIcon = (data.current.weather[0].icon)
    console.log(weatherIcon);
    

    cityContainerEl.textContent = "";
    var divCityHeader = document.createElement("div");
    var headerCityDateEl = document.createElement("h2");
    var currentDate = moment().format('L');
    var currentIcon = document.createElement("img");
    currentIcon.setAttribute('src', '');
    currentIcon.setAttribute('src', "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png" );

    headerCityDateEl.textContent = city + " (" + currentDate + ")";
    headerCityDateEl.setAttribute("class", "card-header");

    divCityHeader.appendChild(headerCityDateEl);
    divCityHeader.appendChild(currentIcon);
    cityContainerEl.appendChild(divCityHeader);


    var divCurrent = document.createElement("div");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p");
    var UvEl = document.createElement("p");

    tempEl.textContent = "Temperature: " + currentTemp + "°F";
    windEl.textContent = "Wind: " + currentWind + " MPH";
    humidityEl.textContent = "Humidity: " + currentHumidity + "%";
    UvEl.textContent = "UV Index: " + currentUV;

    divCurrent.appendChild(tempEl);
    divCurrent.appendChild(windEl);
    divCurrent.appendChild(humidityEl);
    divCurrent.appendChild(UvEl);

    cityContainerEl.appendChild(divCurrent);

};

var displayForcasted = (data) => {

    forecastContainerEl.textContent = "";

    for (let i = 0; i < 5; i++) {
        let cityForecast = Math.round(data.daily[i].temp.day);
        let windForecast = data.daily[i].wind_speed;
        let humidityForecast = data.daily[i].humidity;
        
       

    }
};






userFormEl.addEventListener('submit', formSubmitHandler);

