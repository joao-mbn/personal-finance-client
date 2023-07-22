import { useReducer, useState } from 'react';
import { PencilIcon } from '..';
import { ptBR } from '../../languages';
import { Register } from '../../models';
import { Autocomplete, DialogFooter, Input, MultiActionButtonRef, TextArea, Toggle } from '../Base';
import { MultiActionButtonWrapper } from './MultiActionButtonWrapper';

interface EditRegisterProps {
  onSubmit: (register: Register) => void;
  register: Register;
}

function reducer(
  state: Register,
  action: { type: keyof Register; newValue: Register[keyof Register] }
) {
  const { type, newValue } = action;
  return { ...state, [type]: newValue };
}

export default function EditRegister({ onSubmit, register }: EditRegisterProps) {
  const [ref, setRef] = useState<MultiActionButtonRef | null>(null);

  const [formState, dispatch] = useReducer(reducer, register);

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
      <form className="flex w-60 flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-2/3">
            {ptBR.value}
            <Input
              className="w-full"
              inputSize="small"
              onChange={event => dispatch({ type: 'value', newValue: event.target.value })}
              value={formState.value}
            />
          </label>

          <label className="w-1/3">
            {formState.value > 0 ? ptBR.earning : ptBR.expense}
            <Toggle
              isActive={formState.value > 0}
              onClick={() => dispatch({ type: 'value', newValue: formState.value * -1 })}
              type="button"
            />
          </label>
        </div>
        <label>
          {formState.value > 0 ? ptBR.destination : ptBR.source}
          <Autocomplete
            options={[]}
            onChange={(value, event) => {
              // source
            }}
          />
        </label>
        <label>
          {ptBR.type}
          <Autocomplete
            options={[]}
            onChange={(value, event) => {
              // type
            }}
          />
        </label>
        <label>
          {ptBR.comment}
          <TextArea
            inputSize="small"
            onChange={event => dispatch({ type: 'comments', newValue: event.target.value })}
            value={formState.comments}
          />
        </label>
        <DialogFooter
          cancelButton={{ formMethod: 'dialog', label: ptBR.cancel }}
          confirmButton={{ label: ptBR.confirm, type: 'button' }}
        />
      </form>
    </MultiActionButtonWrapper>
  );
}
