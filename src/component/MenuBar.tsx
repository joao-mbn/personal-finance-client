import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import SyncIcon from '@mui/icons-material/Sync';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import * as React from 'react';

const menuBarOptions = [
  { value: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { value: 'add', label: 'Entrada Manual', icon: <AddCircleIcon /> },
  { value: 'sync', label: 'Sinc.', icon: <SyncIcon /> },
  { value: 'configuration', label: 'Config.', icon: <SettingsIcon /> },
];

export function MenuBar() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      showLabels
      className="border-solid border-2 border-black pt-2 h-16 w-full z-10 fixed left-0 bottom-0 items-start"
      sx={{
        '.MuiBottomNavigationAction-label': {
          fontSize: '0.6rem',
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
