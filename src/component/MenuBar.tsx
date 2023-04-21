import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import SyncIcon from '@mui/icons-material/Sync';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { SyntheticEvent, useState } from 'react';
import { ptBR } from '../languages';

const menuBarOptions = [
  { value: 'dashboard', label: ptBR.dashboard, icon: <DashboardIcon /> },
  { value: 'manualInput', label: ptBR.manualInput, icon: <AddCircleIcon /> },
  { value: 'sync', label: ptBR.sync, icon: <SyncIcon /> },
  { value: 'configuration', label: ptBR.configuration, icon: <SettingsIcon /> },
];

export function MenuBar() {
  const [value, setValue] = useState(menuBarOptions[0].value);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      showLabels
      className="border-solid border-2 border-black pt-2 h-16 w-full z-10 fixed left-0 bottom-0 items-start"
      sx={{
        '.MuiBottomNavigationAction-label': {
          fontSize: '0.6rem !important',
          lineHeight: '0.75rem',
          overflowWrap: 'break-word',
          maxWidth: '80%',
        },
      }}
      value={value}
      onChange={handleChange}>
      {menuBarOptions.map(option => (
        <BottomNavigationAction className="p-0 min-w-fit" key={option.label} {...option} />
      ))}
    </BottomNavigation>
  );
}
