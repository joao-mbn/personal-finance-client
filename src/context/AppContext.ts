import { createContext } from 'react';

interface AppContextProps {
  hasSession: boolean;
  setHasSession: React.Dispatch<React.SetStateAction<boolean>>;
  viewportDimensions: { height: number; width: number };
}

export const AppContext = createContext<AppContextProps>({
  hasSession: false,
  setHasSession: () => undefined,
  viewportDimensions: { height: 0, width: 0 },
});
