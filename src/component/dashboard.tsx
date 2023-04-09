import { useQuery } from '@tanstack/react-query';
import { EntryService } from '../service';

export function Dashboard() {
  const { isLoading, data: entries, isError } = useQuery({ queryKey: ['entries'], queryFn: EntryService.getAll });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error!</span>;
  }

  return (
    <ul>
      {entries
        .filter(({ id }) => !!id)
        .map(({ id, type, value }) => (
          <li key={id}>
            <b>{type}: </b>
            {value}
          </li>
        ))}
    </ul>
  );
}
