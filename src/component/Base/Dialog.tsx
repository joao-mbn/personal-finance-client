import classNames from 'classnames';
import { HTMLAttributes, forwardRef, useImperativeHandle, useState } from 'react';

interface OverLayProps extends HTMLAttributes<HTMLDialogElement> {
  containerClassName?: string;
}

type Ref = HTMLDialogElement | null;

export const Dialog = forwardRef<Ref, OverLayProps>(function Dialog(
  { children, className, containerClassName }: OverLayProps,
  ref
) {
  const [_ref, setRef] = useState<HTMLDialogElement | null>(null);
  useImperativeHandle<Ref, Ref>(ref, () => _ref, [_ref]);

  return (
    <dialog
      className={classNames('my-0 mr-auto rounded-lg p-0', className)}
      ref={setRef}
      onClick={e => {
        // when dialog is open, every click on the viewport propagates to the dialog
        // but if the click was inside the child div, the target won't be the dialog.
        e.target === _ref && _ref.close();
      }}>
      <div
        className={classNames(
          'h-full w-32 rounded-lg bg-slate-50 p-2 text-slate-600 shadow-lg shadow-slate-500',
          containerClassName
        )}>
        {children}
      </div>
    </dialog>
  );
});

export default Dialog;
