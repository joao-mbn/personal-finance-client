import classNames from 'classnames';
import { Button, ButtonProps } from '.';

export interface DialogFooterProps {
  confirmButton: ButtonProps;
  cancelButton: ButtonProps;
  className?: string;
}

export function DialogFooter({ confirmButton, cancelButton, className }: DialogFooterProps) {
  return (
    <div className={classNames('flex h-8 justify-end gap-2 pb-1', className)}>
      <Button
        importance="secondary"
        size="small"
        {...cancelButton}
      />
      <Button
        importance="primary"
        size="small"
        {...confirmButton}
      />
    </div>
  );
}

export default DialogFooter;
