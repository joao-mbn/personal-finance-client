import { createContext } from 'react';
import { AutocompleteOption } from '../models';

interface RegisterContextProps {
  targetOptions: AutocompleteOption[];
  typeOptions: AutocompleteOption[];
}

export const RegisterContext = createContext<RegisterContextProps>({
  targetOptions: [],
  typeOptions: [],
});
