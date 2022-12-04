import * as localStorageProvider from './local-storage-provider';

export function readFromStorage(
  attribute,
  storageProvider = localStorageProvider
) {
  return storageProvider.readData(attribute);
}

export function writeToStorage(
  attribute,
  data,
  storageProvider = localStorageProvider
) {
  storageProvider.writeData(attribute, data);
}
