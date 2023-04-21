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

export type Balance = Pick<Entry, 'target' | 'value'>;

export type Balances = {
  totalBalance: number;
  balancePerTarget: Balance[];
};

export type Debt = Pick<Entry, 'target' | 'value'>;

export type Debts = {
  totalDebts: number;
  debtsPerTarget: Debt[];
};

export type DueSoonBill = Pick<Entry, 'type' | 'value'> & { dueDate: Date };

export type MonthBalance = { balance: number; month: Date };

export type MonthDebt = { debt: number; month: Date };

export type MonthEntry = { earnings: number; expenses: number; netEarnings: number; month: Date };

export type MonthStocks = { stocks: number; month: Date };
