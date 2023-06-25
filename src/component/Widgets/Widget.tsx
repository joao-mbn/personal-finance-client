import classNames from 'classnames';
import { ReactNode } from 'react';
import { ptBR } from '../../languages';
import { WidgetFilter } from './WidgetFilter';

interface WidgetWithFilterProps extends WidgetProps {}

export function WidgetWithFilter({ title, ...props }: WidgetWithFilterProps) {
  return (
    <WidgetBase
      header={
        title && (
          <div className="flex items-center gap-1">
            <WidgetHeader title={title} />
            <WidgetFilter />
          </div>
        )
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
        'flex w-full flex-col gap-1 rounded-lg bg-slate-50 p-2 text-slate-600 shadow shadow-slate-300 hover:shadow-slate-500',
        className
      )}>
      {header}
      {children ? (
        <div className="text-xs">{children}</div>
      ) : (
        <div className="flex h-28 items-center justify-center text-xs font-bold text-slate-500">
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
