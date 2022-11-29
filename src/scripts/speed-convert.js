import { round } from './utilities';

function roundSpeed(speed) {
  return round(speed, 2);
}

export function metersSecondsToMilesHours(speed) {
  return roundSpeed(speed * 2.237);
}

export function milesHoursToMetersSeconds(speed) {
  return roundSpeed(speed / 2.237);
}
