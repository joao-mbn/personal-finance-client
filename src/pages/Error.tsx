import { AxiosError } from 'axios';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as AxiosError;

  return <h1>{error.message}</h1>;
}
