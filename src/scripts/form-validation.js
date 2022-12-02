import openWeatherMapAPIProvider from './open-weather-map-api-provider';
import giphyAPIProvider from './giphy-api-provider';

function clearFormErrors(inputs, errorElements) {
  inputs.forEach((input) => input.setCustomValidity(''));
  errorElements.forEach((errorElement) => {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  });
}

async function validateApiKey(input) {
  if (!input.checkValidity()) return;

  const [apiProvider, dummyParams] = {
    'open-weather-map': [openWeatherMapAPIProvider, ['New York']],
    giphy: [giphyAPIProvider, ['cats']],
  }[input.id.replace('-api-key', '')];
  if (!apiProvider) return;

  try {
    await apiProvider(...dummyParams, input.value);
  } catch (err) {
    input.setCustomValidity(err.message);
  }
}

export default async function validate(form) {
  const errorElements = form.querySelectorAll('.error');
  const inputs = [...form.querySelectorAll('input')];
  clearFormErrors(inputs, errorElements);

  await Promise.all(
    inputs.map((input) =>
      input.id.includes('api-key') ? validateApiKey(input) : Promise.resolve()
    )
  );

  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      const errorElement = form.querySelector(`#${input.id}+.error`);
      errorElement.textContent = input.validationMessage;
      errorElement.classList.remove('hidden');
    }
  });

  return form.checkValidity();
}
