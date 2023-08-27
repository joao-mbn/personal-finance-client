import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../component';
import { useAppContext } from '../contexts';
import { AuthService } from '../services';
import { SESSION_CODES } from '../utils';

export async function rootLoader(queryClient: QueryClient) {
  try {
    await queryClient.fetchQuery({ queryKey: ['ping'], queryFn: AuthService.ping });
    return true;
  } catch (error) {
    const message = (error as AxiosError).response?.data as string | undefined;

    if (message && (SESSION_CODES as string[]).includes(message)) {
      return false;
    } else {
      throw error;
    }
  }
}

export default function RootPage() {
  const hasSession = useLoaderData() as boolean;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAtBase = pathname === '/' || pathname === '/home';

  const { setHasSession: updateSessionStatusGlobally } = useAppContext();

  useEffect(() => {
    updateSessionStatusGlobally(hasSession);

    !hasSession && navigate('/home');
    hasSession && isAtBase && navigate('/dashboard');
  }, [hasSession]);

  return <PageWrapper isAtBase={isAtBase} />;
}
