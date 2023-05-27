import { createContext } from 'react';

interface AppContextProps {
  hasSession: boolean;
  setHasSession: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps>({
  hasSession: false,
  setHasSession: () => undefined,
});

export default AppContext;
