import * as dom from './dom-elements';
import { locationSettings } from './settings';
import { getWeather } from './application';

function clearWeatherError() {
  dom.weatherErrorElement.textContent = '';
  dom.weatherErrorElement.classList.add('hidden');
}

function populateWeather(data) {
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

export async function weatherView(location = locationSettings.defaultCity) {
  clearWeatherError();
  const weatherData = await getWeather(location);

  if (weatherData.error) {
    dom.weatherErrorElement.textContent = `Something went wrong: ${weatherData.error}`;
    dom.weatherErrorElement.classList.remove('hidden');
    return;
  }
  populateWeather(weatherData.body);
}

export function defaultWeatherView() {
  dom.loginElement.classList.add('hidden');
  dom.weatherElement.classList.remove('hidden');
  weatherView();
}
