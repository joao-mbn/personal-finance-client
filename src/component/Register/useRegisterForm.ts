import { useContext, useMemo } from 'react';
import { RegisterContext } from '../../contexts';
import { Register, RegisterForm } from '../../models';
import { useForm } from '../Form/useForm';

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

  const form = useForm<RegisterForm>(initialForm);

  return { targetOptions, typeOptions, initialForm, ...form };
}
