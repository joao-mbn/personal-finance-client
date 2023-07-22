import { AutocompleteOption } from './option';

export interface Register {
  id?: string;
  comments?: string;
  target: string;
  timestamp: Date;
  type: string;
  value: number;
}

export interface RegisterResponse extends Omit<Register, 'timestamp'> {
  timestamp: string;
}

export interface RegisterForm extends Omit<Register, 'target' | 'type'> {
  target: AutocompleteOption;
  type: AutocompleteOption;
}
