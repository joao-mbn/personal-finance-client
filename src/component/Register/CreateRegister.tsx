import { lazy, useState } from 'react';
import { ptBR } from '../../languages';
import { NewRegister } from '../../models';
import { MultiActionButton, MultiActionButtonRef } from '../Base';
import { PlusIcon } from '../Icons';
import { RegisterFormRef } from './RegisterFormComponent';

const RegisterFormComponent = lazy(() => import('./RegisterFormComponent'));

interface CreateRegisterProps {
  onCreate: (register: NewRegister) => void;
}

export default function CreateRegister({ onCreate }: CreateRegisterProps) {
  const [ref, setRef] = useState<MultiActionButtonRef | null>(null);
  const [formRef, setFormRef] = useState<RegisterFormRef | null>(null);

  return (
    <MultiActionButton
      buttonClassName="fixed right-10 bottom-24 z-10 rounded-full !p-2 shadow-md"
      header={ptBR.createRegister}
      importance="primary"
      onClose={() => formRef?.reset()}
      ref={setRef}
      showFromOrigin={false}
      size="large"
      icon={
        <PlusIcon
          className="w-8"
          viewBox="4 4 16 16"
        />
      }>
      <RegisterFormComponent
        onCancel={() => ref?.dialog?.close()}
        onSubmit={onCreate}
        ref={setFormRef}
      />
    </MultiActionButton>
  );
}
