import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardService } from '../../service';
import { Widget } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));

interface MonthlyEntriesWidgetProps {}

export function MonthlyEntriesWidget(props: MonthlyEntriesWidgetProps) {
  const { data } = useQuery({
    queryKey: ['monthlyEntries'],
    queryFn: DashboardService.getMonthlyEntries,
  });

  return (
    <Widget title={ptBR.monthlyEntries}>
      <div className="border-solid border-2 border-black h-48 overflow-x-scroll">
        {data?.length && (
          <BarChart
            keys={Object.keys(data[0]).filter(k => k !== 'month')}
            indexBy="month"
            data={data.map(({ netEarnings, ...rest }) => ({
              ...rest,
              expenses: -rest.expenses,
              month: new Date(rest.month).getMonth(),
            }))}
            width={data.length * 60}
            height={184}
          />
        )}
      </div>
    </Widget>
  );
}

export default MonthlyEntriesWidget;
