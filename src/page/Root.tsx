import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { MenuBar } from '../component';
import AppContext from '../context/AppContext';
import { Message } from '../model';
import { AuthService } from '../service';

export async function rootLoader(queryClient: QueryClient) {
  try {
    await new Promise(resolve => setTimeout(() => resolve(null), 1000));
    await queryClient.fetchQuery({ queryKey: ['ping'], queryFn: AuthService.ping });
    return true;
  } catch (error) {
    const sessionMessages: string[] = [
      Message.InvalidSessionId,
      Message.NoSessionId,
      Message.SessionExpired,
    ];
    const message = (error as AxiosError).response?.data as string | undefined;

    if (message && sessionMessages.includes(message)) {
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

  const { setHasSession: updateSessionStatusGlobally } = useContext(AppContext);

  useEffect(() => {
    updateSessionStatusGlobally(hasSession);

    !hasSession && navigate('/home');
    hasSession && isAtBase && navigate('/dashboard');
  }, [hasSession]);

  return (
    <div className="h-full min-h-screen w-screen">
      <Outlet />
      {!isAtBase && <MenuBar />}
    </div>
  );
}
