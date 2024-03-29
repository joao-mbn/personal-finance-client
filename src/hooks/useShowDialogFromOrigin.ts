import { useCallback, useState } from 'react';
import { DialogRef } from '../component';
import { useAppContext } from '../contexts';
import { REM_PX_RATIO } from '../utils';

/**
 * A hook to make the dialog pop-up relative to the button clicked for it to appear.
 * @returns
 * `setButtonRef` to be passed to the Button Ref.
 * `setDialogRef` to be passed to the Dialog Ref.
 * `showDialogFromOrigin` to be called when the Button is clicked.
 */
export const useShowDialogFromOrigin = () => {
  const [dialogRef, setDialogRef] = useState<DialogRef>(null);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const {
    viewport: { vh, vw },
  } = useAppContext();

  const showDialogFromOrigin = useCallback(() => {
    if (!dialogRef || !buttonRef) return;

    const {
      left: buttonLeft,
      bottom: buttonBottom,
      top: buttonTop,
    } = buttonRef.getBoundingClientRect();
    const maxButtonDistanceToBottom = 6 * REM_PX_RATIO;

    let top: string;
    if (vh - buttonTop > maxButtonDistanceToBottom) {
      top = `${buttonBottom}px`;
    } else {
      top = `${buttonTop - maxButtonDistanceToBottom - 12}px`;
    }
    const marginRight = `${vw - buttonLeft}px`;

    dialogRef.setStyle({ top, marginRight });
    dialogRef.showModal();
  }, [buttonRef, dialogRef, vh, vw]);

  return { buttonRef, dialogRef, setButtonRef, setDialogRef, showDialogFromOrigin };
};
