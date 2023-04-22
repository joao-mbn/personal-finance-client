import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import SyncIcon from '@mui/icons-material/Sync';
import { useState } from 'react';
import { ptBR } from '../languages';

const menuBarOptions = [
  { value: 'dashboard', label: ptBR.dashboard, icon: <DashboardIcon /> },
  { value: 'manualInput', label: ptBR.manualInput, icon: <AddCircleIcon /> },
  { value: 'sync', label: ptBR.sync, icon: <SyncIcon /> },
  { value: 'configuration', label: ptBR.configuration, icon: <SettingsIcon /> },
];

export function MenuBar() {
  const [active, setActive] = useState(menuBarOptions[0].value);

  const handleChange = (newValue: string) => {
    setActive(newValue);
  };

  return (
    <footer className="flex items-stretch h-16 w-screen z-10 mt-2 sticky bottom-0 border-solid border-2 border-black">
      {menuBarOptions.map(({ icon, label, value }) => {
        const width = `w-[${100 / menuBarOptions.length}%]`;
        return (
          <button
            onClick={() => handleChange(value)}
            className={`flex flex-col justify-start items-center ${width} ${
              active === value ? 'text-green-900' : ''
            }`}>
            {icon}
            {label}
          </button>
        );
      })}
    </footer>
  );
}
