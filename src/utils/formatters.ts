export function formatNumber(locale: string, value: number, options?: Intl.NumberFormatOptions) {
  const formatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    ...options,
  });
  return formatter.format(value);
}

export function formatCurrency(
  value: number,
  locale: string,
  currency: string,
  options?: Intl.NumberFormatOptions
) {
  return formatNumber(locale, value, {
    currency,
    style: 'currency',
    signDisplay: 'exceptZero',
    ...options,
  });
}

export function getCurrencySymbol(locale: string, currency: string) {
  return (
    new Intl.NumberFormat(locale, { style: 'currency', currency })
      .formatToParts(1)
      .find(p => p.type === 'currency')?.value ?? '$'
  );
}

export function getThousandSeparator(locale: string) {
  return (
    new Intl.NumberFormat(locale).formatToParts(1000).find(p => p.type === 'group')?.value ?? ''
  );
}

export function getDecimalSeparator(locale: string) {
  return (
    new Intl.NumberFormat(locale).formatToParts(1.1).find(p => p.type === 'decimal')?.value ?? ''
  );
}

export function formatDate(value: Date, locale: string) {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: '2-digit',
    month: '2-digit',
  });
  return formatter.format(value);
}
