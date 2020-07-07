/**
 * Format numbers with commas (ex: 12,000.03)
 * @param num Number to format
 */
export function formatNumberWithCommas(num: number, includeDecimal = true): string {
  if (isNaN(num) || num == null) {
    return '';
  }
  // Concat with empty string to retain the 2 decimal places
  // Since .toString() method removes last zero digit in decimal
  const parts = (num.toFixed(2) + '').split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (includeDecimal) {
    return parts.join('.');
  } else {
    return parts[0];
  }
}

export function toFixedIfNecessary(value: any, dp: number = 2) {
  return +parseFloat(value).toFixed(dp);
}

export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
