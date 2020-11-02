export function dateFormatter(date) {
  const newDate = new Date(date);

  return `${
    newDate.getMonth() + 1
  }/${newDate.getDate()}/${newDate.getUTCFullYear()}`;
}

export function makePlural(amount, keyword, pluralLetters) {
  if (amount === 1) return keyword;
  else if (amount > 1) return `${keyword}${pluralLetters}`;
  else return '';
}

export function formatTime(time) {
  // NOTE(wilsonj806): excludes the timezone from the date parsing
  const date = new Date(time.slice(0, time.length - 5));
  const hours = `${
    date.getHours() === 0
      ? 12
      : date.getHours() > 12
      ? date.getHours() - 12
      : date.getHours()
  }`;
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  const suffix = `${date.getHours() >= 12 ? 'PM' : 'AM'}`;

  return `${hours}:${minutes}${suffix}`
}

export function formatCurrency(cents: number, decimals: number = 2) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(cents / 100);
}
