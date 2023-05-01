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
  dueDate: Date;
};

export type MonthBalance = { balance: number; month: Date };

export type MonthDebt = { debt: number; month: Date };

export type MonthEntry = { earnings: number; expenses: number; netEarnings: number; month: Date };

export type Asset = { type: string; value: number };
