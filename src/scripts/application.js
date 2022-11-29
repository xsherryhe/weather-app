import openWeatherMapAPIProvider from './open-weather-map-api-provider';

const applicationData = { apiKeys: {} };
export default applicationData;

openWeatherMapAPIProvider(
  'London',
  applicationData.apiKeys.openWeatherMap ||
    prompt('Enter Open Weather Map API Key')
);
