import { unitSettings, timeUnits } from './settings';

function padMinute(minute) {
  return String(minute).padStart(2, '0');
}

export function noPadding(time) {
  const [hour, rest] = time.split(':');
  return `${Number(hour)}:${rest}`;
}

export function hr24ToHr12(time) {
  const [hour, minute] = time.split(':').map(Number);
  let [ampm, offset] = hour <= 11 ? ['AM', 0] : ['PM', 1];
  if (hour === 0) offset += 12;
  return `${(hour % 13) + offset}:${padMinute(minute)} ${ampm}`;
}

export function hr12ToHr24(time) {
  const [numTime, ampm] = time.split(' ');
  const [hour, minute] = numTime.split(':').map(Number);
  let offset = ampm === 'PM' ? 12 : 0;
  if (hour === 12 && ampm === 'AM') offset -= 12;
  return `${hour + offset}:${padMinute(minute)}`;
}

export function unixToHr24(time, timeZoneOffset) {
  const localTime = Number(time) + Number(timeZoneOffset);
  return noPadding(new Date(localTime * 1000).toISOString().slice(11, 16));
}

export function unixToHr12(time, timeZoneOffset) {
  return hr24ToHr12(unixToHr24(time, timeZoneOffset));
}

export default function convertTime(
  timeVal,
  timeZoneOffset,
  fromTimeUnit,
  toTimeUnit = timeUnits[unitSettings.time]
) {
  const convertFn =
    {
      'unix-hr24': unixToHr24,
      'unix-hr12': unixToHr12,
      'hr24-hr12': hr24ToHr12,
      'hr12-hr24': hr12ToHr24,
    }[`${fromTimeUnit}-${toTimeUnit}`] || noPadding;
  return convertFn(timeVal, timeZoneOffset);
}
