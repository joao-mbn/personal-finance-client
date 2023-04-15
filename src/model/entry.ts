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
