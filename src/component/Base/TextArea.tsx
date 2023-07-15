import classNames from 'classnames';
import { TextareaHTMLAttributes, forwardRef, useImperativeHandle, useState } from 'react';
import { DragIcon } from '../Icons';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputSize: 'small' | 'medium' | 'large';
}

type Ref = HTMLTextAreaElement | null;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function Input(
  { className, inputSize, disabled, ...props }: TextAreaProps,
  ref
) {
  const [_ref, setRef] = useState<Ref>(null);
  useImperativeHandle<Ref, Ref>(ref, () => _ref, [_ref]);

  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-hoki-300 hover:border-cerulean-600 focus:border-cerulean-800 focus:shadow-inner active:border-cerulean-800 active:shadow-inner">
      <textarea
        {...props}
        disabled={disabled}
        onChange={e => !disabled && props.onChange?.(e)}
        ref={setRef}
        className={classNames(
          className,
          'flex w-full resize-none items-center rounded-t-2xl bg-white text-hoki-800 disabled:bg-hoki-50 disabled:text-hoki-800/40',
          {
            'shadow shadow-hoki-200 transition-shadow  ': !disabled,
            'min-h-[theme(spacing.12)] px-3 py-1 text-xs': inputSize === 'small',
            'min-h-[theme(spacing.16)] px-3 py-1.5 text-sm': inputSize === 'medium',
            'min-h-[theme(spacing.20)] px-3 py-2 text-base': inputSize === 'large',
          }
        )}
      />
      <div
        className={classNames('flex h-2 w-full touch-none flex-col items-center', {
          'bg-hoki-100 fill-hoki-400': disabled,
          'hover:cursor-row-resize hover:bg-cerulean-600 hover:fill-white': !disabled,
          'bg-hoki-200 fill-hoki-800': !isDragging && !disabled,
          '!bg-cerulean-800 fill-white': isDragging,
        })}
        onMouseDown={e => {
          if (disabled || !_ref) return;
          const divHeight = e.currentTarget.getBoundingClientRect().height;
          const textarea = _ref;

          setIsDragging(true);

          window.addEventListener('mousemove', doDrag);
          window.addEventListener('mouseup', stopDrag);

          function doDrag(e: MouseEvent) {
            textarea.style.height = `${
              e.clientY - textarea.getBoundingClientRect().y - divHeight
            }px`;
          }

          function stopDrag() {
            setIsDragging(false);
            window.removeEventListener('mousemove', doDrag);
            window.removeEventListener('mouseup', stopDrag);
          }
        }}
        onTouchStart={e => {
          if (disabled || !_ref) return;
          const divHeight = e.currentTarget.getBoundingClientRect().height;
          const textarea = _ref;

          setIsDragging(true);

          window.addEventListener('touchmove', doDrag);
          window.addEventListener('touchend', stopDrag);

          function doDrag(e: TouchEvent) {
            textarea.style.height = `${
              e.touches[0].clientY - textarea.getBoundingClientRect().y - divHeight
            }px`;
          }

          function stopDrag() {
            setIsDragging(false);
            window.removeEventListener('touchmove', doDrag);
            window.removeEventListener('touchend', stopDrag);
          }
        }}>
        <DragIcon
          className={classNames('h-2.5 w-2.5 rotate-90')}
          viewBox="0 0 1900 1900"
        />
      </div>
    </div>
  );
});
