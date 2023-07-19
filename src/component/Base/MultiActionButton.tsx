import classNames from 'classnames';
import { ReactNode, forwardRef, lazy, useImperativeHandle } from 'react';
import { Button, ButtonProps, DialogProps } from '..';
import { useShowDialogFromOrigin } from '../../hooks';
import { DialogRef } from './Dialog';

const Dialog = lazy(() => import('./Dialog'));

export interface MultiActionButtonProps
  extends Omit<ButtonProps, 'className' | 'children'>,
    Pick<DialogProps, 'containerClassName' | 'onClose' | 'footer'> {
  buttonClassName?: string;
  children: ReactNode;
  dialogClassName?: string;
  showFromOrigin?: boolean;
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
      footer,
      onClick,
      onClose,
      showFromOrigin = true,
      ...props
    }: MultiActionButtonProps,
    ref
  ) {
    const { dialogRef, buttonRef, setButtonRef, setDialogRef, showDialogFromOrigin } =
      useShowDialogFromOrigin();

    function showModal() {
      showFromOrigin ? showDialogFromOrigin() : dialogRef?.showModal();
    }

    useImperativeHandle<MultiActionButtonRef, MultiActionButtonRef>(
      ref,
      () => ({
        dialog: dialogRef ? { ...dialogRef, showModal } : null,
        button: buttonRef,
      }),
      [dialogRef, buttonRef]
    );

    return (
      <>
        <Button
          {...props}
          className={buttonClassName}
          ref={setButtonRef}
          onClick={e => {
            showModal();
            onClick?.(e);
          }}
        />
        <Dialog
          className={classNames(dialogClassName, { 'my-auto': !showFromOrigin })}
          containerClassName={containerClassName}
          footer={footer}
          onClose={onClose}
          ref={setDialogRef}>
          {children}
        </Dialog>
      </>
    );
  }
);
