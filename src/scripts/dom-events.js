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
  weatherFormButton,
  mainWeatherImg,
  settingsButton,
  settingsForm,
  hideSettingsButton,
} from './dom-elements';
import validate from './form-validation';
import {
  colorizeIcon,
  loginView,
  loginLoadingView,
  defaultWeatherView,
  weatherView,
  settingsView,
  weatherLoadingView,
  weatherButtonsIconView,
  weatherButtonsTextView,
  hideWeatherLoadingView,
  weatherImageView,
} from './views';

async function login(e) {
  e.preventDefault();
  loginLoadingView();
  if (!(await validate(loginForm))) return loginView();

  updateApiKeys({
    openWeatherMap: loginForm.querySelector('#open-weather-map-api-key').value,
    giphy: loginForm.querySelector('#giphy-api-key').value,
  });

  defaultWeatherView();
  weatherLoadingView();
  await getWeather(locationSettings.defaultCity);
  weatherView();
}
loginForm.addEventListener('submit', login);

async function updateWeather(e) {
  e.preventDefault();
  weatherLoadingView();
  if (!(await validate(weatherForm))) return hideWeatherLoadingView();

  await getWeather(weatherForm.querySelector('#location').value);
  weatherView();
}
weatherForm.addEventListener('submit', updateWeather);

function showSettings(e) {
  e.preventDefault();
  settingsView();
}
settingsButton.addEventListener('click', showSettings);

async function updateSettings(e) {
  e.preventDefault();
  if (!(await validate(settingsForm))) return;

  const oldUnitSettings = { ...unitSettings };
  updateUnitSettings(Object.fromEntries(new FormData(settingsForm).entries()));
  convertWeather(oldUnitSettings);
  weatherView({ withImage: false });
}
settingsForm.addEventListener('submit', updateSettings);

function hideSettings(e) {
  e.preventDefault();
  defaultWeatherView();
}
hideSettingsButton.addEventListener('click', hideSettings);

function switchButtons() {
  (window.innerWidth <= 515
    ? weatherButtonsIconView
    : weatherButtonsTextView)();
}
window.addEventListener('load', switchButtons);
window.addEventListener('resize', switchButtons);

function buttonIconNormal(e) {
  colorizeIcon(e.target.closest('button'));
}

function buttonIconHover(e) {
  colorizeIcon(e.target.closest('button'), 'hover');
}

[weatherFormButton, settingsButton].forEach((button) => {
  button.addEventListener('mouseover', buttonIconHover);
  button.addEventListener('mouseout', buttonIconNormal);
});

mainWeatherImg.addEventListener('load', weatherImageView);
