import { ReactNode, lazy } from 'react';
import { Button, ButtonProps, DialogProps } from '..';
import { useShowDialogFromOrigin } from '../../hooks';

const Dialog = lazy(() => import('./Dialog'));

export interface MultiActionButtonProps
  extends Pick<ButtonProps, 'icon' | 'onClick' | 'size' | 'label'>,
    Pick<DialogProps, 'containerClassName' | 'onClose'> {
  buttonClassName?: string;
  children: ReactNode;
  dialogClassName?: string;
}

export function MultiActionButton({
  buttonClassName,
  children,
  containerClassName,
  dialogClassName,
  icon,
  label,
  onClick,
  onClose,
  size,
}: MultiActionButtonProps) {
  const { setButtonRef, setDialogRef, showDialogFromOrigin } = useShowDialogFromOrigin();

  return (
    <>
      <Button
        className={buttonClassName}
        icon={icon}
        label={label}
        ref={setButtonRef}
        size={size}
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
