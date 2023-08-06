import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ptBR } from '../../languages';
import { DateRange, Register, RegisterWithOptions } from '../../models';
import { RegisterService } from '../../services';
import { closeAllDialogs } from '../../utils';

export function useRegisterCrud(filter: DateRange) {
  const getManyQueryKey = ['register', 'many', filter];
  const { data, refetch } = useQuery({
    queryKey: getManyQueryKey,
    queryFn: () => RegisterService.getMany(filter),
  });

  const queryClient = useQueryClient();

  const { mutate: createOne } = useMutation({
    mutationFn: RegisterService.createOne,
    onSuccess: register => {
      const { timestamp, target, type } = register;
      queryClient.setQueryData<RegisterWithOptions>(getManyQueryKey, registerWithOptions => {
        if (!registerWithOptions) return registerWithOptions;

        const { registers, targetOptions, typeOptions } = registerWithOptions;
        const oldRegisterIndex = registers.findIndex(r => r.timestamp < timestamp);

        let newRegisters: Register[];

        if (oldRegisterIndex === -1) {
          newRegisters = [...registers, register];
        } else {
          newRegisters = [
            ...registers.slice(0, oldRegisterIndex),
            { ...register },
            ...registers.slice(oldRegisterIndex),
          ];
        }

        const newTargetOptions = [...targetOptions];
        !targetOptions.some(opt => opt === target) && newTargetOptions?.push(target);

        const newTypeOptions = [...typeOptions];
        !!type && !typeOptions.some(opt => opt === type) && newTypeOptions?.push(type);

        return {
          registers: newRegisters,
          targetOptions: newTargetOptions,
          typeOptions: newTypeOptions,
        };
      });

      console.info(ptBR.registerCreated);
      closeAllDialogs();
    },
  });

  const { mutate: updateOne } = useMutation({
    mutationFn: RegisterService.updateOne,
    onSuccess: register => {
      const { id, target, type } = register;
      queryClient.setQueryData<RegisterWithOptions>(getManyQueryKey, registerWithOptions => {
        if (!registerWithOptions) return registerWithOptions;

        const { registers, targetOptions, typeOptions } = registerWithOptions;
        const oldRegisterIndex = registers.findIndex(r => r.id === id);

        if (oldRegisterIndex === -1) return registerWithOptions;

        const newRegisters = [
          ...registers.slice(0, oldRegisterIndex),
          { ...register },
          ...registers.slice(oldRegisterIndex + 1),
        ];

        const newTargetOptions = [...targetOptions];
        !targetOptions.some(opt => opt === target) && newTargetOptions?.push(target);

        const newTypeOptions = [...typeOptions];
        !!type && !typeOptions.some(opt => opt === type) && newTypeOptions?.push(type);

        return {
          registers: newRegisters,
          targetOptions: newTargetOptions,
          typeOptions: newTypeOptions,
        };
      });

      console.info(ptBR.registerUpdated);
      closeAllDialogs();
    },
  });

  const { mutate: deleteOne } = useMutation({
    mutationFn: RegisterService.deleteOne,
    onSuccess: registerId => {
      queryClient.setQueryData<RegisterWithOptions>(getManyQueryKey, registerWithOptions => {
        if (!registerWithOptions) return registerWithOptions;

        const { registers, targetOptions, typeOptions } = registerWithOptions;
        const oldRegisterIndex = registers.findIndex(r => r.id === registerId);

        if (oldRegisterIndex === -1) return registerWithOptions;

        const newRegisters = [
          ...registers.slice(0, oldRegisterIndex),
          ...registers.slice(oldRegisterIndex + 1),
        ];

        return { registers: newRegisters, targetOptions, typeOptions };
      });

      console.info(ptBR.registerDeleted);
      closeAllDialogs();
    },
  });

  return {
    data,
    refetch,
    createOne,
    updateOne,
    deleteOne,
  };
}
