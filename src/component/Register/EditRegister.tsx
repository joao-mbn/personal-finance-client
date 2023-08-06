import { useState } from 'react';
import { PencilIcon } from '..';
import { ptBR } from '../../languages';
import { Register } from '../../models';
import { MultiActionButtonRef } from '../Base';
import { MultiActionButtonWrapper } from './MultiActionButtonWrapper';
import { RegisterFormComponent, RegisterFormRef } from './RegisterForm';

interface RegisterFormProps {
  onSubmit: (register: Register) => void;
  register: Register;
}

export default function EditRegister({ onSubmit, register }: RegisterFormProps) {
  const [ref, setRef] = useState<MultiActionButtonRef | null>(null);
  const [formRef, setFormRef] = useState<RegisterFormRef | null>(null);

  return (
    <MultiActionButtonWrapper
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
    </MultiActionButtonWrapper>
  );
}
