export function dateFormatter(date) {
  const newDate = new Date(date);

  return `${
    newDate.getMonth() + 1
  }/${newDate.getDate()}/${newDate.getUTCFullYear()}`;
}

export function makePlural(
  amount: number,
  keyword: string,
  pluralLetters: string
) {
  if (amount === 1) return keyword;
  else if (amount > 1 || amount === 0) return `${keyword}${pluralLetters}`;
  return '';
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

  return `${hours}:${minutes}${suffix}`;
}

export function formatUTCOffsetlessTime(time) {
  const date = new Date(time);
  const offset = new Date().getTimezoneOffset() / 60;
  date.setHours(date.getHours() - offset);

  return date.toLocaleTimeString();
}

export function formatCurrency(cents: number, decimals: number = 2) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(cents / 100);
}
