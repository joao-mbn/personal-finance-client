import { Entry } from '../model';
import { api } from './api';

export namespace EntryService {
  const CONTROLLER = 'entry';

  export async function getAll() {
    return (await api.get<Entry[]>(`${CONTROLLER}/getAll`)).data;
  }
}
