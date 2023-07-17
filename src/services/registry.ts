import { DateRange, Registry } from '../models';
import { api } from './api';

export namespace RegistryService {
  const CONTROLLER = 'registry';

  export async function getAll(filter?: DateRange) {
    return (await api.get<Registry[]>(`${CONTROLLER}/getAll`, { params: filter })).data;
  }
}
