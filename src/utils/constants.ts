import { ptBR } from '../languages';

export const REM_PX_RATIO = 16;
export const MENU_BAR_HEIGHT = 5; // rem

export const SESSION_CODES: (keyof Pick<
  typeof ptBR,
  'invalidSessionId' | 'sessionExpired' | 'noSessionId'
>)[] = ['invalidSessionId', 'sessionExpired', 'noSessionId'];
