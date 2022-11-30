import { round } from './utilities';
import { unitSettings, tempUnits } from './settings';

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

export default function convertTemp(
  tempVal,
  fromTempUnit,
  toTempUnit = tempUnits[unitSettings.temp]
) {
  const temp =
    typeof tempVal === 'number'
      ? tempVal
      : Number(tempVal.match(/\d+(\.\d+)?/)[0]);
  const defaultConvertFn = (val) => val;
  const convertFn =
    {
      'K-°F': kelvinToFahrenheit,
      'K-°C': kelvinToCelsius,
      '°F-K': fahrenheitToKelvin,
      '°F-°C': fahrenheitToCelsius,
      '°C-K': celsiusToKelvin,
      '°C-°F': celsiusToFahrenheit,
    }[`${fromTempUnit}-${toTempUnit}`] || defaultConvertFn;
  return convertFn(temp) + toTempUnit;
}
