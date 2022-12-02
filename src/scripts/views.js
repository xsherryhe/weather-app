import * as dom from './dom-elements';
import { weatherData } from './application';
import weatherGif, { getWeatherGif } from './weather-gif';

function clearWeatherError() {
  dom.weatherErrorElement.textContent = '';
  dom.weatherErrorElement.classList.add('hidden');
}

function populateWeather(data) {
  dom.weatherElement.dataset.weather = data.weatherKeyword;
  dom.cityElement.textContent = data.name;
  dom.countryElement.textContent = data.country;
  dom.mainTempElement.textContent = data.temp;
  dom.mainWeatherElement.textContent = data.weather;
  dom.feelsTempElement.textContent = data.tempFeels;
  dom.minTempElement.textContent = data.tempMin;
  dom.maxTempElement.textContent = data.tempMax;
  dom.windSpeedElement.textContent = data.windSpeed;
  dom.windDirectionElement.textContent = data.windDirection;
  dom.sunriseElement.textContent = data.sunrise;
  dom.sunsetElement.textContent = data.sunset;
}

async function populateWeatherImage(data) {
  await getWeatherGif(data.weatherKeyword);
  dom.mainWeatherImg.src = weatherGif.url;
}

export function defaultWeatherView() {
  dom.loginElement.classList.add('hidden');
  dom.settingsElement.classList.add('hidden');
  dom.weatherElement.classList.remove('hidden');
  clearWeatherError();
}

export function weatherView({ withImage = true } = {}) {
  defaultWeatherView();

  if (weatherData.error) {
    dom.weatherErrorElement.textContent = weatherData.error;
    dom.weatherErrorElement.classList.remove('hidden');
    return;
  }
  populateWeather(weatherData.body);
  if (withImage) populateWeatherImage(weatherData.body);
}

export function settingsView() {
  dom.settingsElement.classList.remove('hidden');
}
