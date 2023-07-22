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
  isPaid: boolean;
};

export type MonthBalance = { balance: number; month: string };

export type MonthDebt = { debt: number; month: string };

export type MonthEntry = { earnings: number; expenses: number; netEarnings: number; month: string };

export type Asset = { type: string; value: number };
