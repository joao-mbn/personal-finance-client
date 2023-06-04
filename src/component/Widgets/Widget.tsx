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
      className={`flex w-full flex-col gap-2 p-2 shadow hover:shadow-lg ${className}`}>
      <h2 className="text-lg font-normal">{title}</h2>
      <div className={`flex h-full ${overflow ?? 'overflow-hidden'}`}>{children}</div>
    </section>
  );
}
