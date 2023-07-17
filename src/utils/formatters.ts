export function toCurrency(value: number, locale: string, currency: string) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    signDisplay: 'exceptZero',
    maximumFractionDigits: Math.abs(value) >= 1000 ? 0 : 2,
  });
  return formatter.format(value);
}

export function toBRL(value: number) {
  return toCurrency(value, 'pt-BR', 'BRL');
}

export function formatDate(value: Date, locale: string) {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(value);
}

export function formatDateBR(value: Date) {
  return formatDate(value, 'pt-BR');
}
