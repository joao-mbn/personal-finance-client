export interface Entry {
  id?: string;
  comments?: string;
  target: string;
  timestamp: Date;
  type: string;
  value: number;
  isExpense: boolean;
}

export interface EntryDisplay extends Omit<Entry, 'value'> {
  value: string;
}

export type Balance = {
  name: string;
  value: number;
};

export type Balances = {
  totalBalance: number;
  balances: Balance[];
};

export type Debt = {
  name: string;
  value: number;
};

export type Debts = {
  totalDebts: number;
  debts: Debt[];
};

export type DueSoonBill = {
  name: string;
  value: number;
  dueDate: string;
};

export type MonthBalance = { balance: number; month: string };

export type MonthDebt = { debt: number; month: string };

export type MonthEntry = { earnings: number; expenses: number; netEarnings: number; month: string };

export type Asset = { type: string; value: number };
