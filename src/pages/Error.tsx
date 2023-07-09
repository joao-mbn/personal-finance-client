import { AxiosError } from 'axios';
import { useRouteError } from 'react-router-dom';
import { Page } from '../component';
import { ptBR } from '../languages';

export default function ErrorPage() {
  const error = useRouteError() as AxiosError;

  return <Page title={`${ptBR.error}: ${error.code}`}>{error.message}</Page>;
}
