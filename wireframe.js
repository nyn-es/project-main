let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
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
  "December"
];

let now = new Date();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();
let time = now.getHours() + ":" + now.getMinutes();

function formatDate(today) {
  day = days[now.getDay()];
  month = months[now.getMonth()];
  date = now.getDate();
  time = now.getHours() + ":" + now.getMinutes();

  today = `${day}, ${month} ${date}, ${time}`;

  return today;
}
let moment = document.querySelector("#today-time");
moment.innerHTML = formatDate(new Date());

function displayWeather(response) {
console.log(response.data)
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#current-value").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#max-temp").innerHTML = Math.round(response.data.main.temp_max);
document.querySelector("#min-temp").innerHTML = Math.round(response.data.main.temp_min);
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.weather[0].main;

}

function search(city) {
  let apiKey = "374d172c382938434d532e95f1c5c358";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather)

};

function handleSubmit(event) {
 event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city)
};
search("New York");

function searchLocation(position) {
  let apiKey = "374d172c382938434d532e95f1c5c358";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  let lat = "position.coords.latitude";
  let lon = "position.coords.longitude";

  axios.get(apiUrl).then(displayWeather);
};

function getCurrentLocation(event){
  event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation) 
  
};


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function convertToFahrenheit(value) {
  value.preventDefault();
  let valueElement = document.querySelector("#current-value");
  let temperature = valueElement.innerHTML;
  temperature = Number(temperature);
  valueElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let valueElement = document.querySelector("#current-value");
  valueElement.innerHTML = 32;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

