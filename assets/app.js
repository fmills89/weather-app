var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var cityContainerEl = document.querySelector('#city-container');
var searchHistoryEl = document.querySelector('#search-history');
var forecastContainerEl = document.querySelector('#forecast-container');

var APIkey = 'a72e3fb63a67ce75037508eeb42b61ef';
var cities = [];

// var loadCities = () => {
//     var citiesLoaded = localStorage.getItem('cities')
//     if(!citiesLoaded) {
//         return false;
//     }

//     citiesLoaded = JSON.parse(citiesLoaded);

//     for(var i = 0; i < citiesLoaded.length; i++) {
//         displaySearchedCities(citiesLoaded[i])
//         citiesLoaded.push(citiesLoaded[i])
//     }
// }

// var saveCities = () => {
//     localStorage.setItem("cities", JSON.stringify(cities));
// }

// function working - addl styling to dynamically displayed elements done
// revist event listener to show city details on click
var displaySearchedCities = city => {
  var cityCardEl = document.createElement('div');
  cityCardEl.setAttribute(
    'class',
    'border rounded-md p-4 m-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 text-center'
  );
  var cityCardNameEl = document.createElement('div');
  cityCardNameEl.setAttribute('class', 'card-body searched-city');
  cityCardNameEl.textContent = city;

  cityCardEl.appendChild(cityCardNameEl);

  //   cityCardEl.addEventListener('click', function () {
  //     getCityDetails(city);
  //   });

  searchHistoryEl.appendChild(cityCardEl);
};

// grabbing user input (city) function working
var formSubmitHandler = e => {
  e.preventDefault();
  // get value from input element
  let cityName = cityInputEl.value.trim();

  if (cityName) {
    getCityDetails(cityName);

    cityInputEl.value = '';
  } else {
    alert('Please enter a city name.');
  }
};

// calling api and grabbing city detail based on user input
var getCityDetails = city => {
  var apiURL =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&units=imperial&appid=' +
    APIkey;

  fetch(apiURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        // creating vars for getWeatherDetails function
        var cityName = data.name;
        var currentLat = data.coord.lat;
        var currentLon = data.coord.lon;

        var prevSearch = cities.includes(cityName);
        if (!prevSearch) {
          cities.push(cityName);
          //   saveCities();
          displaySearchedCities(cityName);
        }

        // getWeatherDetails(cityName, currentLat, currentLon);
      });
    } else {
      alert('Error, this city could not be found.');
    }
  });
};

// var getWeatherDetails = (city, currentLat, currentLon) => {
//     var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLat + "&lon=" + currentLon + "&units=imperial&exclude=minutely,hourly&appid=" + APIkey;

//     fetch(oneCallUrl).then( (response) => {
//         response.json().then( (data) => {
//             console.log(data);

//         displayCityDetails(data, city);
//         displayForcasted(data);

//         });
//     });
// };

// var displayCityDetails = (data, city) => {

//     var currentTemp = Math.round(data.current.temp);
//     console.log(currentTemp);
//     var currentWind = Math.round(data.current.wind_speed);
//     console.log(currentWind);
//     var currentHumidity = (data.current.humidity);
//     var currentUV = (data.current.uvi);
//     var weatherIcon = (data.current.weather[0].icon)
//     console.log(weatherIcon);

//     cityContainerEl.textContent = "";
//     var divCityHeader = document.createElement("div");
//     var headerCityDateEl = document.createElement("h2");
//     var currentDate = moment().format('L');
//     var currentIcon = document.createElement("img");
//     currentIcon.setAttribute('src', '');
//     currentIcon.setAttribute('src', "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png" );

//     headerCityDateEl.textContent = city + " (" + currentDate + ")";
//     headerCityDateEl.setAttribute("class", "card-header");

//     divCityHeader.appendChild(headerCityDateEl);
//     divCityHeader.appendChild(currentIcon);
//     cityContainerEl.appendChild(divCityHeader);

//     var divCurrent = document.createElement("div");
//     var tempEl = document.createElement("p");
//     var windEl = document.createElement("p");
//     var humidityEl = document.createElement("p");
//     var UvEl = document.createElement("p");

//     tempEl.textContent = "Temperature: " + currentTemp + "°F";
//     windEl.textContent = "Wind: " + currentWind + " MPH";
//     humidityEl.textContent = "Humidity: " + currentHumidity + "%";
//     UvEl.textContent = "UV Index: " + currentUV;

//     divCurrent.appendChild(tempEl);
//     divCurrent.appendChild(windEl);
//     divCurrent.appendChild(humidityEl);
//     divCurrent.appendChild(UvEl);

//     cityContainerEl.appendChild(divCurrent);

// };

// var displayForcasted = (data) => {

//     forecastContainerEl.textContent = "";

//     for (var i = 0; i < 5; i++) {
//         var cityForecast = Math.round(data.daily[i].temp.day);
//         var windForecast = data.daily[i].wind_speed;
//         var humidityForecast = data.daily[i].humidity;
//         var forecastIcon = data.daily[i].weather[0].icon;
//         console.log(cityForecast);
//         console.log(forecastIcon);

//         var cardEl = document.createElement("div");
//         cardEl.setAttribute("class", "card col-xl-2 col-md-5 col-sm-10 mx-3 my-2 bg-primary text-white text-center");

//         var cardBodyEl = document.createElement("div");
//         cardBodyEl.setAttribute("class","card-body");

//         var cardDateEl = document.createElement("h6");
//         cardDateEl.textContent = moment().add(i, 'days').format('L');

//         var cardIconEl = document.createElement("img");
//         cardIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png")

//         var cardTempEl = document.createElement("p");
//         cardTempEl.setAttribute("class", "card-text");
//         cardTempEl.textContent = "Temperature: " + cityForecast + "°F";

//         var cardWindEl = document.createElement("p");
//         cardWindEl.setAttribute("class", "card-text");
//         cardWindEl.textContent = "Wind: " + windForecast;

//         var cardHumidEl = document.createElement("p");
//         cardHumidEl.setAttribute("class", "card-text");
//         cardHumidEl.textContent = "Humidity: " + humidityForecast + "%";

//         cardBodyEl.appendChild(cardDateEl);
//         cardBodyEl.appendChild(cardIconEl);
//         cardBodyEl.appendChild(cardTempEl);
//         cardBodyEl.appendChild(cardWindEl);
//         cardBodyEl.appendChild(cardHumidEl);

//         cardEl.appendChild(cardBodyEl);
//         forecastContainerEl.appendChild(cardEl);

//         userFormEl.reset();

//     }
// };

// loadCities();

userFormEl.addEventListener('submit', formSubmitHandler);
