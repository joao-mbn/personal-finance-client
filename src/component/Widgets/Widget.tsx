import classNames from 'classnames';
import { ReactNode } from 'react';
import { ptBR } from '../../languages';

interface WidgetProps {
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function Widget({ title, children, className }: WidgetProps) {
  return (
    <section
      className={classNames(
        'flex w-full flex-col gap-2 rounded-lg bg-slate-50 p-2 text-slate-600 shadow shadow-slate-300 hover:shadow-slate-500',
        className
      )}>
      <h2 className="text-sm font-normal">{title}</h2>
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
