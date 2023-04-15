import { EntryDisplay } from '../model';

export function EntriesTable({ entries }: { entries: EntryDisplay[] }) {
  return (
    <div className="m-3 h-5/6 w-5/6">
      <ul>
        {entries.map(({ target, type, value }) => (
          <li>
            <b>{target ?? type}</b>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
