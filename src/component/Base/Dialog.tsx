import classNames from 'classnames';
import { HTMLAttributes, forwardRef, useEffect, useImperativeHandle, useState } from 'react';

interface OverLayProps extends HTMLAttributes<HTMLDialogElement> {
  containerClassName?: string;
  onClose?: (e: Event) => void;
}

type Ref = HTMLDialogElement | null;
export type DialogForwardedRef =
  | (Pick<HTMLDialogElement, 'open' | 'close'> & {
      show: () => void;
      showModal: () => void;
      setStyle: (style?: Partial<CSSStyleDeclaration>) => void;
    })
  | null;

export const Dialog = forwardRef<DialogForwardedRef, OverLayProps>(function Dialog(
  { children, className, containerClassName, onClose = () => undefined }: OverLayProps,
  ref
) {
  const [_ref, setRef] = useState<Ref>(null);

  // this state is needed as new ref is not sent after openning/closing.
  const [_open, setOpen] = useState(false);

  useImperativeHandle<DialogForwardedRef, DialogForwardedRef>(
    ref,
    () =>
      _ref
        ? {
            showModal: () => {
              _ref.showModal();
              setOpen(true);
            },
            show: () => {
              _ref.show();
              setOpen(true);
            },
            close: () => _ref.close(),
            open: _open,
            setStyle: style => Object.assign(_ref.style, style),
          }
        : null,
    [_ref, _open]
  );

  useEffect(() => {
    if (!_ref) return;

    function _onClose(e: Event) {
      onClose(e);
      setOpen(false);
    }

    _ref.addEventListener('close', _onClose);
    return () => _ref.removeEventListener('close', _onClose);
  }, [_ref]);

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
          'h-full w-32 rounded-lg bg-slate-50 p-2 text-slate-600 opacity-0 shadow-lg shadow-slate-500 transition-opacity duration-300',
          containerClassName,
          { 'opacity-100': _open }
        )}>
        {children}
      </div>
    </dialog>
  );
});

export default Dialog;
