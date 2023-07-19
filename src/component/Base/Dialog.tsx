import classNames from 'classnames';
import { HTMLAttributes, forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
  containerClassName?: string;
  onClose?: (e: Event) => void;
}

type Ref = HTMLDialogElement | null;
export type DialogRef =
  | (Pick<HTMLDialogElement, 'open' | 'close'> & {
      show: () => void;
      showModal: () => void;
      setStyle: (style?: Partial<CSSStyleDeclaration>) => void;
    })
  | null;

export const Dialog = forwardRef<DialogRef, DialogProps>(function Dialog(
  { children, className, containerClassName, onClose = () => undefined }: DialogProps,
  ref
) {
  const [_ref, setRef] = useState<Ref>(null);

  // this state is needed as new ref is not sent after openning/closing.
  const [_open, setOpen] = useState(false);

  useImperativeHandle<DialogRef, DialogRef>(
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
      ref={setRef}
      className={classNames(
        'my-0 mr-auto rounded-lg p-0 opacity-0 shadow-lg shadow-hoki-900 transition-opacity duration-300',
        className,
        { 'opacity-100': _open }
      )}
      onClick={e => {
        // when dialog is open, every click on the viewport propagates to the dialog
        // but if the click was inside the child div, the target won't be the dialog.
        e.target === _ref && _ref.close();
      }}>
      <div className={classNames('rounded-lg bg-white p-2', containerClassName)}>{children}</div>
    </dialog>
  );
});

export default Dialog;
