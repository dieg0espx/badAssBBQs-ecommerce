
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  
export function formatPrice(price) {
    const amount = price.split('USD ')[1]
    return formatCurrency(amount)
}

export function maxString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength);
  }
  return str;
}

export function toCamelCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => 
      index === 0 
        ? word.charAt(0).toUpperCase() + word.slice(1) 
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
}

export function formatBrandName(str) {
  return str
    .replace(/_/g, ' ') // Replace underscores with spaces
    .split(' ') // Split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words back into a single string
}
