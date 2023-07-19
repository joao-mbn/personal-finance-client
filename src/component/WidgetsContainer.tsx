import { useQuery } from '@tanstack/react-query';
import { Suspense, createElement, lazy } from 'react';
import { Loading } from '.';
import { DashboardWidget } from '../models';
import { DashboardService } from '../services';

const BalancesWidget = lazy(() => import('./DashboardWidgets/BalancesWidget'));
const DebtsWidget = lazy(() => import('./DashboardWidgets/DebtsWidget'));
const DueSoonBillsWidget = lazy(() => import('./DashboardWidgets/DueSoonBillsWidget'));
const MonthlyEntriesWidget = lazy(() => import('./DashboardWidgets/MonthlyEntriesWidget'));
const MonthlyBalancesWidget = lazy(() => import('./DashboardWidgets/MonthlyBalancesWidget'));
const AssetsWidget = lazy(() => import('./DashboardWidgets/AssetsWidget'));
const MonthlyDebtsWidget = lazy(() => import('./DashboardWidgets/MonthlyDebtsWidget'));

const widgetsMapper = {
  [DashboardWidget.Balances]: BalancesWidget,
  [DashboardWidget.Debts]: DebtsWidget,
  [DashboardWidget.DueSoonBills]: DueSoonBillsWidget,
  [DashboardWidget.MonthlyEntries]: MonthlyEntriesWidget,
  [DashboardWidget.MonthlyBalance]: MonthlyBalancesWidget,
  [DashboardWidget.Assets]: AssetsWidget,
  [DashboardWidget.MonthlyDebts]: MonthlyDebtsWidget,
};

export function WidgetsContainer() {
  const { data } = useQuery({
    queryKey: ['widgets'],
    queryFn: DashboardService.getWidgets,
  });

  return (
    <div className="flex flex-col gap-4 overflow-x-hidden p-0.5">
      {data?.map(widget => (
        <Suspense
          fallback={<Loading />}
          key={widget}>
          {createElement(widgetsMapper[widget])}
        </Suspense>
      ))}
    </div>
  );
}

export default WidgetsContainer;
