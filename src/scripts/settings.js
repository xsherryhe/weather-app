import { readFromStorage, writeToStorage } from './storage';

function updateSettings(settingsName, settingsObject, newSettings) {
  Object.assign(settingsObject, newSettings);
  writeToStorage(settingsName, settingsObject);
}

export const apiKeys = readFromStorage('apiKeys') || {};
export function updateApiKeys(newKeys) {
  updateSettings('apiKeys', apiKeys, newKeys);
}

export const tempUnits = ['K', '°F', '°C'];
export const speedUnits = ['meter,second', 'mile,hour'];
export const timeUnits = ['hr24', 'hr12'];
export const unitSettings = readFromStorage('unitSettings') || {
  temp: 1,
  speed: 1,
  time: 1,
};
export function updateUnitSettings(newSettings) {
  Object.keys(newSettings).forEach((setting) => {
    newSettings[setting] = +newSettings[setting];
  });
  updateSettings('unitSettings', unitSettings, newSettings);
}

export const locationSettings = readFromStorage('locationSettings') || {
  defaultCity: 'New York City',
};
export function updateLocationSettings(newSettings) {
  updateSettings('locationSettings', locationSettings, newSettings);
}
