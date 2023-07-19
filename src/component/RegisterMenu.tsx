import classNames from 'classnames';
import { useState } from 'react';
import { ptBR } from '../languages';
import { Register } from '../models';
import { MultiActionButton, MultiActionButtonProps, MultiActionButtonRef } from './Base';
import { CommentIcon, EllipsisIcon, PencilIcon, TrashBinIcon } from './Icons';

interface RegisterMenuProps {
  register: Register;
}

export default function RegisterMenu({ register }: RegisterMenuProps) {
  const [ref, setRef] = useState<MultiActionButtonRef | null>(null);

  function MultiActionButtonWrapper(props: MultiActionButtonProps) {
    return (
      <MultiActionButton
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

  return (
    <div className="flex h-full w-full flex-col">
      <MultiActionButton
        onMouseEnter={() => ref?.dialog?.showModal()}
        ref={setRef}
        size="small"
        icon={
          <EllipsisIcon
            className="w-6 fill-hoki-800 stroke-0"
            viewBox="-8 0 24 24"
          />
        }
        flat>
        <div className="flex flex-col gap-1">
          <MultiActionButtonWrapper
            containerClassName="whitespace-normal break-words max-w-[theme(spacing.40)] max-h-[theme(spacing.60)] text-hoki-800"
            disabled={!register.comments}
            label={ptBR.comment}
            icon={
              <CommentIcon
                className="w-6 stroke-0"
                viewBox="0 0.5 24 24"
              />
            }>
            {register.comments}
          </MultiActionButtonWrapper>
          <MultiActionButtonWrapper
            containerClassName="flex items-center w-10"
            dialogClassName="justify-center overflow-visible"
            label={ptBR.edit}
            showFromOrigin={false}
            icon={
              <PencilIcon
                className="w-6 stroke-0"
                viewBox="-4 -1 30 30"
              />
            }>
            a
          </MultiActionButtonWrapper>
          <MultiActionButtonWrapper
            containerClassName="flex items-center w-10"
            dialogClassName="justify-center overflow-visible"
            label={ptBR.delete}
            showFromOrigin={false}
            icon={
              <TrashBinIcon
                className="w-6 stroke-1"
                viewBox="-7 -6 46 46"
              />
            }>
            a
          </MultiActionButtonWrapper>
        </div>
      </MultiActionButton>
    </div>
  );
}
