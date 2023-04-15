import { useQuery } from '@tanstack/react-query';
import { EntriesTable } from '.';
import { EntryService } from '../service';
import { toBRL } from '../utils';

export function Dashboard() {
  const { isLoading, data, isError } = useQuery({ queryKey: ['entries'], queryFn: EntryService.getAll });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error!</span>;
  }

  const entries = data.filter(({ id }) => !!id).map(e => ({ ...e, value: toBRL(e.value) }));

  return <EntriesTable entries={entries}></EntriesTable>;
}
