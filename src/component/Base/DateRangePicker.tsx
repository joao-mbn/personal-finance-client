import { Key, useState } from 'react';
import { DEFAULT_MONTH_OPTIONS, DEFAULT_YEAR_OPTIONS, DatePicker, DatePickerProps } from '.';
import { ptBR } from '../../languages';
import { addDate } from '../../utils';

interface DateRangePickerProps {}

const NOW = new Date();
const FROM_DATE = addDate(NOW, -1, 'month');
const FROM_YEAR = FROM_DATE.getFullYear();
const FROM_MONTH = FROM_DATE.getMonth();
const TO_YEAR = NOW.getFullYear();
const TO_MONTH = NOW.getMonth();

export function DateRangePicker({ ...props }: DateRangePickerProps) {
  const [selectedFromMonth, setSelectedFromMonth] = useState<Key>(FROM_MONTH);
  const [selectedFromYear, setSelectedFromYear] = useState<Key>(FROM_YEAR);
  const [selectedToMonth, setSelectedToMonth] = useState<Key>(TO_MONTH);
  const [selectedToYear, setSelectedToYear] = useState<Key>(TO_YEAR);

  const fromMonthIsGreater = selectedFromMonth > selectedToMonth;
  const fromAndToHaveSameYear = selectedFromYear === selectedToYear;

  const fromMonthOptions = DEFAULT_MONTH_OPTIONS.map(m => ({
    ...m,
    disabled: fromAndToHaveSameYear && m.key > selectedToMonth,
  }));
  const fromYearOptions = DEFAULT_YEAR_OPTIONS.map(m => ({
    ...m,
    disabled: m.key > selectedToYear || (m.key === selectedToYear && fromMonthIsGreater),
  }));
  const toMonthOptions = DEFAULT_MONTH_OPTIONS.map(m => ({
    ...m,
    disabled: fromAndToHaveSameYear && m.key < selectedFromMonth,
  }));
  const toYearOptions = DEFAULT_YEAR_OPTIONS.map(m => ({
    ...m,
    disabled: m.key < selectedFromYear || (m.key === selectedFromYear && fromMonthIsGreater),
  }));

  return (
    <div className="flex w-full flex-wrap items-center gap-1 text-sm">
      <DatePickerWrapper
        label={ptBR.from}
        monthOptions={fromMonthOptions}
        onChangeMonth={month => setSelectedFromMonth(month)}
        onChangeYear={year => setSelectedFromYear(year)}
        selectedMonth={selectedFromMonth}
        selectedYear={selectedFromYear}
        yearOptions={fromYearOptions}
      />
      <DatePickerWrapper
        label={ptBR.to}
        monthOptions={toMonthOptions}
        onChangeMonth={month => setSelectedToMonth(month)}
        onChangeYear={year => setSelectedToYear(year)}
        selectedMonth={selectedToMonth}
        selectedYear={selectedToYear}
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
    <div className="flex h-7 items-start">
      <span className="w-5 pt-1 text-slate-600">{label}</span>
      <DatePicker {...props} />
    </div>
  );
}
