import openWeatherMapAPIProvider from './open-weather-map-api-provider';
import { tempUnits, speedUnits, timeUnits } from './settings';
import convertTemp from './temp-convert';
import convertSpeed from './speed-convert';
import convertTime from './time-convert';
import convertDirection from './wind-direction-convert';

const weatherData = { body: {} };
export default weatherData;

function convertWeatherDataTemps(weatherDataBody, fromTempUnit) {
  ['temp', 'tempMax', 'tempMin', 'tempFeels'].forEach((tempProp) => {
    weatherDataBody[tempProp] = convertTemp(
      weatherDataBody[tempProp],
      fromTempUnit
    );
  });
}

function convertWeatherDataTimes(weatherDataBody, fromTimeUnit) {
  ['sunrise', 'sunset'].forEach((timeProp) => {
    weatherDataBody[timeProp] = convertTime(
      weatherDataBody[timeProp],
      weatherDataBody.timeZoneOffset,
      fromTimeUnit
    );
  });
}

function convertWeatherDataSpeeds(weatherDataBody, fromSpeedUnit) {
  weatherDataBody.windSpeed = convertSpeed(
    weatherDataBody.windSpeed,
    fromSpeedUnit
  );
}

function convertWeatherDataDirections(weatherDataBody) {
  weatherDataBody.windDirection = convertDirection(
    weatherDataBody.windDirection
  );
}

function formatWeatherDataBody(weatherDataBody) {
  convertWeatherDataTemps(weatherDataBody, 'K');
  convertWeatherDataTimes(weatherDataBody, 'unix');
  convertWeatherDataSpeeds(weatherDataBody, 'meter,second');
  convertWeatherDataDirections(weatherDataBody);
}

export async function getWeather(
  location,
  weatherProvider = openWeatherMapAPIProvider
) {
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
