var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var cityContainerEl = document.querySelector('#city-container');
var searchHistoryEl = document.querySelector('#search-history');
var forecastContainerEl = document.querySelector('#forecast-container');

var APIkey = 'a72e3fb63a67ce75037508eeb42b61ef';
var cities = [];

var loadCities = () => {
  var citiesLoaded = localStorage.getItem('cities');
  if (!citiesLoaded) {
    return false;
  }

  citiesLoaded = JSON.parse(citiesLoaded);
  console.log(citiesLoaded);

  for (var i = 0; i < citiesLoaded.length; i++) {
    displaySearchedCities(citiesLoaded[i]);
    cities.push(citiesLoaded[i]);
  }
};

var saveCities = () => {
  localStorage.setItem('cities', JSON.stringify(cities));
};

// function working - addl styling to dynamically displayed elements done
// revist event listener to show city details on click
var displaySearchedCities = city => {
  var cityCardEl = document.createElement('div');
  cityCardEl.setAttribute('class', 'button pl-2 ml-2');
  var cityCardNameEl = document.createElement('div');
  cityCardNameEl.setAttribute('class', 'card-body searched-city');
  cityCardNameEl.textContent = city;

  cityCardEl.appendChild(cityCardNameEl);

  cityCardEl.addEventListener('click', function () {
    getCityDetails(city);
  });

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
        // console.log(data);

        // creating vars for getWeatherDetails function
        var cityName = data.name;
        var currentLat = data.coord.lat;
        var currentLon = data.coord.lon;

        var prevSearch = cities.includes(cityName);
        if (!prevSearch) {
          cities.push(cityName);
          saveCities();
          displaySearchedCities(cityName);
        }

        getWeatherDetails(cityName, currentLat, currentLon);
      });
    } else {
      alert('Error, this city could not be found.');
    }
  });
};

// function/api call working
var getWeatherDetails = (city, currentLat, currentLon) => {
  var oneCallUrl =
    'https://api.openweathermap.org/data/2.5/onecall?lat=' +
    currentLat +
    '&lon=' +
    currentLon +
    '&units=imperial&exclude=minutely,hourly&appid=' +
    APIkey;

  fetch(oneCallUrl).then(response => {
    response.json().then(data => {
      console.log(data);

      displayCityDetails(data, city);
      displayForcasted(data);
    });
  });
};

//function/styling done
var displayCityDetails = (data, city) => {
  var currentTemp = Math.round(data.current.temp);
  var currentWind = Math.round(data.current.wind_speed);
  var currentHumidity = data.current.humidity;
  var currentUV = data.current.uvi;
  var weatherIcon = data.current.weather[0].icon;

  cityContainerEl.textContent = '';
  var divCityHeader = document.createElement('div');
  var headerCityDateEl = document.createElement('h2');
  var currentDate = moment().format('L');
  var currentIcon = document.createElement('img');
  currentIcon.setAttribute(
    'src',
    'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'
  );

  headerCityDateEl.textContent = city + ' (' + currentDate + ')';
  headerCityDateEl.setAttribute('class', 'img');

  divCityHeader.appendChild(headerCityDateEl);
  divCityHeader.appendChild(currentIcon);
  cityContainerEl.appendChild(divCityHeader);

  var divCurrent = document.createElement('div');
  divCurrent.setAttribute('class', 'p-2 m-2');
  var tempEl = document.createElement('p');
  tempEl.setAttribute('class', 'border rounded-md bg-white p-2 m-2');
  var windEl = document.createElement('p');
  windEl.setAttribute('class', 'border rounded-md bg-white p-2 m-2');
  var humidityEl = document.createElement('p');
  humidityEl.setAttribute('class', 'border rounded-md bg-white p-2 m-2');
  var UvEl = document.createElement('p');
  UvEl.setAttribute('class', 'border rounded-md bg-white p-2 m-2');

  tempEl.textContent = 'Temperature: ' + currentTemp + '°F';
  windEl.textContent = 'Wind: ' + currentWind + ' MPH';
  humidityEl.textContent = 'Humidity: ' + currentHumidity + '%';
  UvEl.textContent = 'UV Index: ' + currentUV;

  divCurrent.appendChild(tempEl);
  divCurrent.appendChild(windEl);
  divCurrent.appendChild(humidityEl);
  divCurrent.appendChild(UvEl);

  cityContainerEl.appendChild(divCurrent);
};

var displayForcasted = data => {
  forecastContainerEl.textContent = '';

  for (var i = 0; i < 7; i++) {
    var cityForecast = Math.round(data.daily[i].temp.day);

    const type = cityForecast < 50 ? '🥶' : '';

    var windForecast = data.daily[i].wind_speed;
    var humidityForecast = data.daily[i].humidity;
    var forecastIcon = data.daily[i].weather[0].icon;
    console.log(cityForecast);
    console.log(forecastIcon);

    var cardEl = document.createElement('div');
    cardEl.setAttribute(
      'class',
      'bg-slate-700 bg-opacity-75 rounded-lg p-6 drop-shadow-xl border border-blue-300 h-full'
    );

    var cardBodyEl = document.createElement('div');
    cardBodyEl.setAttribute('class', 'text-left p-4 m-4');

    var cardDateEl = document.createElement('h6');
    cardDateEl.setAttribute('class', 'p-2 m-2 text-lg font-bold');
    cardDateEl.textContent = moment().add(i, 'days').format('L');

    function setAttr(element, attributes) {
      Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr]);
      });
    }

    const attributes = {
      name: 'weather icon',
      class: 'pb-4 m-6 bg-blue-500',
      src: `https://openweathermap.org/img/wn/${forecastIcon}@2x.png`,
    };

    var cardIconEl = document.createElement('img');
    setAttr(cardIconEl, attributes);

    var cardTempEl = document.createElement('p');
    cardTempEl.setAttribute(
      'class',
      'border rounded-md bg-white drop-shadow-2xl p-2 m-2'
    );
    cardTempEl.textContent = `Temperature:  ${cityForecast} °F ${type}`;

    var cardWindEl = document.createElement('p');
    cardWindEl.setAttribute(
      'class',
      'border rounded-md bg-white drop-shadow-2xl p-2 m-2'
    );
    cardWindEl.textContent = `Wind: ${windForecast}`;

    var cardHumidEl = document.createElement('p');
    cardHumidEl.setAttribute(
      'class',
      'border rounded-md bg-white drop-shadow-2xl p-2 m-2'
    );
    cardHumidEl.textContent = `Humidity: ${humidityForecast}%`;

    cardBodyEl.appendChild(cardDateEl);
    cardBodyEl.appendChild(cardIconEl);
    cardBodyEl.appendChild(cardTempEl);
    cardBodyEl.appendChild(cardWindEl);
    cardBodyEl.appendChild(cardHumidEl);

    cardEl.appendChild(cardBodyEl);
    forecastContainerEl.appendChild(cardEl);

    userFormEl.reset();
  }
};

loadCities();

userFormEl.addEventListener('submit', formSubmitHandler);
