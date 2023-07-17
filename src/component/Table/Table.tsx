import classNames from 'classnames';
import { ReactNode, TableHTMLAttributes, TdHTMLAttributes } from 'react';
import { Column } from '../../models';

interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
  columns: Column<T>[];
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
    <table
      {...props}
      className={classNames(
        'text w-full table-auto border-separate border-spacing-0',
        {
          'border-t-2 border-cerulean-600': !showHeaders,
          'table-fixed': columns.some(c => !!c.width),
        },
        props.className
      )}>
      <thead>
        {showHeaders && (
          <tr>
            {columns.map((col, i) => (
              <th
                className="bg-hoki-200 text-hoki-800"
                key={i}>
                {col.label}
              </th>
            ))}
          </tr>
        )}
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            className={classNames('text-hoki-800', { 'bg-hoki-50': zebraStripes && i % 2 === 1 })}
            key={i}>
            {columns.map((col, j) => (
              <Cell
                key={j}
                style={{ width: col.width }}>
                {row[col.value]}
              </Cell>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

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
