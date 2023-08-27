import { api } from './';

export namespace AuthService {
  const CONTROLLER = 'auth';

  export async function getGoogleConsentUrl() {
    return (await api.get<string>(`${CONTROLLER}/getGoogleConsentUrl`)).data;
  }

  export async function ping() {
    return await api.get<string>(`${CONTROLLER}/ping`);
  }
}
