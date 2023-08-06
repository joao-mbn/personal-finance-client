import { useState } from 'react';
import { ptBR } from '../../languages';
import { DialogFooter, MultiActionButtonRef } from '../Base';
import { TrashBinIcon } from '../Icons';
import { MultiActionButtonOption } from './MultiActionButtonWrapper';

interface DeleteRegisterProps {
  onDelete: () => void;
}

export default function DeleteRegister({ onDelete }: DeleteRegisterProps) {
  const [ref, setRef] = useState<MultiActionButtonRef | null>(null);

  return (
    <MultiActionButtonOption
      header={ptBR.deleteRegister}
      label={ptBR.delete}
      ref={setRef}
      showFromOrigin={false}
      footer={
        <DialogFooter
          cancelButton={{ onClick: () => ref?.dialog?.close() }}
          confirmButton={{
            className: '!justify-center',
            label: ptBR.delete,
            onClick: () => {
              onDelete();
              ref?.dialog?.close();
            },
            icon: (
              <TrashBinIcon
                className="w-6 stroke-1"
                viewBox="-6 -6 46 46"
              />
            ),
          }}
        />
      }
      icon={
        <TrashBinIcon
          className="w-6 stroke-1"
          viewBox="-7 -6 46 46"
        />
      }>
      {ptBR.deleteRegisterWarning}
    </MultiActionButtonOption>
  );
}
