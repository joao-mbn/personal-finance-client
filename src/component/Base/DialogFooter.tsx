import { Button, ButtonProps } from '.';

export interface DialogFooterProps {
  confirmButton: ButtonProps;
  cancelButton: ButtonProps;
}

export function DialogFooter({ confirmButton, cancelButton }: DialogFooterProps) {
  return (
    <div className="flex justify-end gap-2 pb-1">
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
