
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


  