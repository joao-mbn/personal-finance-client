import classNames from 'classnames';
import { forwardRef, useImperativeHandle } from 'react';
import { useRegisterContext } from '../../contexts';
import { ptBR } from '../../languages';
import { AutocompleteOption, Register, RegisterForm } from '../../models';
import { DialogFooter, Toggle } from '../Base';
import {
  ControlledAutocomplete,
  ControlledCurrencyInput,
  ControlledDatePicker,
  ControlledTextArea,
  FieldCheckers,
  FormComponent,
} from '../Form';
import { useRegisterForm } from './useRegisterForm';

interface RegisterFormProps {
  onSubmit: (register: Register) => void;
  onCancel: () => void;
  register?: Register;
}

export interface RegisterFormRef {
  reset: () => void;
}

const REGISTER_OPTION_MIN_LENGTH = 3;
const REGISTER_OPTION_MAX_LENGTH = 30;
const REGISTER_COMMENT_MAX_LENGTH = 200;

type T = Omit<RegisterForm, 'id'>;
const checkers: { [K in keyof T]: FieldCheckers<T, K> } = {
  value: {
    validator: (value: number) => value !== 0,
  },
  timestamp: {
    validator: (value: Date) => value && !isNaN(value.getTime()),
  },
  type: {
    validator: (value?: AutocompleteOption) =>
      (value?.value.length ?? 0) < REGISTER_OPTION_MAX_LENGTH,
    equalityComparer: (newValue, initialValue) => newValue?.value === initialValue?.value,
  },
  target: {
    validator: (value: AutocompleteOption) =>
      value.value.length > REGISTER_OPTION_MIN_LENGTH &&
      value.value.length < REGISTER_OPTION_MAX_LENGTH,
    equalityComparer: (newValue, initialValue) => newValue?.value === initialValue?.value,
  },
  comments: {
    validator: (value?: string) => (value?.length ?? 0) < REGISTER_COMMENT_MAX_LENGTH,
  },
};

export const RegisterFormComponentCopy = forwardRef<RegisterFormRef, RegisterFormProps>(
  function RegisterFormComponentCopy({ onSubmit, onCancel, register }, ref) {
    const { targetOptions, typeOptions } = useRegisterContext();
    const formProps = useRegisterForm(register);
    const { setValue, state, reset, isValid, isDirty } = formProps;
    const { target, type, timestamp, value, comments } = state;

    useImperativeHandle<RegisterFormRef, RegisterFormRef>(ref, () => ({ reset }), [reset]);

    return (
      <FormComponent
        className="flex w-60 flex-col gap-4 text-xs"
        formProps={formProps}
        onSubmit={event => {
          event.preventDefault();
          onSubmit({ ...state, type: type?.value, target: target.value });
        }}>
        <div className="flex gap-4">
          <ControlledCurrencyInput<RegisterForm, 'value'>
            checkers={checkers['value']}
            field="value"
            label={ptBR.value}
            value={value}
            currencyInputProps={{
              className: 'w-full',
              inputSize: 'small',
              placeholder: ptBR.placeholderValue,
            }}
          />
          <div className="w-2/5">
            <span
              className={classNames('text-hoki-800', {
                'opacity-70': value !== 0,
                'opacity-40': value === 0,
              })}>
              {value >= 0 ? ptBR.earning : ptBR.expense}
            </span>
            <Toggle
              disabled={value === 0}
              isActive={value > 0}
              onClick={() => setValue('value', value * -1)}
              type="button"
            />
          </div>
        </div>
        <ControlledDatePicker<RegisterForm, 'timestamp'>
          checkers={checkers['timestamp']}
          field="timestamp"
          label={ptBR.date}
          value={timestamp}
        />
        <ControlledAutocomplete<RegisterForm, 'target'>
          checkers={checkers['target']}
          field="target"
          label={value >= 0 ? ptBR.destination : ptBR.source}
          value={target}
          autocompleteProps={{
            options: targetOptions,
            placeholder: ptBR.placeholderTarget,
            inputProps: {
              minLength: REGISTER_OPTION_MIN_LENGTH,
              maxLength: REGISTER_OPTION_MAX_LENGTH,
            },
          }}
        />
        <ControlledAutocomplete<RegisterForm, 'type'>
          checkers={checkers['type']}
          field="type"
          label={ptBR.type}
          value={type}
          autocompleteProps={{
            options: typeOptions,
            placeholder: ptBR.placeholderType,
            inputProps: { maxLength: REGISTER_OPTION_MAX_LENGTH },
          }}
        />
        <ControlledTextArea<RegisterForm, 'comments'>
          checkers={checkers['comments']}
          field="comments"
          label={ptBR.comment}
          value={comments}
          textAreaProps={{
            placeholder: ptBR.placeholderComment,
            maxLength: REGISTER_COMMENT_MAX_LENGTH,
            inputSize: 'small',
          }}
        />
        <DialogFooter
          cancelButton={{ type: 'button', onClick: onCancel }}
          confirmButton={{ type: 'submit', disabled: !(isValid && isDirty) }}
        />
      </FormComponent>
    );
  }
);

export default RegisterFormComponentCopy;
