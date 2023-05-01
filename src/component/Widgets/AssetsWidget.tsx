import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardService } from '../../service';
import { Widget } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));

interface AssetsWidgetProps {}

export function AssetsWidget(props: AssetsWidgetProps) {
  const { data } = useQuery({ queryKey: ['assets'], queryFn: DashboardService.getAssets });

  return (
    <Widget title={ptBR.assets}>
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

export default AssetsWidget;
