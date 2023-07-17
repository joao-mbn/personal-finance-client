import { ReactNode } from 'react';

export type Column<T = unknown> = {
  value: keyof T;
  label?: ReactNode;
  width?: string;
};
