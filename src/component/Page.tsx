import classNames from 'classnames';
import { HTMLAttributes, useEffect, useState } from 'react';
import { MENU_BAR_HEIGHT } from '../utils';

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function Page({ title, className, children }: PageProps) {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    setTimeout(() => (ref.style.opacity = '1'), 150);
  }, [ref]);

  return (
    <main
      ref={setRef}
      style={{ minHeight: `calc(100vh - ${MENU_BAR_HEIGHT}rem)` }}
      className={classNames(
        className,
        'flex h-full flex-col gap-4 bg-hoki-50 p-2 opacity-0 transition-opacity'
      )}>
      {title && (
        <h1
          aria-label="page-title"
          className="text-base text-hoki-700">
          {title}
        </h1>
      )}
      {children}
    </main>
  );
}
