import { api } from './api';

export namespace AuthService {
  const CONTROLLER = 'auth';

  export async function getGoogleConsentUrl() {
    return (await api.get<string>(`${CONTROLLER}/getGoogleConsentUrl`)).data;
  }
}
