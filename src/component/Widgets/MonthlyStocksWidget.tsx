import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardService } from '../../service';
import { Widget } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));

interface MonthlyStocksWidgetProps {}

export function MonthlyStocksWidget(props: MonthlyStocksWidgetProps) {
  const { data } = useQuery({
    queryKey: ['monthlyStocks'],
    queryFn: DashboardService.getMonthlyStocks,
  });

  return (
    <Widget title={ptBR.monthlyStocks}>
      <div className="border-solid border-2 border-black h-48 overflow-x-scroll">
        {data?.length && (
          <BarChart
            keys={Object.keys(data[0]).filter(k => k !== 'month')}
            indexBy="month"
            data={data.map(d => ({ ...d, month: new Date(d.month).getMonth() }))}
            width={data.length * 60}
            height={184}
          />
        )}
      </div>
    </Widget>
  );
}

export default MonthlyStocksWidget;
