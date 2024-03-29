import classNames from 'classnames';
import {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

export interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
  containerClassName?: string;
  footer?: ReactNode;
  header?: ReactNode;
  headerClassName?: string;
  onClose?: (e: Event) => void;
}

type Ref = HTMLDialogElement | null;
export type DialogRef =
  | (Pick<HTMLDialogElement, 'close'> & {
      show: () => void;
      showModal: () => void;
      setStyle: (style?: Partial<CSSStyleDeclaration>) => void;
    })
  | null;

export const Dialog = forwardRef<DialogRef, DialogProps>(function Dialog(
  {
    children,
    className,
    containerClassName,
    footer,
    header,
    headerClassName,
    onClose,
    ...props
  }: DialogProps,
  ref
) {
  const [_ref, setRef] = useState<Ref>(null);

  // this state is needed as new ref is not sent after openning/closing.
  // if this property needs to be passed into the ref, a solution for hindering infinite loops for the Toaster will have to be thought.
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
            setStyle: style => Object.assign(_ref.style, style),
          }
        : null,
    [_ref]
  );

  useEffect(() => {
    if (!_ref) return;

    function _onClose(e: Event) {
      onClose?.(e);
      setOpen(false);
    }

    _ref.addEventListener('close', _onClose);
    return () => _ref.removeEventListener('close', _onClose);
  }, [_ref, onClose]);

  return (
    <dialog
      {...props}
      ref={setRef}
      className={classNames(
        'my-0 mr-auto rounded-lg p-0 shadow-lg shadow-hoki-900 transition-opacity duration-300',
        className,
        { 'opacity-100': _open, 'opacity-0': !_open }
      )}
      onClick={e => {
        // when dialog is open, every click on the viewport propagates to the dialog
        // but if the click was inside the child div, the target won't be the dialog.
        e.target === _ref && _ref.close();
      }}>
      {_open ? (
        <div
          className={classNames(
            'flex flex-col gap-2 rounded-lg bg-white p-2 text-hoki-800',
            containerClassName
          )}>
          {header && (
            <h1
              className={classNames(
                headerClassName,
                'mb-1 w-full border-b-2 border-b-cerulean-600 pb-1 text-sm font-bold text-hoki-600'
              )}>
              {header}
            </h1>
          )}
          {children}
          {footer && <footer className="mt-auto pt-1">{footer}</footer>}
        </div>
      ) : null}
    </dialog>
  );
});

export default Dialog;
