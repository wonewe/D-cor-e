export function formatDate(dateString, locale = 'fr-FR') {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
  });
}

export function capitalize(input) {
  if (!input) return '';
  return input.charAt(0).toUpperCase() + input.slice(1);
}
