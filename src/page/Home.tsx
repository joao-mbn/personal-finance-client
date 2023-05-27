import { useContext } from 'react';
import { GoogleSignIn } from '../component';
import AppContext from '../context';

export default function HomePage() {
  const { hasSession } = useContext(AppContext);

  return (
    <>
      <h1>Welcome home 🏠</h1>
      <h2>{hasSession && "You're already logged-in"}</h2>
      <GoogleSignIn />
    </>
  );
}
