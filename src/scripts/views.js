import { login, weather } from './dom-elements';

export function weatherView() {
  login.classList.add('hidden');
  weather.classList.remove('hidden');
}
