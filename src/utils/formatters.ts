export function toCurrency(value: number, locale: string, currency: string) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  });
  return formatter.format(value);
}

export function toBRL(value: number) {
  return toCurrency(value, 'pt-BR', 'BRL');
}
