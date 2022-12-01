import openWeatherMapAPIProvider from './open-weather-map-api-provider';
import { tempUnits, speedUnits, timeUnits } from './settings';
import { capitalize } from './utilities';
import convertTemp from './temp-convert';
import convertSpeed from './speed-convert';
import convertTime from './time-convert';
import convertDirection from './wind-direction-convert';

const weatherData = { body: {}, error: '' };
export default weatherData;

function standardizeWeatherDataMain(weatherDataBody) {
  const mainVal = weatherDataBody.weather;
  if (!mainVal) return;

  weatherDataBody.weather = capitalize(mainVal);
}

function standardizeWeatherDataKeyword(weatherDataBody) {
  const weatherKeywords = Object.entries({
    Sunny: ['Clear', 'Clear Sky', 'Sunny', 'Sun'],
    Rain: ['Rain', 'Drizzle', 'Shower'],
    Clouds: ['Cloud'],
    Foggy: ['Haze', 'Mist', 'Smoke', 'Fog'],
    Dusty: ['Dust', 'Ash', 'Sand'],
    Snow: ['Snow', 'Sleet', 'Hail'],
    Thunderstorm: ['Thunder', 'Thunderstorm', 'Lightning'],
  });

  let keywordVal = weatherDataBody.weatherKeyword;
  if (!keywordVal) return;

  keywordVal = capitalize(keywordVal);
  weatherDataBody.weatherKeyword = keywordVal;

  for (let i = 0; i < weatherKeywords.length; i += 1) {
    const [weatherKeyword, possibleWords] = weatherKeywords[i];
    const match = possibleWords.some((possibleWord) =>
      keywordVal.includes(possibleWord)
    );
    if (match) {
      weatherDataBody.weatherKeyword = weatherKeyword;
      return;
    }
  }
}

function standardizeWeatherData(weatherDataBody) {
  standardizeWeatherDataMain(weatherDataBody);
  standardizeWeatherDataKeyword(weatherDataBody);
}

function convertWeatherDataTemps(weatherDataBody, fromTempUnit) {
  ['temp', 'tempMax', 'tempMin', 'tempFeels'].forEach((tempProp) => {
    const tempVal = weatherDataBody[tempProp];
    if (tempVal) weatherDataBody[tempProp] = convertTemp(tempVal, fromTempUnit);
  });
}

function convertWeatherDataTimes(weatherDataBody, fromTimeUnit) {
  ['sunrise', 'sunset'].forEach((timeProp) => {
    const timeVal = weatherDataBody[timeProp];
    if (timeVal)
      weatherDataBody[timeProp] = convertTime(
        timeVal,
        weatherDataBody.timeZoneOffset || 0,
        fromTimeUnit
      );
  });
}

function convertWeatherDataSpeeds(weatherDataBody, fromSpeedUnit) {
  const speedVal = weatherDataBody.windSpeed;
  if (speedVal)
    weatherDataBody.windSpeed = convertSpeed(speedVal, fromSpeedUnit);
}

function convertWeatherDataDirections(weatherDataBody) {
  const directionVal = weatherDataBody.windDirection;
  if (directionVal)
    weatherDataBody.windDirection = convertDirection(directionVal);
}

function formatWeatherDataBody(weatherDataBody) {
  standardizeWeatherData(weatherDataBody);
  convertWeatherDataTemps(weatherDataBody, 'K');
  convertWeatherDataTimes(weatherDataBody, 'unix');
  convertWeatherDataSpeeds(weatherDataBody, 'meter,second');
  convertWeatherDataDirections(weatherDataBody);
}

export async function getWeather(
  location,
  weatherProvider = openWeatherMapAPIProvider
) {
  weatherData.error = '';
  try {
    const weatherDataBody = await weatherProvider(location);
    formatWeatherDataBody(weatherDataBody);
    weatherData.body = weatherDataBody;
  } catch (err) {
    weatherData.error = err.message;
  }
  return weatherData;
}

export function convertWeather(oldUnitSettings) {
  const weatherDataBody = weatherData.body;
  convertWeatherDataTemps(weatherDataBody, tempUnits[oldUnitSettings.temp]);
  convertWeatherDataTimes(weatherDataBody, timeUnits[oldUnitSettings.time]);
  convertWeatherDataSpeeds(weatherDataBody, speedUnits[oldUnitSettings.speed]);
}
