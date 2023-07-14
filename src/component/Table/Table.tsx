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
        {...props}
        className={classNames(
          'text w-full table-auto border-separate border-spacing-0',
          { 'border-t-2 border-cerulean-600': !showHeaders },
          props.className
        )}>
        <thead>
          {showHeaders && (
            <Row>
              {columns.map((col, i) => (
                <Header
                  className="bg-hoki-200 text-hoki-800"
                  key={i}>
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
              className={classNames('text-hoki-800', {
                'bg-hoki-50': zebraStripes && i % 2 === 1,
              })}>
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

export default Table;

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
      className={classNames(className, 'truncate p-2')}
      {...props}>
      {children}
    </td>
  );
}
