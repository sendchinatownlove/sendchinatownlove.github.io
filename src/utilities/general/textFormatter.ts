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
