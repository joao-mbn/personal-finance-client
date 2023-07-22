import { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { PencilIcon } from '..';
import { RegisterContext } from '../../contexts';
import { ptBR } from '../../languages';
import { Register, RegisterForm } from '../../models';
import { toBRL } from '../../utils';
import {
  Autocomplete,
  DatePicker,
  DialogFooter,
  Input,
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
    type: typeOptions.find(opt => opt.value === register.type) ?? {
      value: register.type,
      key: crypto.randomUUID(),
    },
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

  const firstNumericDigitAtValueInput = 3;
  const selectionEndRef = useRef<number>(firstNumericDigitAtValueInput);
  const valueInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const selection = selectionEndRef.current;
    valueInputRef.current?.setSelectionRange(selection, selection);
  }, [value]);

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
          <label className="w-2/3">
            {ptBR.value}
            <div className="flex">
              <Input
                className="w-full"
                inputSize="small"
                placeholder={ptBR.placeholderValue}
                ref={valueInputRef}
                value={toBRL(value)}
                onChange={event => {
                  const isNegative = event.target.value.startsWith('-');
                  const valueStrippedOfNonDigits = event.target.value.replace(/[^\d]/g, '');
                  const newValue = (Number(valueStrippedOfNonDigits) / 100) * (isNegative ? -1 : 1);
                  dispatch({ type: 'value', newValue });

                  selectionEndRef.current = Math.max(
                    firstNumericDigitAtValueInput,
                    event.target.selectionEnd ?? 0
                  );
                }}
                required
              />
            </div>
          </label>
          <label className="w-1/3">
            {value > 0 ? ptBR.earning : value < 0 ? ptBR.expense : <br />}
            <Toggle
              isActive={value > 0}
              onClick={() => dispatch({ type: 'value', newValue: value * -1 })}
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
            value={timestamp}
            yearDropdownProps={{ className: 'w-full' }}
          />
        </div>
        <label>
          {value > 0 ? ptBR.destination : ptBR.source}
          <Autocomplete
            inputProps={{ required: true, minLength: 3, maxLength: 30 }}
            onChange={value => dispatch({ type: 'target', newValue: value })}
            options={targetOptions}
            placeholder={ptBR.placeholderTarget}
            value={target}
          />
        </label>
        <label>
          {ptBR.type}
          <Autocomplete
            inputProps={{ maxLength: 30 }}
            onChange={value => dispatch({ type: 'type', newValue: value })}
            options={typeOptions}
            placeholder={ptBR.placeholderType}
            value={type}
          />
        </label>
        <label>
          {ptBR.comment}
          <TextArea
            inputSize="small"
            maxLength={200}
            onChange={event => dispatch({ type: 'comments', newValue: event.target.value })}
            placeholder={ptBR.placeholderComment}
            value={comments}
          />
        </label>
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
