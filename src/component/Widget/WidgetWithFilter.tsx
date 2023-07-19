import { lazy } from 'react';
import { WidgetProps } from './Widget';
import { WidgetBase } from './WidgetBase';
import { WidgetFilter, WidgetFilterProps } from './WidgetFilter';

const WidgetHeader = lazy(() => import('./WidgetHeader'));

export interface WidgetWithFilterProps extends WidgetProps, WidgetFilterProps {}

export function WidgetWithFilter({
  title,
  updateWidgetFilter,
  initialFilter,
  ...props
}: WidgetWithFilterProps) {
  return (
    <WidgetBase
      header={
        <div className="flex items-center gap-1">
          {title && <WidgetHeader title={title} />}
          <WidgetFilter
            initialFilter={initialFilter}
            updateWidgetFilter={updateWidgetFilter}
          />
        </div>
      }
      {...props}
    />
  );
}
