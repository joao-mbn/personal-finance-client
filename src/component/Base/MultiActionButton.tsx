import { ReactNode, forwardRef, lazy, useImperativeHandle } from 'react';
import { Button, ButtonProps, DialogProps } from '..';
import { useShowDialogFromOrigin } from '../../hooks';
import { DialogRef } from './Dialog';

const Dialog = lazy(() => import('./Dialog'));

export interface MultiActionButtonProps
  extends Omit<ButtonProps, 'className' | 'children'>,
    Pick<DialogProps, 'containerClassName' | 'onClose'> {
  buttonClassName?: string;
  children: ReactNode;
  dialogClassName?: string;
}

export type MultiActionButtonRef = {
  dialog: DialogRef;
  button: HTMLButtonElement | null;
};

export const MultiActionButton = forwardRef<MultiActionButtonRef, MultiActionButtonProps>(
  function MultiActionButton(
    {
      buttonClassName,
      children,
      containerClassName,
      dialogClassName,
      onClick,
      onClose,
      ...props
    }: MultiActionButtonProps,
    ref
  ) {
    const { dialogRef, buttonRef, setButtonRef, setDialogRef, showDialogFromOrigin } =
      useShowDialogFromOrigin();

    useImperativeHandle<MultiActionButtonRef, MultiActionButtonRef>(
      ref,
      () => ({ dialog: dialogRef, button: buttonRef }),
      [dialogRef, buttonRef]
    );

    return (
      <>
        <Button
          {...props}
          className={buttonClassName}
          ref={setButtonRef}
          onClick={e => {
            showDialogFromOrigin();
            onClick?.(e);
          }}
        />
        <Dialog
          className={dialogClassName}
          containerClassName={containerClassName}
          onClose={onClose}
          ref={setDialogRef}>
          {children}
        </Dialog>
      </>
    );
  }
);
