import * as dom from './dom-elements';
import { weatherData } from './application';
import weatherGif, { getWeatherGif } from './weather-gif';
import getWeatherIcon from '../images/get-weather.svg';
import settingsIcon from '../images/settings.svg';
import getWeatherHoverIcon from '../images/get-weather-hover.svg';
import settingsHoverIcon from '../images/settings-hover.svg';

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
  dom.mainWeatherLoadingImg.classList.remove('hidden');
  dom.mainWeatherImg.classList.add('hidden');

  await getWeatherGif(data.weatherKeyword);
  dom.mainWeatherImg.src = weatherGif.url;

  dom.mainWeatherLoadingImg.classList.add('hidden');
  dom.mainWeatherImg.classList.remove('hidden');
}

export function defaultWeatherView() {
  dom.loginElement.classList.add('hidden');
  dom.settingsElement.classList.add('hidden');
  dom.weatherElement.classList.remove('hidden');
  clearWeatherError();

  dom.weatherLoadingElement.classList.add('hidden');
  dom.weatherBodyElement.classList.remove('hidden');
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

export function weatherLoadingView() {
  dom.weatherLoadingElement.classList.remove('hidden');
  dom.weatherBodyElement.classList.add('hidden');
}

export function weatherButtonsIconView() {
  [dom.weatherFormButton, dom.settingsButton].forEach((button) => {
    button.querySelector('.text').classList.add('hidden');
    button.querySelector('.icon').classList.remove('hidden');
  });
}

const icons = [
  { name: 'get-weather', normal: getWeatherIcon, hover: getWeatherHoverIcon },
  { name: 'show-settings', normal: settingsIcon, hover: settingsHoverIcon },
];

export function weatherButtonIconView(button, iconType) {
  button.querySelector('.icon').src = icons.find(({ name }) =>
    button.classList.contains(name)
  )[iconType];
}

export function weatherButtonsTextView() {
  [dom.weatherFormButton, dom.settingsButton].forEach((button) => {
    button.querySelector('.text').classList.remove('hidden');
    button.querySelector('.icon').classList.add('hidden');
  });
}

export function loginView() {
  dom.loginElement.classList.remove('hidden');
  dom.loginButton.classList.remove('hidden');
  dom.loginLoadingElement.classList.add('hidden');
}

export function loginLoadingView() {
  dom.loginLoadingElement.classList.remove('hidden');
  dom.loginButton.classList.add('hidden');
}

export function settingsView() {
  dom.settingsElement.classList.remove('hidden');
}
