export function noPadding(time) {
  return time.split(':').map(Number).join(':');
}

export function hr24ToHr12(time) {
  const [hour, minute] = time.split(':').map(Number);
  let [ampm, offset] = hour <= 11 ? ['AM', 0] : ['PM', 1];
  if (hour === 0) offset += 12;
  return `${(hour % 13) + offset}:${minute} ${ampm}`;
}

export function hr12ToHr24(time) {
  const [numTime, ampm] = time.split(' ');
  const [hour, minute] = numTime.split(':').map(Number);
  let offset = ampm === 'PM' ? 12 : 0;
  if (hour === 12 && ampm === 'AM') offset -= 12;
  return `${hour + offset}:${minute}`;
}
