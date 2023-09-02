import classNames from 'classnames';
import { ptBR } from '../../languages';

export interface LoadingProps {
  message?: string;
  backdrop?: boolean;
  centerOfScreen?: boolean;
}

export function Loading({ message, backdrop = false, centerOfScreen = false }: LoadingProps) {
  return (
    <div
      className={classNames('flex h-full w-full items-center justify-center gap-2', {
        'fixed left-0 top-0 h-screen w-screen': centerOfScreen || backdrop,
        'bg-hoki-900/20': backdrop,
      })}>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-s-0 border-solid border-black"></div>
      <span>{message ?? ptBR.loading}</span>
    </div>
  );
}
