import { useMemo } from 'react';
import { useRegisterContext } from '../../contexts';
import { Register, RegisterForm } from '../../models';
import { useForm } from '../Form';

const defaultRegister: RegisterForm = {
  id: '',
  target: { value: '', key: crypto.randomUUID() },
  timestamp: new Date(),
  value: 0,
  comments: '',
  type: { value: '', key: crypto.randomUUID() },
};

export function useRegisterForm(register?: Register) {
  const { targetOptions, typeOptions } = useRegisterContext();

  const initialForm: RegisterForm = useMemo(() => {
    return register
      ? {
          ...defaultRegister,
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
        }
      : defaultRegister;
  }, [register, targetOptions, typeOptions]);

  const form = useForm<RegisterForm>(initialForm);
  return form;
}
