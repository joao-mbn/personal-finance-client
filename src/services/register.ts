import { DateRange, Register } from '../models';
import { api } from './api';

export namespace RegisterService {
  const CONTROLLER = 'register';

  export async function getAll(filter?: DateRange) {
    return (await api.get<Register[]>(`${CONTROLLER}/getAll`, { params: filter })).data;
  }
}
