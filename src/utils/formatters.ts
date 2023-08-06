export function toCurrency(
  value: number,
  locale: string,
  currency: string,
  overrides?: Intl.NumberFormatOptions
) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    signDisplay: 'exceptZero',
    maximumFractionDigits: 2,
    ...overrides,
  });
  return formatter.format(value);
}

export function toBRL(value: number, overrides?: Intl.NumberFormatOptions) {
  return toCurrency(value, 'pt-BR', 'BRL', overrides);
}

export function formatDate(value: Date, locale: string) {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: '2-digit',
    month: '2-digit',
  });
  return formatter.format(value);
}

export function formatDateBR(value: Date) {
  return formatDate(value, 'pt-BR');
}
