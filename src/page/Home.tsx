import { GoogleSignIn, Logo, Page } from '../component';

export default function HomePage() {
  return (
    <Page className="bg-gradient-to-b from-cerulean-600 to-cerulean-200 to-80%">
      <div className="flex min-h-full flex-col items-center justify-center gap-4">
        <Logo />
        <GoogleSignIn />
      </div>
    </Page>
  );
}
