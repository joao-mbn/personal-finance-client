import { createContext, useContext } from 'react';
import { useToaster } from '../hooks';
import { contextIsNotNull } from '../utils';

interface AppContextProps {
  hasSession: boolean;
  setHasSession: React.Dispatch<React.SetStateAction<boolean>>;
  viewport: { vh: number; vw: number };
  invokeToaster: ReturnType<typeof useToaster>['invokeToaster'];
}

export const AppContext = createContext<AppContextProps | null>(null);

export function useAppContext() {
  const context = useContext(AppContext);
  return contextIsNotNull(context);
}
