export function dateFormatter(date) {
  const newDate = new Date(date);

  return `${newDate.getMonth()}/${newDate.getDate()}/${newDate.getUTCFullYear()}`
}