import { DatePicker } from '.';
import { ptBR } from '../../languages';

interface DateRangePickerProps {}

export function DateRangePicker({ ...props }: DateRangePickerProps) {
  return (
    <div className="flex w-full flex-wrap justify-start gap-1 text-sm">
      <div className="flex items-start">
        <span className="w-5 pt-1 text-slate-600">{ptBR.from}</span>
        <DatePicker />
      </div>
      <div className="flex items-start">
        <span className="w-5 pt-1 text-slate-600">{ptBR.to}</span>
        <DatePicker />
      </div>
    </div>
  );
}
