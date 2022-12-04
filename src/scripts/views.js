import * as dom from './dom-elements';
import { weatherData } from './application';
import weatherGif, { getWeatherGif } from './weather-gif';
import getWeatherWhiteIcon from '../images/get-weather-white.svg';
import settingsWhiteIcon from '../images/settings-white.svg';
import getWeatherBlackIcon from '../images/get-weather-black.svg';
import settingsBlackIcon from '../images/settings-black.svg';
import { unitSettings } from './settings';

function clearWeatherError() {
  dom.weatherErrorElement.textContent = '';
  dom.weatherErrorElement.classList.add('hidden');
}

function getWeatherColorScheme(element) {
  const weatherType = element.closest('.weather').dataset.weather;
  return ['Foggy', 'Dusty', 'Thunderstorm'].includes(weatherType)
    ? 'alternate'
    : 'regular';
}

const icons = [
  {
    name: 'get-weather',
    regular: getWeatherWhiteIcon,
    alternate: getWeatherBlackIcon,
    hover: getWeatherBlackIcon,
  },
  {
    name: 'show-settings',
    regular: settingsWhiteIcon,
    alternate: settingsBlackIcon,
    hover: settingsBlackIcon,
  },
];

export function colorizeIcon(
  element,
  iconType = getWeatherColorScheme(element)
) {
  element.querySelector('.icon').src = icons.find(({ name }) =>
    element.classList.contains(name)
  )[iconType];
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

function populateWeatherColors() {
  [dom.weatherFormButton, dom.settingsButton].forEach((button) =>
    colorizeIcon(button)
  );
}

export function weatherImageView() {
  dom.mainWeatherLoadingImg.classList.add('hidden');
  dom.mainWeatherImg.classList.remove('hidden');
}

async function populateWeatherImage(data) {
  dom.mainWeatherLoadingImg.classList.remove('hidden');
  dom.mainWeatherImg.classList.add('hidden');

  await getWeatherGif(data.weatherKeyword);
  dom.mainWeatherImg.src = weatherGif.url;
  if (weatherGif.url === '#') weatherImageView();
}

export function weatherLoadingView() {
  dom.weatherLoadingElement.classList.remove('hidden');
  dom.weatherBodyElement.classList.add('hidden');
}

export function hideWeatherLoadingView() {
  dom.weatherLoadingElement.classList.add('hidden');
  dom.weatherBodyElement.classList.remove('hidden');
}

export function defaultWeatherView() {
  dom.loginElement.classList.add('hidden');
  dom.settingsElement.classList.add('hidden');
  dom.weatherElement.classList.remove('hidden');
  clearWeatherError();
  hideWeatherLoadingView();
}

export function weatherView({ withImage = true } = {}) {
  defaultWeatherView();

  if (weatherData.error) {
    dom.weatherErrorElement.textContent = weatherData.error;
    dom.weatherErrorElement.classList.remove('hidden');
    return;
  }
  populateWeather(weatherData.body);
  populateWeatherColors();
  if (withImage) populateWeatherImage(weatherData.body);
}

export function weatherButtonsIconView() {
  [dom.weatherFormButton, dom.settingsButton].forEach((button) => {
    button.querySelector('.text').classList.add('hidden');
    button.querySelector('.icon').classList.remove('hidden');
  });
}

export function weatherButtonsTextView() {
  [dom.weatherFormButton, dom.settingsButton].forEach((button) => {
    button.querySelector('.text').classList.remove('hidden');
    button.querySelector('.icon').classList.add('hidden');
  });
}

export function loginView() {
  dom.settingsElement.classList.add('hidden');
  dom.weatherElement.classList.add('hidden');
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

export function updateSettingsFormView() {
  Object.keys(unitSettings).forEach((key) => {
    dom.settingsForm.querySelector(`#${key}`).value = unitSettings[key];
  });
}
