import { useQuery } from '@tanstack/react-query';
import { ptBR } from '../languages';
import { AuthService } from '../service';
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
      onClick={() => {
        if (url) location.href = url;
      }}
      icon={
        <GoogleIcon
          viewBox="1.5 2 20 20"
          className="w-6 fill-cerulean-900"
        />
      }
      label={ptBR.loginWithGoogle}
      size="medium"
      importance="secondary"
      type="button"
    />
  );
}
