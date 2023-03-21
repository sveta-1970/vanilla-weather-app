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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
searchCity("Kyiv");
