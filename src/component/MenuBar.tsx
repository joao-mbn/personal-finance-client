import { useState } from 'react';
import { ptBR } from '../languages';
import { GoogleSignIn } from './GoogleSignIn';

const menuBarOptions = [
  { value: 'dashboard', label: ptBR.dashboard, icon: '' },
  { value: 'sync', label: ptBR.sync, icon: '' },
  { value: 'configuration', label: ptBR.configuration, icon: '' },
];

export function MenuBar() {
  const [active, setActive] = useState(menuBarOptions[0].value);

  const handleChange = (newValue: string) => {
    setActive(newValue);
  };

  return (
    <footer className="flex items-stretch h-16 w-screen z-10 mt-2 sticky bottom-0 border-solid border-2 border-black">
      {menuBarOptions.map(({ icon, label, value }) => {
        return (
          <button
            key={value}
            onClick={() => handleChange(value)}
            className={`flex flex-col justify-start items-center w-[25%] ${
              active === value ? 'text-green-900' : ''
            }`}>
            {icon}
            {label}
          </button>
        );
      })}
      <GoogleSignIn />
    </footer>
  );
}
