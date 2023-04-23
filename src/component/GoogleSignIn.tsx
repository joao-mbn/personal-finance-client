import { useEffect } from 'react';
import { AuthService } from '../service';

export function GoogleSignIn() {
  const { VITE_CLIENT_ID } = import.meta.env;

  function handleSignIn(response: google.accounts.id.CredentialResponse) {
    AuthService.authWithGoogle(response.credential);
  }

  function initializeAndRender(tries = 0) {
    const google = window.google;
    if (!google && tries < 10) {
      setTimeout(() => initializeAndRender(++tries), 300);
      return;
    }

    const { initialize, prompt, renderButton } = google.accounts.id;

    initialize({
      client_id: VITE_CLIENT_ID,
      callback: handleSignIn,
    });

    prompt();

    const buttonContainer = document.getElementById('buttonDiv');
    if (!buttonContainer) return;
    renderButton(buttonContainer, {
      type: 'icon',
      theme: 'outline',
      size: 'large',
      shape: 'circle',
      locale: 'pt-BR',
    });
  }

  useEffect(() => initializeAndRender, []);

  return <div id="buttonDiv" />;
}
