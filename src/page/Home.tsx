import { GoogleSignIn, Logo, Page } from '../component';

export default function HomePage() {
  return (
    <Page className="items-center justify-center bg-gradient-to-b from-cerulean-600 to-cerulean-200 to-80%">
      <Logo />
      <GoogleSignIn />
    </Page>
  );
}
