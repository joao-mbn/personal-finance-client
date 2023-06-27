import { useState } from 'react';
import { Dropdown } from '.';

interface DatePickerProps {}

export function DatePicker({ ...props }: DatePickerProps) {
  const months = Array(12)
    .fill('')
    .map((_, i) => ({
      key: i,
      value: new Date(0, i).toLocaleDateString('pt-BR', { month: 'long' }),
    }));

  const currentYear = new Date().getFullYear();
  const years = [
    ...Array(10)
      .fill('')
      .map((_, i) => ({ key: i, value: currentYear - i })),
  ];

  const [selectedMonth, setSelectedMonth] = useState<(typeof months)[number]>();
  const [selectedYear, setSelectedYear] = useState<(typeof years)[number]>();

  return (
    <div className="flex">
      <Dropdown
        className="min-w-[5rem]"
        onChange={month => setSelectedMonth(month)}
        options={months}
        selected={selectedMonth && [selectedMonth]}
      />
      <Dropdown
        className="min-w-[4rem]"
        onChange={year => setSelectedYear(year)}
        options={years}
        selected={selectedYear && [selectedYear]}
      />
    </div>
  );
}
