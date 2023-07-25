import {
  DateRange,
  Register,
  RegisterResponse,
  RegisterResponseWithOptions,
  RegisterWithOptions,
} from '../models';
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

  export async function edit(register: Register): Promise<Register> {
    const { data } = await api.post<RegisterResponse>(`${CONTROLLER}/edit`, register);
    return { ...data, timestamp: new Date(data.timestamp) };
  }
}
