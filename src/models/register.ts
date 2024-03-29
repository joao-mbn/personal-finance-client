import { AutocompleteOption } from './option';

export type Register = {
  id: string;
  comments?: string;
  target: string;
  timestamp: Date;
  type?: string;
  value: number;
};

export interface NewRegister extends Omit<Register, 'id'> {}

export interface RegisterResponse extends Omit<Register, 'timestamp'> {
  timestamp: string;
}

export type RegisterForm = Omit<Register, 'target' | 'type'> & {
  target: AutocompleteOption;
  type?: AutocompleteOption;
};

export interface RegisterWithOptions {
  registers: Register[];
  typeOptions: Register['type'][];
  targetOptions: Register['target'][];
}

export interface RegisterResponseWithOptions extends Omit<RegisterWithOptions, 'registers'> {
  registers: RegisterResponse[];
}
