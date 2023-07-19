import classNames from 'classnames';
import { ReactNode } from 'react';
import { ptBR } from '../../languages';

export interface WidgetBaseProps {
  children?: ReactNode;
  className?: string;
  header?: ReactNode;
}

export function WidgetBase({ header, children, className }: WidgetBaseProps) {
  return (
    <section
      className={classNames(
        'flex w-full flex-col gap-1 rounded-lg bg-white p-2 text-hoki-700 shadow-sm shadow-hoki-300 hover:shadow-hoki-600',
        className
      )}>
      {header}
      {children ? (
        <div className="text-xs">{children}</div>
      ) : (
        <div className="flex h-28 items-center justify-center text-xs font-bold text-hoki-700">
          {ptBR.noData}
        </div>
      )}
    </section>
  );
}
