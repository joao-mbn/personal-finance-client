import classNames from 'classnames';
import { ReactNode } from 'react';
import { ptBR } from '../../languages';
import { WidgetFilter, WidgetFilterProps } from './WidgetFilter';

interface WidgetWithFilterProps extends WidgetProps, WidgetFilterProps {}

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

interface WidgetProps extends Omit<WidgetBaseProps, 'header'> {
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

interface WidgetBaseProps {
  children?: ReactNode;
  className?: string;
  header?: ReactNode;
}

function WidgetBase({ header, children, className }: WidgetBaseProps) {
  return (
    <section
      className={classNames(
        'flex w-full flex-col gap-1 rounded-lg bg-white p-2 text-cerulean-700 shadow-sm shadow-cerulean-300 hover:shadow-cerulean-600',
        className
      )}>
      {header}
      {children ? (
        <div className="text-xs">{children}</div>
      ) : (
        <div className="flex h-28 items-center justify-center text-xs font-bold text-cerulean-700">
          {ptBR.noData}
        </div>
      )}
    </section>
  );
}

interface WidgetHeaderProps {
  title: ReactNode;
}

function WidgetHeader({ title }: WidgetHeaderProps) {
  return <h2 className="text-xs font-normal">{title}</h2>;
}
