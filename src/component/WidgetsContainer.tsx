import { useQuery } from '@tanstack/react-query';
import { Suspense, createElement, lazy } from 'react';
import { ptBR } from '../languages';
import { DashboardWidget } from '../model';
import { DashboardService } from '../service';

const BalancesWidget = lazy(() => import('./Widgets/BalancesWidget'));
const DebtsWidget = lazy(() => import('./Widgets/DebtsWidget'));
const DueSoonBillsWidget = lazy(() => import('./Widgets/DueSoonBillsWidget'));
const MonthlyEntriesWidget = lazy(() => import('./Widgets/MonthlyEntriesWidget'));
const MonthlyBalancesWidget = lazy(() => import('./Widgets/MonthlyBalancesWidget'));
const MonthlyStocksWidget = lazy(() => import('./Widgets/MonthlyStocksWidget'));
const MonthlyDebtsWidget = lazy(() => import('./Widgets/MonthlyDebtsWidget'));

const widgetsMapper = {
  [DashboardWidget.Balances]: BalancesWidget,
  [DashboardWidget.Debts]: DebtsWidget,
  [DashboardWidget.DueSoonBills]: DueSoonBillsWidget,
  [DashboardWidget.MonthlyEntries]: MonthlyEntriesWidget,
  [DashboardWidget.MonthlyBalance]: MonthlyBalancesWidget,
  [DashboardWidget.MonthlyStocks]: MonthlyStocksWidget,
  [DashboardWidget.MonthlyDebts]: MonthlyDebtsWidget,
};

export function WidgetsContainer() {
  const { data } = useQuery({
    queryKey: ['widgets'],
    queryFn: DashboardService.getWidgets,
  });

  return (
    <div className="flex flex-col gap-2">
      {data?.map(widget => (
        <Suspense
          key={widget}
          fallback={<span className="bg-blue-500">{ptBR.loading}</span>}>
          {createElement(widgetsMapper[widget])}
        </Suspense>
      ))}
    </div>
  );
}

export default WidgetsContainer;
