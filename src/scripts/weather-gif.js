import giphyAPIProvider from './giphy-api-provider';

const weatherGif = { url: '#' };
export default weatherGif;

export async function getWeatherGif(weather, gifProvider = giphyAPIProvider) {
  try {
    weatherGif.url = await gifProvider(weather);
  } catch (err) {
    weatherGif.url = '#';
  }
  return weatherGif;
}
