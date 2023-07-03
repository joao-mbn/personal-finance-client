import { DropdownOption } from '../models';

/**
 *
 * @param t1 - The first date.
 * @param t2 - The second date.
 * @param unit - The unit in which the difference will be returned.
 *
 * @returns A float with the difference, in the {@link unit} specified. Note: If `t2 > t1` it will return a negative number.
 */
export function getTimeDiff(
  t1: number | Date | string,
  t2: number | Date | string,
  unit: 'seconds' | 'minutes' | 'hours' | 'days'
) {
  const castedT1 = castToTime(t1);
  const castedT2 = castToTime(t2);

  if ((!castedT1 && castedT1 !== 0) || (!castedT2 && castedT2 !== 0)) return false;

  const timeDiff = castedT1 - castedT2;

  const timeDiffSeconds = timeDiff / 1000;
  if (unit === 'seconds') return timeDiffSeconds;

  const timeDiffMinutes = timeDiffSeconds / 60;
  if (unit === 'minutes') return timeDiffMinutes;

  const timeDiffHours = timeDiffMinutes / 60;
  if (unit === 'hours') return timeDiffHours;

  const timeDiffDays = timeDiffHours / 24;
  return timeDiffDays;
}

export function castToTime(date: number | Date | string) {
  if (typeof date === 'number') return date;

  if (typeof date === 'string') {
    const castedDate = new Date(date).getTime();

    if (isNaN(castedDate)) return false;

    return castedDate;
  }

  return date.getTime();
}

/**
 *
 * @param date The reference date to be added.
 * @param amount The amount to be added.
 * @param unit The unit of the amount added.
 *
 * @returns A new date with the amount added to the reference. Note: If a negative amount is given, the new date will be previous to the {@link date}.
 */
export function addDate(date: Date = new Date(), amount: number, unit: 'year' | 'month' | 'day') {
  const newDate = new Date(date);

  if (unit === 'year') {
    const year = newDate.getFullYear();
    newDate.setFullYear(year + amount);
  } else if (unit === 'month') {
    const month = newDate.getMonth();
    newDate.setMonth(month + amount);
  } else {
    const day = newDate.getDate();
    newDate.setDate(day + amount);
  }

  return newDate;
}

export function getDefaultRange() {
  const NOW = new Date();
  const FROM_DATE = addDate(NOW, -1, 'month');
  const FROM_YEAR = FROM_DATE.getFullYear();
  const FROM_MONTH = FROM_DATE.getMonth();
  const TO_YEAR = NOW.getFullYear();
  const TO_MONTH = NOW.getMonth();

  return { FROM_DATE, FROM_YEAR, FROM_MONTH, TO_DATE: NOW, TO_YEAR, TO_MONTH };
}

export function getDefaultOptions() {
  const NOW = new Date();
  const CURRENT_YEAR = NOW.getFullYear();

  const DEFAULT_MONTH_OPTIONS: DropdownOption[] = Array(12)
    .fill('')
    .map((_, i) => ({
      key: i,
      value: new Date(0, i).toLocaleDateString('pt-BR', { month: 'long' }),
    }));
  const DEFAULT_YEAR_OPTIONS: DropdownOption[] = [
    ...Array(10)
      .fill('')
      .map((_, i) => ({ key: CURRENT_YEAR - i, value: CURRENT_YEAR - i })),
  ];

  return { DEFAULT_MONTH_OPTIONS, DEFAULT_YEAR_OPTIONS };
}
