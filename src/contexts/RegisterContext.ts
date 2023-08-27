import { createContext, useContext } from 'react';
import { AutocompleteOption } from '../models';
import { contextIsNotNull } from '../utils';

interface RegisterContextProps {
  targetOptions: AutocompleteOption[];
  typeOptions: AutocompleteOption[];
}

export const RegisterContext = createContext<RegisterContextProps | null>(null);

export function useRegisterContext() {
  const context = useContext(RegisterContext);
  return contextIsNotNull(context);
}
