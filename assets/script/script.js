const weatherDataEl = document.getElementById('weather-data');
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

var cityDisplay = document.getElementById('cityDisplay');
var date = document.getElementById('date');
var temp = document.getElementById('temp');
var windSpeed = document.getElementById('wind');
var humidity = document.getElementById('humidity');


var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var requestedUrl2 = "&units=imperial&appid=c5935e4ad5a1b68a18a6b42b8d1e71ea";

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    fetch(requestUrl + city + requestedUrl2)
      .then((response) => response.json())
      .then(function (data) {
        console.log (data);
        cityDisplay.textContent = data.city.name;
        date.textContent = new Date(data.list[2].dt_txt).toDateString();
        document.getElementById('icon').src = "http://openweathermap.org/img/wn/" + data.list[2].weather[0].icon + '.png';
        temp.textContent = data.list[2].main.temp + '°F';
        humidity.textContent = data.list[2].main.humidity + ' %';
        windSpeed.textContent = data.list[2].wind.speed + ' MPH';
      })
      .catch((error) => {
        console.error('Error:', error);
        weatherDataEl.innerHTML = '<p>Unable to fetch weather data.</p>';
      });
  } else {
    weatherDataEl.innerHTML = '<p>Please enter a city name.</p>';
  }
});