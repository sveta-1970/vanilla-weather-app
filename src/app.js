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

//forecast
function displayForecast(){
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = "";
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function(day) {
    forecastHTML =  forecastHTML + `
            <div class="col">
              <p class="weather-forecast-date">${day}</p>
              <p class="weather-forecast-icon">
                <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="">             
              </p>
              <p class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">-2°</span>
                <span class="weather-forecast-temperature-min">-6°</span>
            </div>
            `;
  });
  
  forecastElement.innerHTML = forecastHTML;
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
displayForecast();

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertCelsiusToFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertFarenheitToCelsius);
