const weatherDataEl = document.getElementById('weather-data');
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

const requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
const apiKey = "&units=imperial&appid=c5935e4ad5a1b68a18a6b42b8d1e71ea";

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    fetch(requestUrl + city + apiKey)
      .then((response) => response.json())
      .then(function (data) {
        console.log (data);
        weatherDataEl.innerHTML = '';

        const cityEl = document.createElement('h2');
        cityEl.textContent = data.city.name;
        weatherDataEl.appendChild(cityEl);

        for (let i = 0; i < data.list.length; i += 8) {
          const dayData = data.list[i];
          const date = new Date(dayData.dt_txt);

          const dateEl = document.createElement('p');
          dateEl.textContent = date.toDateString();
          weatherDataEl.appendChild(dateEl);

          const iconEl = document.createElement('img');
          iconEl.src = "http://openweathermap.org/img/wn/" + dayData.weather[0].icon + '.png';
          weatherDataEl.appendChild(iconEl);

          const tempEl = document.createElement('p');
          tempEl.textContent = dayData.main.temp + '°F';
          weatherDataEl.appendChild(tempEl);

          const humidityEl = document.createElement('p');
          humidityEl.textContent = dayData.main.humidity + ' %';
          weatherDataEl.appendChild(humidityEl);

          const windSpeedEl = document.createElement('p');
          windSpeedEl.textContent = dayData.wind.speed + ' MPH';
          weatherDataEl.appendChild(windSpeedEl);

          const hrEl = document.createElement('hr');
          weatherDataEl.appendChild(hrEl);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        weatherDataEl.innerHTML = '<p>Unable to fetch weather data.</p>';
      });
  } else {
    weatherDataEl.innerHTML = '<p>Please enter a city name.</p>';
  }
});