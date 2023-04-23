import { api } from './api';

export namespace AuthService {
  const CONTROLLER = 'auth';

  export async function authWithGoogle(tokenId: string) {
    return (await api.post<void>(`${CONTROLLER}/google`, { tokenId })).data;
  }
}
