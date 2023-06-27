import classNames from 'classnames';
import { HTMLAttributes, forwardRef } from 'react';

interface OverLayProps extends HTMLAttributes<HTMLDialogElement> {}

export const Overlay = forwardRef<HTMLDialogElement, OverLayProps>(function Overlay(
  { children, className }: OverLayProps,
  ref
) {
  return (
    <dialog
      ref={ref}
      className={classNames(
        'absolute mx-0 my-0 w-full rounded-lg bg-slate-50 p-2 text-slate-600 shadow-lg shadow-slate-400',
        className
      )}>
      {children}
    </dialog>
  );
});
