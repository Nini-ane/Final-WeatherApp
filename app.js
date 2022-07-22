let now = new Date();

let today = document.querySelector("#current-date");
console.log(today);

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

today.innerHTML = `${day}, ${hours}:${minutes}`;

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  console.log(city.value);
  document.querySelector("#target-city").innerHTML = city.value;
}


let cityInput = document.querySelector("#city");
cityInput.addEventListener("submit", changeCity);

function showWeather(response) {
  console.log(response);
  celsiusTemperature = response.data.main.temp;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#current-atmosphere");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = response.data.main.humidity;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
}

function getTemperature(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let apiKey = "0225b3f0fd22f80ae48c36b7041e70ff";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

cityInput.addEventListener("submit", getTemperature);


function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "0225b3f0fd22f80ae48c36b7041e70ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");

let forecastHtml = `<div class="row">`;

forecast.forEach(function (forecastDay, index) {
  if (index < 5) {
  forecastHtml = forecastHtml + `<div class="forecastDays col-2">
             <span id="day-one">
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="42" id="icon-day-one"/>
                <br />
                <strong>${formatDay(forecastDay.dt)}</strong>
                 <br>
                    ${Math.round(forecastDay.temp.max)}° <span class="minimum"> ${Math.round(forecastDay.temp.min)}°</span>
                </span>
            </div>`;}});
forecastHtml = forecastHtml + `</div>`;

forecastElement.innerHTML = forecastHtml;
}


function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9 / 5 + 32);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature); 
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature); 

function showCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature); 
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let celsiusTemperature = null;
