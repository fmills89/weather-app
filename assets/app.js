var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city")
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");

var APIkey = "a72e3fb63a67ce75037508eeb42b61ef";

var formSubmitHandler = (e) => {
    e.preventDefault();
    // get value from input element
    var cityName = cityInputEl.value.trim();

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
            console.log(data);
        });
        } else {
            alert("Error, this city could not be found.");
        }
    });
};




userFormEl.addEventListener('submit', formSubmitHandler);

