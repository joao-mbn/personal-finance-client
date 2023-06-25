import { useQuery } from '@tanstack/react-query';
import { ptBR } from '../languages';
import { AuthService } from '../services';
import { Button } from './Button';
import { GoogleIcon } from './Icons/GoogleIcon';

export function GoogleSignIn() {
  const { data: url } = useQuery({
    queryKey: ['url'],
    queryFn: AuthService.getGoogleConsentUrl,
    suspense: false,
  });

  return (
    <Button
      importance="secondary"
      label={ptBR.loginWithGoogle}
      size="medium"
      type="button"
      icon={
        <GoogleIcon
          className="w-6 fill-cerulean-900"
          viewBox="1.5 2 20 20"
        />
      }
      onClick={() => {
        if (url) location.href = url;
      }}
    />
  );
}
