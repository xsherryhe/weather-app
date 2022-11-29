import { round } from './utilities';

function roundTemp(temp) {
  return round(temp, 0);
}

export function kelvinToCelsius(temp) {
  return roundTemp(temp - 273.15);
}

export function celsiusToKelvin(temp) {
  return roundTemp(temp + 273.15);
}

export function fahrenheitToCelsius(temp) {
  return roundTemp((temp - 32) * (5 / 9));
}

export function celsiusToFahrenheit(temp) {
  return roundTemp(temp * (9 / 5) + 32);
}

export function kelvinToFahrenheit(temp) {
  return roundTemp(celsiusToFahrenheit(kelvinToCelsius(temp)));
}

export function fahrenheitToKelvin(temp) {
  return roundTemp(celsiusToKelvin(fahrenheitToCelsius(temp)));
}
