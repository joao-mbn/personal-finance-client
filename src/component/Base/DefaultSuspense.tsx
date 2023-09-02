import { ReactNode, Suspense } from 'react';
import { Loading, LoadingProps } from '.';

export interface DefaultSuspenseProps extends LoadingProps {
  children: ReactNode;
}

export function DefaultSuspense({ children, ...props }: DefaultSuspenseProps) {
  return <Suspense fallback={<Loading {...props} />}>{children}</Suspense>;
}
