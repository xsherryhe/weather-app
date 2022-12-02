import { getWeather, convertWeather } from './weather';
import {
  updateApiKeys,
  unitSettings,
  updateUnitSettings,
  locationSettings,
} from './settings';
import {
  loginForm,
  weatherForm,
  settingsButton,
  settingsForm,
  hideSettingsButton,
} from './dom-elements';
import validate from './form-validation';
import { defaultWeatherView, weatherView, settingsView } from './views';

async function login(e) {
  e.preventDefault();
  if (!validate(loginForm)) return;

  updateApiKeys({
    openWeatherMap: loginForm.querySelector('#open-weather-map-api-key').value,
    giphy: loginForm.querySelector('#giphy-api-key').value,
  });

  defaultWeatherView();

  await getWeather(locationSettings.defaultCity);
  weatherView();
}
loginForm.addEventListener('submit', login);

async function updateWeather(e) {
  e.preventDefault();
  if (!validate(weatherForm)) return;

  await getWeather(weatherForm.querySelector('#location').value);
  weatherView();
}
weatherForm.addEventListener('submit', updateWeather);

function showSettings(e) {
  e.preventDefault();
  settingsView();
}
settingsButton.addEventListener('click', showSettings);

function updateSettings(e) {
  e.preventDefault();
  if (!validate(settingsForm)) return;

  const oldUnitSettings = { ...unitSettings };
  updateUnitSettings(Object.fromEntries(new FormData(settingsForm).entries()));
  convertWeather(oldUnitSettings);
  weatherView();
}
settingsForm.addEventListener('submit', updateSettings);

function hideSettings(e) {
  e.preventDefault();
  defaultWeatherView();
}
hideSettingsButton.addEventListener('click', hideSettings);
