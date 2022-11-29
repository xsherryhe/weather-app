import { OPEN_WEATHER_API_KEY } from './environment';

function parameterizeLocation(location) {
  return location.replace(' ', '+');
}

export default async function openWeatherMapAPIProvider(location) {
  const locationParam = parameterizeLocation(location);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?appid=${OPEN_WEATHER_API_KEY}&q=${locationParam}`
  );
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}
