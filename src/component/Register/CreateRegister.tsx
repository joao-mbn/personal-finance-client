import { useState } from 'react';
import { NewRegister, Register } from '../../models';
import { MultiActionButton, MultiActionButtonRef } from '../Base';
import { PlusIcon } from '../Icons';
import { RegisterFormComponent, RegisterFormRef } from './RegisterForm';

interface CreateRegisterProps {
  onCreate: (register: NewRegister) => void;
}

export default function CreateRegister({ onCreate }: CreateRegisterProps) {
  const [ref, setRef] = useState<MultiActionButtonRef | null>(null);
  const [formRef, setFormRef] = useState<RegisterFormRef | null>(null);

  const newRegister: Register = {
    id: '',
    target: '',
    timestamp: new Date(),
    value: 0,
    comments: '',
    type: '',
  };

  return (
    <MultiActionButton
      buttonClassName="fixed left-3/4 top-3/4 z-10 translate-x-1 rounded-full !p-2 shadow-md"
      importance="primary"
      onClose={() => formRef?.reset()}
      ref={setRef}
      showFromOrigin={false}
      size="large"
      icon={
        <PlusIcon
          className="w-8 fill-hoki-800 stroke-0"
          viewBox="4 4 16 16"
        />
      }>
      <div className="flex flex-col gap-1 whitespace-normal break-words">
        <RegisterFormComponent
          onCancel={() => ref?.dialog?.close()}
          onSubmit={onCreate}
          ref={setFormRef}
          register={newRegister}
        />
      </div>
    </MultiActionButton>
  );
}
