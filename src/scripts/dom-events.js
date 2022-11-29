import { apiKeys } from './settings';
import { loginForm } from './dom-elements';
import validate from './form-validation';
import { defaultWeatherView } from './views';

function login(e) {
  e.preventDefault();
  if (!validate(loginForm)) return;

  apiKeys.openWeatherMap = loginForm.querySelector(
    '#open-weather-map-api-key'
  ).value;
  apiKeys.giphy = loginForm.querySelector('#giphy-api-key').value;
  defaultWeatherView();
}
loginForm.addEventListener('submit', login);
