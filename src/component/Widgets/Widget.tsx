import classNames from 'classnames';
import { ReactNode } from 'react';

interface WidgetProps {
  title: string;
  children?: ReactNode;
  className?: string;
  overflow?: string;
}

export function Widget({ title, children, className, overflow }: WidgetProps) {
  return (
    <section
      key={title}
      className={classNames(
        'flex w-full flex-col gap-2 rounded-lg bg-slate-50 p-2 text-slate-600 shadow shadow-slate-300 hover:shadow-slate-500',
        className
      )}>
      <h2 className="text-sm font-normal">{title}</h2>
      <div className={classNames('text-xs', overflow, { 'overflow-hidden': !overflow })}>
        {children}
      </div>
    </section>
  );
}
