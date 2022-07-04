function formatDate(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[newDate.getDay()];
  let month = months[newDate.getMonth()];
  let date = newDate.getDate();
  let year = newDate.getFullYear();
  let hours = newDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = newDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dateInput = document.querySelector("#date");
  dateInput.innerHTML = `${day}, ${date} ${month} ${year} | ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayWeatherInformation(response) {
  //Get response data
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;

  //set response data
  document.querySelector("#city").innerHTML = city;
  document.querySelector("#temperature").innerHTML = temperature;
  document.querySelector("#description").innerHTML = description;
  document.querySelector("#wind").innerHTML = wind;
  document.querySelector("#humidity").innerHTML = humidity;

  //get & set icon
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  //set date
  let newDate = new Date();
  formatDate(newDate);

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  console.log(response);
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row row-cols-1 row-cols-sm-3 row-cols-md-6">`;
  forecastData.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col my-2 my-sm-2">
        <div class="cards">
            <h3>${formatDay(day.dt)}</h3>
            <img src=http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png alt="day.weather[0].description" width="70" />
            <p>${Math.round(day.temp.day)}°C</p>
        </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function searchCity(city) {
  // API call to OpenWeather API
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInformation);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input").value;
  searchCity(cityInput);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInformation);
}

function getPosition(position) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
searchCity("Vienna");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("#location-button");
button.addEventListener("click", getPosition);
