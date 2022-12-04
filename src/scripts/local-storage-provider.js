export function readData(attribute) {
  return JSON.parse(localStorage.xsherryheWeatherAppData || '{}')[attribute];
}

export function writeData(attribute, data) {
  const localStorageData = JSON.parse(
    localStorage.xsherryheWeatherAppData || '{}'
  );
  localStorageData[attribute] = data;
  localStorage.xsherryheWeatherAppData = JSON.stringify(localStorageData);
}
