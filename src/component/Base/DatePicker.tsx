import { Key } from 'react';
import { Dropdown, DropdownOption } from '.';

export const DEFAULT_MONTH_OPTIONS: DropdownOption[] = Array(12)
  .fill('')
  .map((_, i) => ({
    key: i,
    value: new Date(0, i).toLocaleDateString('pt-BR', { month: 'long' }),
  }));
const CURRENT_YEAR = new Date().getFullYear();
export const DEFAULT_YEAR_OPTIONS: DropdownOption[] = [
  ...Array(10)
    .fill('')
    .map((_, i) => ({ key: CURRENT_YEAR - i, value: CURRENT_YEAR - i })),
];

export interface DatePickerProps {
  monthOptions?: DropdownOption[];
  yearOptions?: DropdownOption[];
  onChangeMonth: (month: Key) => void;
  onChangeYear: (year: Key) => void;
  selectedMonth: Key;
  selectedYear: Key;
}

export function DatePicker({
  onChangeMonth,
  onChangeYear,
  monthOptions,
  yearOptions,
  selectedMonth,
  selectedYear,
}: DatePickerProps) {
  const _monthOptions = monthOptions ?? DEFAULT_MONTH_OPTIONS;
  const _yearOptions = yearOptions ?? DEFAULT_YEAR_OPTIONS;

  return (
    <div className="flex">
      <Dropdown
        className="min-w-[5rem]"
        onChange={month => onChangeMonth(month)}
        options={_monthOptions}
        selected={selectedMonth}
      />
      <Dropdown
        className="min-w-[4rem]"
        onChange={year => onChangeYear(year)}
        options={_yearOptions}
        selected={selectedYear}
      />
    </div>
  );
}
