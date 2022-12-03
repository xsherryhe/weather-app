export function round(num, place) {
  return Number(num).toFixed(place);
}

export function capitalize(string) {
  return string
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

export function duration(milliseconds, ...promises) {
  const timeout = new Promise((_, reject) => {
    setTimeout(
      () => reject(new Error('Timed out. Please try again.')),
      milliseconds
    );
  });

  return Promise.race([...promises, timeout]);
}
