import classNames from 'classnames';
import { HTMLAttributes } from 'react';

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function Page({ title, className, children }: PageProps) {
  return (
    <main className={classNames(className, 'flex h-full flex-col gap-4 p-2 pt-4')}>
      <h1
        aria-label="page-title"
        className="text-base">
        {title}
      </h1>
      {children}
    </main>
  );
}
