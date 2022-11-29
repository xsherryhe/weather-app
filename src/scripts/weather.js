import openWeatherMapAPIProvider from './open-weather-map-api-provider';
import { unitSettings, tempUnits, speedUnits, timeUnits } from './settings';
import { kelvinToCelsius, kelvinToFahrenheit } from './temp-convert';
import { metersSecondsToMilesHours } from './speed-convert';
import { hr24ToHr12, noPadding } from './time-convert';

const weatherData = { body: {} };
export default weatherData;

function convertTemp(tempVal) {
  const tempUnit = tempUnits[unitSettings.temp];
  const convertFn = {
    K: (val) => val,
    '°F': kelvinToFahrenheit,
    '°C': kelvinToCelsius,
  }[tempUnit];
  return convertFn(Number(tempVal)) + tempUnit;
}

function convertSpeed(speedVal) {
  const speedUnit = speedUnits[unitSettings.speed];
  const convertFn = {
    'meter,second': (val) => val,
    'mile,hour': metersSecondsToMilesHours,
  }[speedUnit];
  const convertedSpeed = convertFn(Number(speedVal));
  const speedUnitWords = speedUnit.split(',');
  return `${convertedSpeed} ${speedUnitWords[0]}${
    convertedSpeed === 1 ? '' : 's'
  } per ${speedUnitWords[1]}`;
}

function convertTime(unixTime, timeZoneOffset) {
  const time = new Date((Number(unixTime) + Number(timeZoneOffset)) * 1000)
    .toISOString()
    .slice(11, 16);
  const timeUnit = timeUnits[unitSettings.time];
  const convertFn = {
    hr24: noPadding,
    hr12: hr24ToHr12,
  }[timeUnit];
  return convertFn(time);
}

function formatWeatherDataBody(weatherDataBody) {
  ['temp', 'tempMax', 'tempMin', 'tempFeels'].forEach((tempProp) => {
    weatherDataBody[tempProp] = convertTemp(weatherDataBody[tempProp]);
  });
  ['sunrise', 'sunset'].forEach((timeProp) => {
    weatherDataBody[timeProp] = convertTime(
      weatherDataBody[timeProp],
      weatherDataBody.timeZoneOffset
    );
  });
  weatherDataBody.windSpeed = convertSpeed(weatherDataBody.windSpeed);
  weatherDataBody.windDeg += '°';
}

export async function setWeather(
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
  console.log(weatherData);
}
