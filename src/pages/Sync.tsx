import { Button, DatePicker, GoogleIcon, Page } from '../component';
import { ptBR } from '../languages';

export default function SyncPage() {
  return (
    <Page>
      <h1> {"Let's sync 🔄️"}</h1>
      <div
        className="flex flex-col gap-2 p-2"
        key="1">
        <DatePicker onChange={() => undefined} />
        <DatePicker
          onChange={() => undefined}
          disabled
        />
        <Button
          importance="primary"
          label={ptBR.loginWithGoogle}
          size="medium"
          type="button"
          icon={
            <GoogleIcon
              className="w-6 stroke-none"
              viewBox="1.5 3 20 20"
            />
          }
        />
        <Button
          importance="primary"
          label={ptBR.loginWithGoogle}
          size="medium"
          type="button"
          icon={
            <GoogleIcon
              className="w-6 stroke-none"
              viewBox="1.5 3 20 20"
            />
          }
          disabled
        />
        <Button
          importance="secondary"
          label={ptBR.loginWithGoogle}
          size="medium"
          type="button"
          icon={
            <GoogleIcon
              className="w-6 stroke-none"
              viewBox="1.5 3 20 20"
            />
          }
        />
        <Button
          importance="secondary"
          label={ptBR.loginWithGoogle}
          size="medium"
          type="button"
          icon={
            <GoogleIcon
              className="w-6 stroke-none"
              viewBox="1.5 3 20 20"
            />
          }
          disabled
        />
        <Button
          importance="tertiary"
          label={ptBR.loginWithGoogle}
          size="medium"
          type="button"
          icon={
            <GoogleIcon
              className="w-6 stroke-none"
              viewBox="1.5 3 20 20"
            />
          }
        />
        <Button
          importance="tertiary"
          label={ptBR.loginWithGoogle}
          size="medium"
          type="button"
          icon={
            <GoogleIcon
              className="w-6 stroke-none"
              viewBox="1.5 3 20 20"
            />
          }
          disabled
        />
      </div>
    </Page>
  );
}
