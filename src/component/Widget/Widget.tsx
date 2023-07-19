import { ReactNode, lazy } from 'react';
import { WidgetBase, WidgetBaseProps } from './WidgetBase';

const WidgetHeader = lazy(() => import('./WidgetHeader'));

export interface WidgetProps extends Omit<WidgetBaseProps, 'header'> {
  title?: ReactNode;
}

export function Widget({ title, ...props }: WidgetProps) {
  return (
    <WidgetBase
      header={title && <WidgetHeader title={title} />}
      {...props}
    />
  );
}
