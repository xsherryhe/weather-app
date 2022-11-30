export const apiKeys = {};
export function updateApiKeys(newKeys) {
  Object.assign(apiKeys, newKeys);
}

export const unitSettings = { temp: 1, speed: 1, time: 1 };
export const tempUnits = ['K', '°F', '°C'];
export const speedUnits = ['meter,second', 'mile,hour'];
export const timeUnits = ['hr24', 'hr12'];
export function updateUnitSettings(newSettings) {
  Object.keys(newSettings).forEach((setting) => {
    unitSettings[setting] = +newSettings[setting];
  });
}

export const locationSettings = { defaultCity: 'New York City' };
