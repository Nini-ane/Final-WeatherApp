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
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp) + "°C";
  let description = document.querySelector("#current-atmosphere");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = response.data.main.humidity;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
}

function getTemperature(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let apiKey = "0225b3f0fd22f80ae48c36b7041e70ff";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

cityInput.addEventListener("submit", getTemperature);
