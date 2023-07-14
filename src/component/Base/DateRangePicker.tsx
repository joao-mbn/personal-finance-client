import { DatePicker, DatePickerProps } from '.';
import { ptBR } from '../../languages';
import { DateRange } from '../../models';
import { getDefaultOptions, getDefaultRange, toEndOfPeriod } from '../../utils';

const { FROM_DATE, FROM_YEAR, FROM_MONTH, TO_DATE, TO_YEAR, TO_MONTH } = getDefaultRange();
const { DEFAULT_MONTH_OPTIONS, DEFAULT_YEAR_OPTIONS } = getDefaultOptions();

interface DateRangePickerProps {
  onChange: (range: DateRange) => void;
  range?: DateRange;
}

export function DateRangePicker({ onChange, range }: DateRangePickerProps) {
  const fromDate = range?.from ?? FROM_DATE;
  const toDate = range?.to ?? TO_DATE;

  function onChangeOption(value: Date, edge: keyof DateRange) {
    let newRange: DateRange;
    if (!range) {
      newRange = { from: fromDate, to: toDate };
    } else {
      newRange = { ...range };
    }

    newRange[edge] = value;

    onChange(newRange);
  }

  const selectedFromMonth = fromDate.getMonth() ?? FROM_MONTH;
  const selectedFromYear = fromDate.getFullYear() ?? FROM_YEAR;
  const selectedToMonth = toDate.getMonth() ?? TO_MONTH;
  const selectedToYear = toDate.getFullYear() ?? TO_YEAR;

  const fromMonthIsGreater = selectedFromMonth > selectedToMonth;
  const fromAndToHaveSameYear = selectedFromYear === selectedToYear;

  const fromMonthOptions = DEFAULT_MONTH_OPTIONS.map(m => ({
    ...m,
    disabled: fromAndToHaveSameYear && Number(m.key) > selectedToMonth,
  }));
  const fromYearOptions = DEFAULT_YEAR_OPTIONS.map(y => ({
    ...y,
    disabled:
      Number(y.key) > selectedToYear || (Number(y.key) === selectedToYear && fromMonthIsGreater),
  }));
  const toMonthOptions = DEFAULT_MONTH_OPTIONS.map(m => ({
    ...m,
    disabled: fromAndToHaveSameYear && Number(m.key) < selectedFromMonth,
  }));
  const toYearOptions = DEFAULT_YEAR_OPTIONS.map(y => ({
    ...y,
    disabled:
      Number(y.key) < selectedFromYear ||
      (Number(y.key) === selectedFromYear && fromMonthIsGreater),
  }));

  return (
    <div className="flex w-full flex-wrap items-center gap-1 text-sm">
      <DatePickerWrapper
        label={ptBR.from}
        monthOptions={fromMonthOptions}
        onChange={fromDate => onChangeOption(fromDate, 'from')}
        value={fromDate}
        yearOptions={fromYearOptions}
      />
      <DatePickerWrapper
        label={ptBR.to}
        monthOptions={toMonthOptions}
        onChange={toDate => onChangeOption(toEndOfPeriod(toDate, 'month'), 'to')}
        value={toDate}
        yearOptions={toYearOptions}
      />
    </div>
  );
}

interface DatePickerWrapperProps extends DatePickerProps {
  label: string;
}

function DatePickerWrapper({ label, ...props }: DatePickerWrapperProps) {
  return (
    <div className="flex h-7 items-start gap-1">
      <span className="w-5 pt-1 text-hoki-800">{label}</span>
      <DatePicker {...props} />
    </div>
  );
}
