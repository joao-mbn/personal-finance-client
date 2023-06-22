import {
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';

interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
  columns: { value: keyof T; label: ReactNode }[];
  data: Record<keyof T, T[keyof T] | ReactNode>[];
  showHeaders?: boolean;
}

export function Table<T extends Record<string, ReactNode>>({
  columns,
  data,
  showHeaders = true,
  ...props
}: TableProps<T>) {
  return (
    <table {...props}>
      {showHeaders && (
        <thead>
          <HeaderRow>
            {columns.map(col => (
              <Header>{col.label}</Header>
            ))}
          </HeaderRow>
        </thead>
      )}
      <tbody>
        {data.map(row => (
          <Row>
            {columns.map(col => (
              <Cell>{row[col.value]}</Cell>
            ))}
          </Row>
        ))}
      </tbody>
    </table>
  );
}

interface HeaderRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
}

export function HeaderRow({ children, ...props }: HeaderRowProps) {
  return <tr {...props}>{children}</tr>;
}

interface HeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export function Header({ children, ...props }: HeaderProps) {
  return <th {...props}>{children}</th>;
}

interface RowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
}

export function Row({ children, ...props }: RowProps) {
  return <tr {...props}>{children}</tr>;
}

interface CellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export function Cell({ children, ...props }: CellProps) {
  return <td {...props}>{children}</td>;
}
