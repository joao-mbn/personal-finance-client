import { ReactNode } from 'react';

interface WidgetProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

export function Widget({ title, children, className }: WidgetProps) {
  return (
    <section key={title} className={`shadow hover:shadow-lg flex flex-col w-full p-2 gap-2 ${className}`}>
      <h2 className="font-normal text-lg">{title}</h2>
      <div className="flex h-full">{children}</div>
    </section>
  );
}
