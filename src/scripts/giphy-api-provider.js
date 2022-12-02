import { apiKeys } from './settings';

export default async function giphyAPIProvider(search, apiKey = apiKeys.giphy) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${search}`
  );
  if (response.status === 401) throw new Error('Invalid API Key');

  const data = await response.json();
  return data.data.images.original.url;
}
