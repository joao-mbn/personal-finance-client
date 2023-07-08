import { Key } from 'react';
import { Dropdown, DropdownProps } from '.';
import { DropdownOption } from '../../models';
import { getDefaultOptions } from '../../utils';

const NOW = new Date();
const CURRENT_YEAR = NOW.getFullYear();
const CURRENT_MONTH = NOW.getMonth();
const { DEFAULT_MONTH_OPTIONS, DEFAULT_YEAR_OPTIONS } = getDefaultOptions();

export interface DatePickerProps
  extends Omit<DropdownProps<DropdownOption>, 'onChange' | 'options'> {
  monthOptions?: DropdownOption[];
  yearOptions?: DropdownOption[];
  onChange: (date: Date) => void;
  value?: Date;
}

export function DatePicker({
  monthOptions,
  onChange,
  value,
  yearOptions,
  ...props
}: DatePickerProps) {
  const _selectedMonth = value?.getMonth() ?? CURRENT_MONTH;
  const _selectedYear = value?.getFullYear() ?? CURRENT_YEAR;

  const _monthOptions = monthOptions ?? DEFAULT_MONTH_OPTIONS;
  const _yearOptions = yearOptions ?? DEFAULT_YEAR_OPTIONS;

  function onChangeOption(value: Key, datePart: 'month' | 'year') {
    const _value = Number(value);

    const newDate = new Date(_selectedYear, _selectedMonth);
    if (datePart === 'month') {
      newDate.setMonth(_value);
    } else {
      newDate.setFullYear(_value);
    }

    onChange(newDate);
  }

  return (
    <div className="flex">
      <Dropdown
        className="min-w-[5rem]"
        onChange={month => onChangeOption(month, 'month')}
        options={_monthOptions}
        selected={_selectedMonth}
        {...props}
      />
      <Dropdown
        className="min-w-[4rem]"
        onChange={year => onChangeOption(year, 'year')}
        options={_yearOptions}
        selected={_selectedYear}
        {...props}
      />
    </div>
  );
}
