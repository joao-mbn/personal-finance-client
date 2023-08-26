import { createContext } from 'react';
import { useToaster } from '../hooks';

interface AppContextProps {
  hasSession: boolean;
  setHasSession: React.Dispatch<React.SetStateAction<boolean>>;
  viewportDimensions: { height: number; width: number };
  invoke: ReturnType<typeof useToaster>['invoke'];
}

export const AppContext = createContext<AppContextProps>({
  hasSession: false,
  invoke: () => undefined,
  setHasSession: () => undefined,
  viewportDimensions: { height: 0, width: 0 },
});
