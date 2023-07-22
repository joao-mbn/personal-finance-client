import classNames from 'classnames';
import { forwardRef } from 'react';
import { MultiActionButton, MultiActionButtonProps, MultiActionButtonRef } from '../Base';

export const MultiActionButtonWrapper = forwardRef<MultiActionButtonRef, MultiActionButtonProps>(
  function MultiActionButtonWrapper(props: MultiActionButtonProps, ref) {
    return (
      <MultiActionButton
        ref={ref}
        size="small"
        buttonClassName={classNames(
          'h-8 stroke-1 flex gap-1 rounded-md p-1 text-xs fill-hoki-600 stroke-hoki-600 text-hoki-600',
          {
            'hover:bg-cerulean-100 hover:fill-cerulean-800 hover:stroke-cerulean-800 hover:text-cerulean-800':
              !props.disabled,
          }
        )}
        flat
        {...props}
      />
    );
  }
);

export default MultiActionButtonWrapper;
