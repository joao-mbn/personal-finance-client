import classNames from 'classnames';
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
  zebraStripes?: boolean;
}

export function Table<T extends Record<string, ReactNode>>({
  columns,
  data,
  showHeaders = true,
  zebraStripes = true,
  ...props
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto pb-1">
      <table
        className={classNames('table-auto border-separate border-spacing-0', {
          'border-t-2 border-slate-600': !showHeaders,
        })}
        {...props}>
        <thead>
          {showHeaders && (
            <Row>
              {columns.map((col, i) => (
                <Header
                  key={i}
                  className="bg-slate-300">
                  {col.label}
                </Header>
              ))}
            </Row>
          )}
        </thead>
        <tbody>
          {data.map((row, i) => (
            <Row
              key={i}
              className={classNames({ 'bg-slate-100': zebraStripes && i % 2 === 1 })}>
              {columns.map((col, j) => (
                <Cell key={j}>{row[col.value]}</Cell>
              ))}
            </Row>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface RowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
}

export function Row({ children, className, ...props }: RowProps) {
  return (
    <tr
      className={classNames(className)}
      {...props}>
      {children}
    </tr>
  );
}

interface HeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export function Header({ children, ...props }: HeaderProps) {
  return <th {...props}>{children}</th>;
}

interface CellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export function Cell({ children, className, ...props }: CellProps) {
  return (
    <td
      className={classNames(className, 'max-w-[8rem] truncate p-2')}
      {...props}>
      {children}
    </td>
  );
}
