import classNames from 'classnames';
import { HTMLAttributes } from 'react';

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function Page({ title, className, children }: PageProps) {
  return (
    <main className={classNames(className, 'h-full p-2')}>
      <h1 aria-label="page-title">{title}</h1>
      {children}
    </main>
  );
}
