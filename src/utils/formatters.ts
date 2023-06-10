export function toCurrency(value: number, locale: string, currency: string) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: Math.abs(value) >= 1000 ? 0 : 2,
  });
  return formatter.format(value);
}

export function toBRL(value: number) {
  return toCurrency(value, 'pt-BR', 'BRL');
}
