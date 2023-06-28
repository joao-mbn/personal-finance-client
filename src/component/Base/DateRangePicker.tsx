import { Key, useState } from 'react';
import { DatePicker, DatePickerProps, DropdownOption } from '.';
import { ptBR } from '../../languages';
import { addDate } from '../../utils';

interface DateRangePickerProps {}

const NOW = new Date();
const FROM_DATE = addDate(NOW, -1, 'month');
const FROM_YEAR = FROM_DATE.getFullYear();
const FROM_MONTH = FROM_DATE.getMonth();
const TO_YEAR = NOW.getFullYear();
const TO_MONTH = NOW.getMonth();
const DEFAULT_MONTH_OPTIONS: DropdownOption[] = Array(12)
  .fill('')
  .map((_, i) => ({
    key: i,
    value: new Date(0, i).toLocaleDateString('pt-BR', { month: 'long' }),
  }));
const DEFAULT_YEAR_OPTIONS: DropdownOption[] = [
  ...Array(10)
    .fill('')
    .map((_, i) => ({ key: TO_YEAR - i, value: TO_YEAR - i })),
];

export function DateRangePicker({ ...props }: DateRangePickerProps) {
  const [selectedFromMonth, setSelectedFromMonth] = useState<Key>(FROM_MONTH);
  const [selectedFromYear, setSelectedFromYear] = useState<Key>(FROM_YEAR);
  const [selectedToMonth, setSelectedToMonth] = useState<Key>(TO_MONTH);
  const [selectedToYear, setSelectedToYear] = useState<Key>(TO_YEAR);

  return (
    <div className="flex w-full flex-wrap justify-start gap-1 text-sm">
      <DatePickerWrapper
        label={ptBR.from}
        monthOptions={DEFAULT_MONTH_OPTIONS}
        onChangeMonth={month => setSelectedFromMonth(month)}
        onChangeYear={year => setSelectedFromYear(year)}
        selectedMonth={selectedFromMonth}
        selectedYear={selectedFromYear}
        yearOptions={DEFAULT_YEAR_OPTIONS}
      />
      <DatePickerWrapper
        label={ptBR.to}
        monthOptions={DEFAULT_MONTH_OPTIONS}
        onChangeMonth={month => setSelectedToMonth(month)}
        onChangeYear={year => setSelectedToYear(year)}
        selectedMonth={selectedToMonth}
        selectedYear={selectedToYear}
        yearOptions={DEFAULT_YEAR_OPTIONS}
      />
    </div>
  );
}

interface DatePickerWrapperProps extends DatePickerProps {
  label: string;
}

function DatePickerWrapper({ label, ...props }: DatePickerWrapperProps) {
  return (
    <div className="overflow-y flex h-7 items-start">
      <span className="w-5 pt-1 text-slate-600">{label}</span>
      <DatePicker {...props} />
    </div>
  );
}
