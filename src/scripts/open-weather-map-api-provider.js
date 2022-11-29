import { apiKeys } from './settings';

function parameterizeLocation(location) {
  return location.replace(' ', '+');
}

export default async function openWeatherMapAPIProvider(location) {
  const apiKey = apiKeys.openWeatherMap;
  const locationParam = parameterizeLocation(location);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${locationParam}`
  );
  if (response.status === 401) throw new Error('Invalid API Key');

  const {
    name,
    main: { feels_like, temp, temp_max, temp_min },
    sys: { country, sunrise, sunset },
    timezone,
    weather: [{ description }],
    wind: { deg, speed },
  } = await response.json();

  return {
    name,
    country,
    weather: description,
    temp,
    tempMin: temp_min,
    tempMax: temp_max,
    tempFeels: feels_like,
    windSpeed: speed,
    windDeg: deg,
    sunrise,
    sunset,
    timeZoneOffset: timezone,
  };
}
