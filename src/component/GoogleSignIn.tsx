import { useQuery } from '@tanstack/react-query';
import { AuthService } from '../service';

export function GoogleSignIn() {
  const { data: url } = useQuery({
    queryKey: ['url'],
    queryFn: AuthService.getGoogleConsentUrl,
    suspense: false,
  });

  return (
    <div className="bg-white">
      <a href={url ?? ''}>Login with google</a>
    </div>
  );
}
