let now = new Date();

let fecha = document.querySelector("#fecha");

let hours = now.getHours();
let todayHour = document.querySelector("#hours");
if (hours < 10) {
  hours = `0${hours}`;
}
todayHour.innerHTML = `${hours}`;

let minutes = now.getMinutes();
let todayMinutes = document.querySelector("#minutes");
if (minutes < 10) {
  minutes = `0${minutes}`;
}
todayMinutes.innerHTML = `${minutes}`;

let dias = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let dia = dias[now.getDay()];

fecha.innerHTML = `${dia} ${hours}:${minutes}`;

////

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahTemperature);
}

let celsiusTemperature=null;

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

///
function getForecast(coordinates){
  let apiKey = "b35c686ba9565ba0ab254c2230937552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);


}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#cid");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let maxElement = document.querySelector("#max");
  maxElement.innerHTML = Math.round(response.data.main.temp_max);

  let minElement = document.querySelector("#min");
  minElement.innerHTML = Math.round(response.data.main.temp_min);

  let feelElement = document.querySelector("#feel");
  feelElement.innerHTML = Math.round(response.data.main.feels_like);

  let iconElement= document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);

}
////
function search(city) {
  let apiKey = "b35c686ba9565ba0ab254c2230937552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text");
  search(cityInputElement.value);
}

let form = document.querySelector("#barraProcura");
form.addEventListener("submit", handleSubmit);

///current location///

function GetCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b35c686ba9565ba0ab254c2230937552";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(GetCurrentLocation);
}
function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return days[day];





}


function displayForecast(response){

  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`; 
  forecast.forEach(function(forecastDay,index){
    if (index < 6 ) {
    forecastHTML = 
     forecastHTML + 
     `
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            <img 
              src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">
              ${Math.round(forecastDay.temp.max)}°</span>
              <span class="weather-forecast-temperature-min">
              ${Math.round(forecastDay.temp.min)}°</span>
            </div>
          </div>
    
     `;
    }
  });
  

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;

}



let currentLocationButton = document.querySelector("#currentButton");
currentLocationButton.addEventListener("click", getPosition);

search("Lisbon");



