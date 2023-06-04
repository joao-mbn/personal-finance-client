import { GoogleSignIn, Logo, Page } from '../component';

export default function HomePage() {
  return (
    <Page className="bg-gradient-to-b from-cerulean-600 to-cerulean-200 to-80%">
      <div className="flex min-h-full flex-col items-center justify-center gap-4">
        <section className="-mt-10 mr-4 flex items-center justify-center">
          <Logo
            className="w-24 fill-white"
            viewBox="30 30 450 450"
          />
          <span className="text-5xl tracking-tight text-white">mari</span>
        </section>
        <GoogleSignIn />
      </div>
    </Page>
  );
}
