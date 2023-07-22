import { useState } from 'react';
import { PencilIcon } from '..';
import { ptBR } from '../../languages';
import { Register } from '../../models';
import { Autocomplete, DialogFooter, Input, MultiActionButtonRef, TextArea, Toggle } from '../Base';
import { MultiActionButtonWrapper } from './MultiActionButtonWrapper';

interface EditRegisterProps {
  onSubmit: (register: Register) => void;
  register: Register;
}

export default function EditRegister({ onSubmit, register }: EditRegisterProps) {
  const [ref, setRef] = useState<MultiActionButtonRef | null>(null);

  return (
    <MultiActionButtonWrapper
      label={ptBR.edit}
      showFromOrigin={false}
      icon={
        <PencilIcon
          className="w-6 stroke-0"
          viewBox="-4 -1 30 30"
        />
      }>
      <form className="flex flex-col gap-4">
        <div className="flex gap-1">
          <Input
            className="w-2/3"
            inputSize="small"
            onChange={event => {
              // value
            }}
          />
          <Toggle
            className="w-1/3"
            isActive={false}
            type="button"
            onClick={() => {
              //
            }}
          />
        </div>
        <Autocomplete
          options={[]}
          onChange={(value, event) => {
            // source
          }}
        />
        <Autocomplete
          options={[]}
          onChange={(value, event) => {
            // type
          }}
        />
        <TextArea inputSize="small" />
        <DialogFooter
          cancelButton={{ formMethod: 'dialog', label: ptBR.cancel }}
          confirmButton={{ label: ptBR.confirm, type: 'button' }}
        />
      </form>
    </MultiActionButtonWrapper>
  );
}
