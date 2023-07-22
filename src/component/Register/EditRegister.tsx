import { useContext, useReducer } from 'react';
import { PencilIcon } from '..';
import { RegisterContext } from '../../contexts';
import { ptBR } from '../../languages';
import { Register, RegisterForm } from '../../models';
import { Autocomplete, DatePicker, DialogFooter, Input, TextArea, Toggle } from '../Base';
import { MultiActionButtonWrapper } from './MultiActionButtonWrapper';

interface EditRegisterProps {
  onSubmit: (register: Register) => void;
  register: Register;
}

function reducer(
  state: RegisterForm,
  action: { type: keyof RegisterForm; newValue: RegisterForm[keyof Register] }
) {
  const { type, newValue } = action;
  return { ...state, [type]: newValue };
}

export default function EditRegister({ onSubmit, register }: EditRegisterProps) {
  const { targetOptions, typeOptions } = useContext(RegisterContext);
  const initialForm: RegisterForm = {
    ...register,
    type: typeOptions.find(opt => opt.value === register.type) ?? {
      value: register.type,
      key: crypto.randomUUID(),
    },
    target: targetOptions.find(opt => opt.value === register.target) ?? {
      value: register.target,
      key: crypto.randomUUID(),
    },
  };

  const [formState, dispatch] = useReducer(reducer, initialForm);

  return (
    <MultiActionButtonWrapper
      header={ptBR.editRegister}
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
        <div>
          {ptBR.date}
          <DatePicker
            className="gap-4"
            monthDropdownProps={{ className: 'w-full' }}
            onChange={value => dispatch({ type: 'timestamp', newValue: value })}
            value={formState.timestamp}
            yearDropdownProps={{ className: 'w-full' }}
          />
        </div>
        <label>
          {formState.value > 0 ? ptBR.destination : ptBR.source}
          <Autocomplete
            onChange={value => dispatch({ type: 'target', newValue: value })}
            options={targetOptions}
            value={formState.target}
          />
        </label>
        <label>
          {ptBR.type}
          <Autocomplete
            onChange={value => dispatch({ type: 'type', newValue: value })}
            options={typeOptions}
            value={formState.type}
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
