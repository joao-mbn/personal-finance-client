import { lazy, useState } from 'react';
import { PencilIcon } from '..';
import { ptBR } from '../../languages';
import { Register } from '../../models';
import { MultiActionButtonRef } from '../Base';
import { MultiActionButtonOption } from './MultiActionButtonWrapper';
import { RegisterFormRef } from './RegisterFormComponent';

const RegisterFormComponent = lazy(() => import('./RegisterFormComponent'));

interface RegisterFormProps {
  onSubmit: (register: Register) => void;
  register: Register;
}

export default function EditRegister({ onSubmit, register }: RegisterFormProps) {
  const [ref, setRef] = useState<MultiActionButtonRef | null>(null);
  const [formRef, setFormRef] = useState<RegisterFormRef | null>(null);

  return (
    <MultiActionButtonOption
      header={ptBR.editRegister}
      label={ptBR.edit}
      onClose={() => formRef?.reset()}
      ref={setRef}
      showFromOrigin={false}
      icon={
        <PencilIcon
          className="w-6 stroke-0"
          viewBox="-4 -1 30 30"
        />
      }>
      <RegisterFormComponent
        onCancel={() => ref?.dialog?.close()}
        onSubmit={onSubmit}
        ref={setFormRef}
        register={register}
      />
    </MultiActionButtonOption>
  );
}
