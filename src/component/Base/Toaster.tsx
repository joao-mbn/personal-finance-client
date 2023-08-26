import classNames from 'classnames';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Dialog, DialogProps, DialogRef } from '.';

export interface ToasterProps extends DialogProps {
  duration?: number;
  type?: 'error' | 'info' | 'success';
}

export type ToasterRef =
  | (DialogRef & {
      invoke: () => void;
    })
  | null;

export const Toaster = forwardRef<ToasterRef, ToasterProps>(function Toaster(
  { duration = 5000, type = 'info', ...props }: ToasterProps,
  ref
) {
  const [_ref, setRef] = useState<DialogRef>(null);
  const [translation, setTranslation] = useState('');

  const invoke = useCallback(() => {
    setTranslation('-translate-y-1/2vh');
    _ref?.show();

    setTimeout(() => {
      setTranslation('translate-y-1/2vh');

      setTimeout(() => _ref?.close(), 300);
    }, duration);
  }, [_ref, duration]);

  useImperativeHandle<ToasterRef, ToasterRef>(ref, () => (_ref ? { ..._ref, invoke } : null), [
    _ref,
    invoke,
  ]);

  return (
    <Dialog
      {...props}
      containerClassName={classNames(props.containerClassName, 'w-52')}
      ref={setRef}
      className={classNames(
        props.className,
        'top-full w-56 transition-transform duration-300 ease-linear',
        translation
      )}
    />
  );
});

export default Toaster;
