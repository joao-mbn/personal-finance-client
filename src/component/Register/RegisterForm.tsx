import { forwardRef, useImperativeHandle } from 'react';
import { ptBR } from '../../languages';
import { Register } from '../../models';
import { Autocomplete, CurrencyInput, DatePicker, DialogFooter, TextArea, Toggle } from '../Base';
import { useRegisterForm } from './useRegisterForm';

interface RegisterFormProps {
  onSubmit: (register: Register) => void;
  onCancel: () => void;
  register: Register;
}

export interface RegisterFormRef {
  reset: () => void;
}

export const RegisterFormComponent = forwardRef<RegisterFormRef, RegisterFormProps>(
  function RegisterFormComponent({ onSubmit, onCancel, register }, ref) {
    const { formState, dispatch, targetOptions, typeOptions } = useRegisterForm(register);
    const { target, timestamp, type, value, comments } = formState;

    useImperativeHandle<RegisterFormRef, RegisterFormRef>(
      ref,
      () => ({ reset: () => dispatch({ type: 'reset' }) }),
      []
    );

    return (
      <form
        className="flex w-60 flex-col gap-4"
        onSubmit={event => {
          event.preventDefault();
          const { type, target } = formState;
          onSubmit({ ...formState, type: type?.value, target: target.value });
        }}>
        <div className="flex gap-4">
          <div className="flex flex-col">
            {ptBR.value}
            <CurrencyInput
              className="w-full"
              inputSize="small"
              onChange={newValue => dispatch({ type: 'value', newValue })}
              placeholder={ptBR.placeholderValue}
              value={value}
              required
            />
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
          cancelButton={{ type: 'button', onClick: onCancel }}
          confirmButton={{ type: 'submit' }}
        />
      </form>
    );
  }
);
