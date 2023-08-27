import { AxiosError } from 'axios';
import { useToaster } from '.';
import { ptBR } from '../languages';
import { api } from '../services';
import {
  SESSION_CODES,
  closeAllDialogs,
  fillStringTemplate,
  parseBackendCodedMessages,
} from '../utils';

const codesToIgnore: (keyof typeof ptBR)[] = [...SESSION_CODES];

export function useAxiosInterceptors(
  invokeToaster: ReturnType<typeof useToaster>['invokeToaster']
) {
  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const _error = error as AxiosError;

      if (_error.response && typeof _error.response.data === 'string') {
        const { data, status } = _error.response;

        const parsedResult = parseBackendCodedMessages(data);

        if (parsedResult && !codesToIgnore.includes(parsedResult.templateCode)) {
          const { template, fields } = parsedResult;
          const message = template ? fillStringTemplate(template, fields) : ptBR.anErrorOccurred;
          closeAllDialogs();
          invokeToaster({ type: 'error', message, title: `${ptBR.error} ${status}` });
        }
      }

      return Promise.reject(_error);
    }
  );
}
