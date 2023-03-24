//function to calculate current date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let formatted_date = `${day}, ${hours}:${minutes}`;
  return formatted_date;
}

//function to calculate day for forecaast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  return days[day];
}

//forecast, index=0 is a current day
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {

    forecastHTML =
      forecastHTML +
      `
            <div class="col">
              <p class="weather-forecast-date">${formatDay(forecastDay.dt)}</p>
              <p class="weather-forecast-icon">
                <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png" alt="">             
              </p>
              <p class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
            </div>
            `;
     }       
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayForecast);
}

//search engine, when searching for a city,
//display the city name on the page after the user submits the form
//and the current temperature of the city.
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".weather").innerHTML = response.data.weather[0].main;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".day").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector(".icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector(".icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

  celsiusTemperature = Math.round(response.data.main.temp);
}

function searchCity(city) {
  let apiKey = "52b789a53d83895c9bd9e318a67b4fa8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  if (city) {
    searchCity(city);
  } else {
    alert("Please enter a city");
  }
}

//Celsius to Farenheit

function convertCelsiusToFarenheit(event) {
  event.preventDefault();
  //remove the active class from celsius-link
  celsiusLink.classList.remove("active");
  //add the  active class to farenheit-link
  farenheitLink.classList.add("active");
  let farenheitTemperature = Math.round(celsiusTemperature * 1.8 + 32);
  document.querySelector("#main-temperature").innerHTML = farenheitTemperature;
}

//Farenheit to Celsius

function convertFarenheitToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  document.querySelector("#main-temperature").innerHTML = celsiusTemperature;
  return;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
searchCity("Kyiv");

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertCelsiusToFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertFarenheitToCelsius);
