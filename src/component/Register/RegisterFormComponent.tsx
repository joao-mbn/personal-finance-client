import { forwardRef, useContext, useImperativeHandle } from 'react';
import { RegisterContext } from '../../contexts';
import { ptBR } from '../../languages';
import { Register, RegisterForm } from '../../models';
import { Autocomplete, CurrencyInput, DatePicker, DialogFooter, TextArea, Toggle } from '../Base';
import { Controller } from '../Form/Controller';
import { FormComponent } from '../Form/FormComponent';
import { useRegisterForm } from './useRegisterForm';

interface RegisterFormProps {
  onSubmit: (register: Register) => void;
  onCancel: () => void;
  register?: Register;
}

export interface RegisterFormRef {
  reset: () => void;
}

export const RegisterFormComponentCopy = forwardRef<RegisterFormRef, RegisterFormProps>(
  function RegisterFormComponentCopy({ onSubmit, onCancel, register }, ref) {
    const { targetOptions, typeOptions } = useContext(RegisterContext);
    const formProps = useRegisterForm(register);
    const { setValue, state, reset } = formProps;
    const { target, type, timestamp, value, comments } = state;

    useImperativeHandle<RegisterFormRef, RegisterFormRef>(ref, () => ({ reset }), []);

    return (
      <FormComponent
        className="flex w-60 flex-col gap-4 text-xs"
        formProps={formProps}
        onSubmit={event => {
          event.preventDefault();
          onSubmit({ ...state, type: type?.value, target: target.value });
        }}>
        <Controller<RegisterForm, 'value'>
          field="value"
          validator={value => value !== 0}
          render={({ isDirty, isValid }, onChange) => (
            <div className="flex gap-4">
              <div className="flex flex-col">
                {ptBR.value}
                <CurrencyInput
                  className="w-full"
                  inputSize="small"
                  onChange={onChange}
                  placeholder={ptBR.placeholderValue}
                  value={value as number}
                  required
                />
              </div>
              <div className="flex w-2/5 flex-col">
                {value >= 0 ? ptBR.earning : ptBR.expense}
                <Toggle
                  disabled={value === 0}
                  isActive={value > 0}
                  onClick={() => setValue('value', value * -1)}
                  type="button"
                />
              </div>
            </div>
          )}
        />
        <Controller<RegisterForm, 'timestamp'>
          field="timestamp"
          render={({ isDirty, isValid }, onChange) => (
            <div>
              {ptBR.date}
              <DatePicker
                className="gap-4"
                monthDropdownProps={{ className: 'w-full' }}
                onChange={onChange}
                value={timestamp}
                yearDropdownProps={{ className: 'w-full' }}
              />
            </div>
          )}
        />
        <Controller<RegisterForm, 'target'>
          field="target"
          render={({ isDirty, isValid }, onChange) => (
            <div className="flex flex-col">
              {value >= 0 ? ptBR.destination : ptBR.source}
              <Autocomplete
                inputProps={{ required: true, minLength: 3, maxLength: 30 }}
                onChange={onChange}
                options={targetOptions}
                placeholder={ptBR.placeholderTarget}
                value={target}
              />
            </div>
          )}
        />
        <Controller<RegisterForm, 'type'>
          field="type"
          render={({ isDirty, isValid }, onChange) => (
            <div className="flex flex-col">
              {ptBR.type}
              <Autocomplete
                inputProps={{ maxLength: 30 }}
                onChange={onChange}
                options={typeOptions}
                placeholder={ptBR.placeholderType}
                value={type}
              />
            </div>
          )}
        />
        <Controller<RegisterForm, 'comments'>
          field="comments"
          render={({ isDirty, isValid }, onChange) => (
            <div className="flex flex-col">
              {ptBR.comment}
              <TextArea
                inputSize="small"
                maxLength={200}
                onChange={event => onChange(event.target.value)}
                placeholder={ptBR.placeholderComment}
                value={comments}
              />
            </div>
          )}
        />
        <DialogFooter
          cancelButton={{ type: 'button', onClick: onCancel }}
          confirmButton={{ type: 'submit' }}
        />
      </FormComponent>
    );
  }
);

export default RegisterFormComponentCopy;
