import { Registry } from '../models';
import { api } from './api';

export namespace RegistryService {
  const CONTROLLER = 'registry';

  export async function getAll() {
    return (await api.get<Registry[]>(`${CONTROLLER}/getAll`)).data;
  }
}
