
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

export function formatBrandName(str) {
  return str
    .replace(/_/g, ' ') // Replace underscores with spaces
    .split(' ') // Split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words back into a single string
}

export function formatName(firstName, lastName) {
  if (!firstName || !lastName) {
      return "";
  }

  // Capitalize first letter and make the rest lowercase
  const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const formattedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

  return `${formattedFirstName} ${formattedLastName}`;
}


export function formatPhoneNumber(phoneNumber) {
  // Remove any non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Check if the cleaned number has exactly 10 digits
  if (cleaned.length !== 10) {
      return "";
  }
  
  // Format the number
  const formattedNumber = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  return formattedNumber;
}


export const generateOrderId = () => {
  const timestamp = Date.now();
  return timestamp.toString(36).toUpperCase(); // Convert to Base36 and uppercase
};
