import { DateRange, RegisterResponseWithOptions, RegisterWithOptions } from '../models';
import { api } from './api';

export namespace RegisterService {
  const CONTROLLER = 'register';

  export async function getAll(filter?: DateRange): Promise<RegisterWithOptions> {
    const { data } = await api.get<RegisterResponseWithOptions>(`${CONTROLLER}/getAll`, {
      params: filter,
    });
    return {
      ...data,
      registers: data.registers.map(r => ({
        ...r,
        timestamp: new Date(r.timestamp),
      })),
    };
  }
}
