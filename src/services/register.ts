import { DateRange, Register, RegisterResponse } from '../models';
import { api } from './api';

export namespace RegisterService {
  const CONTROLLER = 'register';

  export async function getAll(filter?: DateRange): Promise<Register[]> {
    return (await api.get<RegisterResponse[]>(`${CONTROLLER}/getAll`, { params: filter })).data.map(
      r => ({
        ...r,
        timestamp: new Date(r.timestamp),
      })
    );
  }
}
