import { useCallback, useContext, useMemo, useReducer } from 'react';
import { RegisterContext } from '../../contexts';
import { Register, RegisterForm } from '../../models';

export function useRegisterForm(register: Register) {
  const { targetOptions, typeOptions } = useContext(RegisterContext);

  const initialForm: RegisterForm = useMemo(
    () => ({
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
    }),
    [register]
  );

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

  return { formState, dispatch, targetOptions, typeOptions };
}
