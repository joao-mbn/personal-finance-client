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
        'flex w-full flex-col gap-2 rounded-lg p-2 shadow hover:shadow-lg',
        className
      )}>
      <h2 className="text-sm font-normal">{title}</h2>
      <div className={classNames(overflow, { 'overflow-hidden': !overflow })}>{children}</div>
    </section>
  );
}
