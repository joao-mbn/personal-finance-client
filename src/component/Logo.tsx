import { LogoIcon } from '.';

export function Logo() {
  return (
    <div className="-mt-10 mr-4 flex items-center justify-center">
      <LogoIcon
        className="w-24 fill-white"
        viewBox="30 30 450 450"
      />
      <span className="text-5xl tracking-tight text-white">mari</span>
    </div>
  );
}
