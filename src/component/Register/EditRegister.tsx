import { useCallback, useContext, useReducer, useState } from 'react';
import { PencilIcon } from '..';
import { RegisterContext } from '../../contexts';
import { ptBR } from '../../languages';
import { Register, RegisterForm } from '../../models';
import {
  Autocomplete,
  CurrencyInput,
  DatePicker,
  DialogFooter,
  MultiActionButtonRef,
  TextArea,
  Toggle,
} from '../Base';
import { MultiActionButtonWrapper } from './MultiActionButtonWrapper';

interface EditRegisterProps {
  onSubmit: (register: Register) => void;
  register: Register;
}

export default function EditRegister({ onSubmit, register }: EditRegisterProps) {
  const { targetOptions, typeOptions } = useContext(RegisterContext);
  const initialForm: RegisterForm = {
    ...register,
    type: register.type
      ? typeOptions.find(opt => opt.value === register.type) ?? {
          value: register.type,
          key: crypto.randomUUID(),
        }
      : undefined,
    target: targetOptions.find(opt => opt.value === register.target) ?? {
      value: register.target,
      key: crypto.randomUUID(),
    },
  };

  const reducer = useCallback(
    (
      state: RegisterForm,
      action:
        | { type: keyof RegisterForm; newValue: RegisterForm[keyof Register] }
        | { type: 'reset' }
    ) => {
      const { type } = action;
      if (type === 'reset') return initialForm;

      const { newValue } = action;
      return { ...state, [type]: newValue };
    },
    []
  );

  const [formState, dispatch] = useReducer(reducer, initialForm);
  const { target, timestamp, type, value, comments } = formState;

  const [ref, setRef] = useState<MultiActionButtonRef | null>(null);

  return (
    <MultiActionButtonWrapper
      header={ptBR.editRegister}
      label={ptBR.edit}
      ref={setRef}
      showFromOrigin={false}
      icon={
        <PencilIcon
          className="w-6 stroke-0"
          viewBox="-4 -1 30 30"
        />
      }>
      <form className="flex w-60 flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col">
            {ptBR.value}
            <div className="flex">
              <CurrencyInput
                className="w-full"
                inputSize="small"
                onChange={newValue => dispatch({ type: 'value', newValue })}
                placeholder={ptBR.placeholderValue}
                value={value}
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            {value > 0 ? ptBR.earning : value < 0 ? ptBR.expense : <br />}
            <Toggle
              isActive={value > 0}
              onClick={() => dispatch({ type: 'value', newValue: value * -1 })}
              type="button"
            />
          </div>
        </div>
        <div>
          {ptBR.date}
          <DatePicker
            className="gap-4"
            monthDropdownProps={{ className: 'w-full' }}
            onChange={value => dispatch({ type: 'timestamp', newValue: value })}
            value={timestamp}
            yearDropdownProps={{ className: 'w-full' }}
          />
        </div>
        <div className="flex flex-col">
          {value > 0 ? ptBR.destination : ptBR.source}
          <Autocomplete
            inputProps={{ required: true, minLength: 3, maxLength: 30 }}
            onChange={value => dispatch({ type: 'target', newValue: value })}
            options={targetOptions}
            placeholder={ptBR.placeholderTarget}
            value={target}
          />
        </div>
        <div className="flex flex-col">
          {ptBR.type}
          <Autocomplete
            inputProps={{ maxLength: 30 }}
            onChange={value => dispatch({ type: 'type', newValue: value })}
            options={typeOptions}
            placeholder={ptBR.placeholderType}
            value={type}
          />
        </div>
        <div className="flex flex-col">
          {ptBR.comment}
          <TextArea
            inputSize="small"
            maxLength={200}
            onChange={event => dispatch({ type: 'comments', newValue: event.target.value })}
            placeholder={ptBR.placeholderComment}
            value={comments}
          />
        </div>
        <DialogFooter
          cancelButton={{
            label: ptBR.cancel,
            type: 'button',
            onClick: () => {
              ref?.dialog?.close();
              dispatch({ type: 'reset' });
            },
          }}
          confirmButton={{
            label: ptBR.confirm,
            type: 'button',
            onClick: () => ref?.dialog?.close(),
          }}
        />
      </form>
    </MultiActionButtonWrapper>
  );
}
