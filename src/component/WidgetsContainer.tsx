import { useQuery } from '@tanstack/react-query';
import { createElement, lazy } from 'react';
import { DefaultSuspense } from '.';
import { DashboardWidget } from '../models';
import { DashboardService } from '../services';

const BalancesWidget = lazy(() => import('./Dashboard/BalancesWidget'));
const DebtsWidget = lazy(() => import('./Dashboard/DebtsWidget'));
const DueSoonBillsWidget = lazy(() => import('./Dashboard/DueSoonBillsWidget'));
const MonthlyEntriesWidget = lazy(() => import('./Dashboard/MonthlyEntriesWidget'));
const MonthlyBalancesWidget = lazy(() => import('./Dashboard/MonthlyBalancesWidget'));
const AssetsWidget = lazy(() => import('./Dashboard/AssetsWidget'));
const MonthlyDebtsWidget = lazy(() => import('./Dashboard/MonthlyDebtsWidget'));

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
        <DefaultSuspense key={widget}>{createElement(widgetsMapper[widget])}</DefaultSuspense>
      ))}
    </div>
  );
}

export default WidgetsContainer;
