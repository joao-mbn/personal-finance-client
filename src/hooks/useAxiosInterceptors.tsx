import { AxiosError } from 'axios';
import { useToaster } from '.';
import { ptBR } from '../languages';
import { api } from '../services';

export function useAxiosInterceptors(
  invokeToaster: ReturnType<typeof useToaster>['invokeToaster']
) {
  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const _error = error as AxiosError;

      if (_error.response) {
        const { data, status } = _error.response;

        const knownErrorMessage = ptBR[data as keyof typeof ptBR];

        invokeToaster({
          type: 'error',
          message: knownErrorMessage ?? ptBR.anErrorOccurred,
          title: `${ptBR.error} ${status}`,
        });
      }

      return Promise.reject(_error);
    }
  );
}
