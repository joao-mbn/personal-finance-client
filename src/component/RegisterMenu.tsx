import classNames from 'classnames';
import { ptBR } from '../languages';
import { Registry } from '../models';
import { MultiActionButton, MultiActionButtonProps } from './Base';
import { CommentIcon, EllipsisIcon, PencilIcon, TrashBinIcon } from './Icons';

interface RegisterMenuProps {
  register: Registry;
}

const removeButtonShadow = 'shadow-none hover:shadow-none active:shadow-none';

export default function RegisterMenu({ register }: RegisterMenuProps) {
  return (
    <div className="flex w-full flex-col">
      <MultiActionButton
        buttonClassName={removeButtonShadow}
        dialogClassName="justify-center overflow-visible"
        size="small"
        icon={
          <EllipsisIcon
            className="w-6 fill-hoki-800 stroke-0"
            viewBox="-8 0 24 24"
          />
        }>
        <div className="flex flex-col gap-1">
          <MultiActionButtonWrapper
            containerClassName="flex items-center w-10"
            dialogClassName="justify-center overflow-visible"
            label={ptBR.comment}
            icon={
              <CommentIcon
                className="w-6 stroke-0"
                viewBox="0 0.5 24 24"
              />
            }>
            a
          </MultiActionButtonWrapper>
          <MultiActionButtonWrapper
            containerClassName="flex items-center w-10"
            dialogClassName="justify-center overflow-visible"
            label={ptBR.edit}
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

function MultiActionButtonWrapper(props: MultiActionButtonProps) {
  return (
    <MultiActionButton
      label={ptBR.comment}
      size="small"
      buttonClassName={classNames(
        removeButtonShadow,
        'h-8 stroke-1 flex gap-1 rounded-md p-1 text-xs fill-hoki-600 stroke-hoki-600 text-hoki-600 hover:bg-cerulean-100 hover:fill-cerulean-800 hover:stroke-cerulean-800 hover:text-cerulean-800'
      )}
      {...props}
    />
  );
}
