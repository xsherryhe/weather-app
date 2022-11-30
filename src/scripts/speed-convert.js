import { round } from './utilities';
import { unitSettings, speedUnits } from './settings';

function roundSpeed(speed) {
  return round(speed, 2);
}

export function metersSecondsToMilesHours(speed) {
  return roundSpeed(speed * 2.237);
}

export function milesHoursToMetersSeconds(speed) {
  return roundSpeed(speed / 2.237);
}

export default function convertSpeed(
  speedVal,
  fromSpeedUnit,
  toSpeedUnit = speedUnits[unitSettings.speed]
) {
  const speed =
    typeof speedVal === 'number'
      ? speedVal
      : Number(speedVal.match(/\d+(\.\d+)?/)[0]);
  const defaultConvertFn = (val) => val;
  const convertFn =
    {
      'meter,second-mile,hour': metersSecondsToMilesHours,
      'mile,hour-meter,second': milesHoursToMetersSeconds,
    }[`${fromSpeedUnit}-${toSpeedUnit}`] || defaultConvertFn;
  const convertedSpeed = convertFn(speed);
  const speedUnitWords = toSpeedUnit.split(',');
  return `${convertedSpeed} ${speedUnitWords[0]}${
    convertedSpeed === 1 ? '' : 's'
  } per ${speedUnitWords[1]}`;
}
