
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
    return str.slice(0, maxLength) + '...';
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

  