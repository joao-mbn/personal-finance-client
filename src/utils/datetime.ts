/**
 *
 * @param t1 - The first date.
 * @param t2 - The second date.
 * @param unit - The unit in which the difference will be returned.
 *
 * If `t2 > t1` it will return a negative number.
 * @returns A float with the difference, in the {@link unit} specified.
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

function castToTime(date: number | Date | string) {
  if (typeof date === 'number') return date;

  if (typeof date === 'string') {
    const castedDate = new Date(date).getTime();

    if (isNaN(castedDate)) return false;

    return castedDate;
  }

  return date.getTime();
}
