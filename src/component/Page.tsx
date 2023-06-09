import classNames from 'classnames';
import { HTMLAttributes, useEffect, useState } from 'react';

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
      className={classNames(
        className,
        'flex h-full min-h-[calc(100vh-4rem)] flex-col gap-4 bg-cerulean-50 p-2 opacity-0 transition-opacity'
      )}>
      {title && (
        <h1
          aria-label="page-title"
          className="text-base text-cerulean-700">
          {title}
        </h1>
      )}
      {children}
    </main>
  );
}
