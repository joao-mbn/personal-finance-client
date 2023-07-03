import { Key, ReactNode } from 'react';

export type DropdownOption = {
  key: Key;
  value: ReactNode;
  disabled?: boolean;
};
