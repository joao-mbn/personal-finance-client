import {
  DateRange,
  NewRegister,
  Register,
  RegisterResponse,
  RegisterResponseWithOptions,
  RegisterWithOptions,
} from '../models';
import { api } from './api';

export namespace RegisterService {
  const CONTROLLER = 'register';

  export async function getAll(filter?: DateRange): Promise<RegisterWithOptions> {
    const { data } = await api.get<RegisterResponseWithOptions>(CONTROLLER, {
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

  export async function createOne(register: NewRegister): Promise<Register> {
    const { data } = await api.post<RegisterResponse>(CONTROLLER, register);
    return { ...data, timestamp: new Date(data.timestamp) };
  }

  export async function updateOne(register: Register): Promise<Register> {
    const { data } = await api.post<RegisterResponse>(`${CONTROLLER}/${register.id}`, register);
    return { ...data, timestamp: new Date(data.timestamp) };
  }

  export async function deleteOne(registerId: string) {
    const { data } = await api.delete<string>(`${CONTROLLER}/${registerId}`);
    return data;
  }
}
