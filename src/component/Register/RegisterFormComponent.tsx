import { forwardRef, useContext, useImperativeHandle } from 'react';
import { RegisterContext } from '../../contexts';
import { ptBR } from '../../languages';
import { AutocompleteOption, Register, RegisterForm } from '../../models';
import { Autocomplete, CurrencyInput, DatePicker, DialogFooter, TextArea, Toggle } from '../Base';
import { Controller } from '../Form/Controller';
import { useRegisterForm } from './useRegisterForm';

interface RegisterFormProps {
  onSubmit: (register: Register) => void;
  onCancel: () => void;
  register: Register;
}

export interface RegisterFormRef {
  reset: () => void;
}

export const RegisterFormComponentCopy = forwardRef<RegisterFormRef, RegisterFormProps>(
  function RegisterFormComponentCopy({ onSubmit, onCancel, register }, ref) {
    const { targetOptions, typeOptions } = useContext(RegisterContext);
    const { formState, reset, getValues, setValue, Form } = useRegisterForm(register);

    const value = formState.value.currentValue as number;

    useImperativeHandle<RegisterFormRef, RegisterFormRef>(ref, () => ({ reset }), []);

    return (
      <Form
        className="flex w-60 flex-col gap-4"
        onSubmit={event => {
          event.preventDefault();
          const { type, target, ...rest } = getValues();
          onSubmit({ ...rest, type: type?.value, target: target.value });
        }}>
        <div className="flex gap-4">
          <div className="flex flex-col">
            {ptBR.value}
            <Controller<RegisterForm, 'value'>
              field="value"
              render={({ currentValue }, onChange) => (
                <CurrencyInput
                  className="w-full"
                  inputSize="small"
                  onChange={onChange}
                  placeholder={ptBR.placeholderValue}
                  value={currentValue as number}
                  required
                />
              )}
            />
          </div>
          <div className="flex flex-col">
            {value > 0 ? ptBR.earning : value < 0 ? ptBR.expense : <br />}
            <Toggle
              isActive={value > 0}
              onClick={() => setValue('value', value * -1)}
              type="button"
            />
          </div>
        </div>
        <div>
          {ptBR.date}
          <Controller<RegisterForm>
            field="timestamp"
            render={({ currentValue }, onChange) => (
              <DatePicker
                className="gap-4"
                monthDropdownProps={{ className: 'w-full' }}
                onChange={onChange}
                value={currentValue as Date}
                yearDropdownProps={{ className: 'w-full' }}
              />
            )}
          />
        </div>
        <div className="flex flex-col">
          {value > 0 ? ptBR.destination : ptBR.source}
          <Controller<RegisterForm>
            field="target"
            render={({ currentValue }, onChange) => (
              <Autocomplete
                inputProps={{ required: true, minLength: 3, maxLength: 30 }}
                onChange={onChange}
                options={targetOptions}
                placeholder={ptBR.placeholderTarget}
                value={currentValue as AutocompleteOption}
              />
            )}
          />
        </div>
        <div className="flex flex-col">
          {ptBR.type}
          <Controller<RegisterForm>
            field="type"
            render={({ currentValue }, onChange) => (
              <Autocomplete
                inputProps={{ maxLength: 30 }}
                onChange={onChange}
                options={typeOptions}
                placeholder={ptBR.placeholderType}
                value={currentValue as AutocompleteOption}
              />
            )}
          />
        </div>
        <div className="flex flex-col">
          {ptBR.comment}
          <Controller<RegisterForm>
            field="comments"
            render={({ currentValue }, onChange) => (
              <TextArea
                inputSize="small"
                maxLength={200}
                placeholder={ptBR.placeholderComment}
                value={currentValue as string}
                onChange={event => {
                  onChange(event.target.value);
                }}
              />
            )}
          />
        </div>
        <DialogFooter
          cancelButton={{ type: 'button', onClick: onCancel }}
          confirmButton={{ type: 'submit' }}
        />
      </Form>
    );
  }
);

export default RegisterFormComponentCopy;
