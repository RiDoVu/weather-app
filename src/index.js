function formatDate(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
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

  //set date
  let newDate = new Date();
  formatDate(newDate);
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

function showCelsius(event) {
  event.preventDefault();
  let temperatureInput = document.querySelector("#temperature");
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  temperatureInput.innerHTML = Math.round(
    ((Number(temperatureInput.innerHTML) - 32) * 5) / 9
  );
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureInput = document.querySelector("#temperature");
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  temperatureInput.innerHTML = Math.round(
    (Number(temperatureInput.innerHTML) * 9) / 5 + 32
  );
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
searchCity("Vienna");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("#location-button");
button.addEventListener("click", getPosition);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);
