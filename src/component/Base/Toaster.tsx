import classNames from 'classnames';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Dialog, DialogProps, DialogRef } from '.';
import { ErrorIcon, InfoIcon, SuccessIcon } from '..';
import { ptBR } from '../../languages';

export interface ToasterProps extends Omit<DialogProps, 'header'> {
  title?: string;
  message: string;
  duration?: number;
  type?: 'error' | 'info' | 'success';
}

export type ToasterRef = (DialogRef & { invoke: () => void }) | null;

export const Toaster = forwardRef<ToasterRef, ToasterProps>(function Toaster(
  { title, message, className, duration, type = 'info', ...props }: ToasterProps,
  ref
) {
  const _duration = duration ?? ((type === 'error' && 5000) || 3000);
  const _title =
    title ?? ((type === 'error' && ptBR.error) || (type === 'success' && ptBR.success));
  const [_ref, setRef] = useState<DialogRef>(null);
  const [translation, setTranslation] = useState('');

  const invoke = useCallback(() => {
    setTranslation('-translate-y-1/2vh');
    _ref?.show();

    setTimeout(() => {
      setTranslation('translate-y-1/2vh');

      setTimeout(() => _ref?.close(), 300);
    }, _duration);
  }, [_ref, _duration]);

  useImperativeHandle<ToasterRef, ToasterRef>(ref, () => (_ref ? { ..._ref, invoke } : null), [
    _ref,
    invoke,
  ]);

  return (
    <Dialog
      {...props}
      headerClassName={getClassName(type)}
      ref={setRef}
      className={classNames(
        className,
        translation,
        'top-full z-50 w-56 transition-transform ease-linear'
      )}
      header={
        <span className="flex gap-1">
          {getIcon(type)}
          {_title}
        </span>
      }>
      {message}
    </Dialog>
  );
});

function getClassName(type: ToasterProps['type']) {
  switch (type) {
    case 'error':
      return 'fill-red-600 border-b-red-600';
    case 'success':
      return 'fill-green-600 border-b-green-600';
    case 'info':
    default:
      return 'fill-cerulean-600 border-b-cerulean-600';
  }
}

function getIcon(type: ToasterProps['type']) {
  if (!type) return <></>;

  switch (type) {
    case 'error':
      return (
        <ErrorIcon
          className="w-5"
          viewBox="0 2 18 18"
        />
      );
    case 'info':
      return (
        <InfoIcon
          className="w-5"
          viewBox="1 2 22 22"
        />
      );
    case 'success':
      return (
        <SuccessIcon
          className="w-5"
          viewBox="0 60 1000 1000"
        />
      );
    default:
      return <></>;
  }
}

export default Toaster;
