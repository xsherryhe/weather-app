function parameterizeLocation(location) {
  return location.replace(' ', '+');
}

export default async function openWeatherMapAPIProvider(location, apiKey) {
  const locationParam = parameterizeLocation(location);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${locationParam}`
  );
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}
