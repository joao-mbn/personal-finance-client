import { lazy, useState } from 'react';
import { EllipsisIcon } from '..';
import { Register } from '../../models';
import { MultiActionButton, MultiActionButtonRef } from '../Base';

interface RegisterMenuProps {
  register: Register;
  onDelete: () => void;
  onEdit: (register: Register) => void;
}

const DeleteRegister = lazy(() => import('./DeleteRegister'));
const Comment = lazy(() => import('./Comment'));
const EditRegister = lazy(() => import('./EditRegister'));

export default function RegisterMenu({ register, onDelete, onEdit }: RegisterMenuProps) {
  const [ref, setRef] = useState<MultiActionButtonRef | null>(null);

  return (
    <div className="flex h-full w-full flex-col">
      <MultiActionButton
        buttonClassName="!p-0"
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
        <div className="flex flex-col gap-1 whitespace-normal break-words">
          <Comment register={register} />
          <EditRegister
            onSubmit={onEdit}
            register={register}
          />
          <DeleteRegister onDelete={onDelete} />
        </div>
      </MultiActionButton>
    </div>
  );
}
