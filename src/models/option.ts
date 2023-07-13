import { Key, ReactNode } from 'react';

export type DropdownOption = {
  key: Key;
  value: ReactNode;
  disabled?: boolean;
};

export type AutocompleteOption = Omit<DropdownOption, 'value'> & {
  value: string;
};
