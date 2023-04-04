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
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
              <p class="weather-forecast-date">${formatDay(
                forecastDay.time
              )}</p>
              <p class="weather-forecast-icon">
                <img src=${
                  forecastDay.condition.icon_url
                } alt="icon">             
              </p>
              <p class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
            </div>
            `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  //let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiKey = "29b50f3443414ft36f38oca64220f4d4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=29b50f3443414ft36f38oca64220f4d4&units=metric`;
  //let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

//search engine, when searching for a city,
//display the city name on the page after the user submits the form
//and the current temperature of the city.
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  //response.data.name;
  document.querySelector("#weather").innerHTML =
    response.data.condition.description;
  //response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  //response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.temperature.current
    //response.data.main.temp
  );
  document.querySelector("#day").innerHTML = formatDate(
    response.data.time * 1000
    //response.data.dt * 1000
  );
  document.querySelector("#icon").setAttribute(
    "src",
    response.data.condition.icon_url
    //`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);
  //.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coordinates);
  //getForecast(response.data.coord);
}

function searchCity(city) {
  //let apiKey = "52b789a53d83895c9bd9e318a67b4fa8";
  let apiKey = "29b50f3443414ft36f38oca64220f4d4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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

//engine for current position

function searchLocation(position) {
  //let apiKey = "52b789a53d83895c9bd9e318a67b4fa8";
  let apiKey = "29b50f3443414ft36f38oca64220f4d4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
searchCity("Kyiv");

let currentPositionButton = document.querySelector("#button-current");
currentPositionButton.addEventListener("click", getCurrentPosition);
