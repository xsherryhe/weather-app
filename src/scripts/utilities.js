export function round(num, place) {
  return Number(num).toFixed(place);
}

export function capitalize(string) {
  return string
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}
