import { ReactNode } from 'react';

export interface WidgetHeaderProps {
  title: ReactNode;
}

export default function WidgetHeader({ title }: WidgetHeaderProps) {
  return <h2 className="text-xs font-normal">{title}</h2>;
}
