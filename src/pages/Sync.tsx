import { useState } from 'react';
import { Autocomplete, Button, DatePicker, GoogleIcon, Input, Page } from '../component';
import { ptBR } from '../languages';
import { AutocompleteOption } from '../models';

export default function SyncPage() {
  const options = [
    { key: 1, value: 'Abacaxi', disabled: false },
    { key: 2, value: 'Urucum', disabled: false },
    { key: 3, value: 'Ameixa', disabled: false },
  ];
  const [value, setValue] = useState<AutocompleteOption>(options[0]);
  return (
    <Page>
      <h1> {"Let's sync 🔄️"}</h1>
      <div
        className="flex flex-col gap-2 p-2"
        key="1">
        <Autocomplete
          value={value}
          onChange={({ key, value, ...rest }) => {
            if (key != null) {
              const newValue = options.find(opt => opt.key === key);
              newValue && setValue(newValue);
            } else if (value != null) {
              setValue({ ...rest, value, key: crypto.randomUUID() });
            }
          }}
          options={[
            { key: 1, value: 'Abacaxi', disabled: false },
            { key: 2, value: 'Urucum', disabled: false },
            { key: 3, value: 'Ameixa', disabled: false },
          ]}
          disabled
        />
        <Autocomplete
          value={value}
          onChange={({ key, value, ...rest }) => {
            if (key != null) {
              const newValue = options.find(opt => opt.key === key);
              newValue && setValue(newValue);
            } else if (value != null) {
              setValue({ ...rest, value, key: crypto.randomUUID() });
            }
          }}
          options={[
            { key: 1, value: 'Abacaxi', disabled: false },
            { key: 2, value: 'Urucum', disabled: false },
            { key: 3, value: 'Ameixa', disabled: false },
          ]}
        />
        <Input
          inputSize={'small'}
          placeholder="AAAAAAAAAAAAAAAAAAA"
        />
        <Input
          inputSize={'small'}
          placeholder="bbbbbbbbbbbbbbb"
          disabled
        />
        <Input inputSize={'medium'} />
        <Input
          inputSize={'medium'}
          value={'aaaaaaaaaaaaaa'}
          disabled
        />
        <Input inputSize={'large'} />
        <Input
          inputSize={'large'}
          value={'aaaaaaaaaaaaaa'}
          disabled
        />
        <DatePicker onChange={() => undefined} />
        <DatePicker
          onChange={() => undefined}
          placeholder="test"
          selected={undefined}
        />
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
              viewBox="1.5 2 20 20"
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
              viewBox="1.5 2 20 20"
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
              viewBox="1.5 2 20 20"
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
              viewBox="1.5 2 20 20"
            />
          }
          disabled
        />
        <Button
          label={ptBR.loginWithGoogle}
          size="medium"
          type="button"
          icon={
            <GoogleIcon
              className="w-6 stroke-none"
              viewBox="1.5 2 20 20"
            />
          }
        />
        <Button
          label={ptBR.loginWithGoogle}
          size="medium"
          type="button"
          icon={
            <GoogleIcon
              className="w-6 stroke-none"
              viewBox="1.5 2 20 20"
            />
          }
          disabled
        />
      </div>
    </Page>
  );
}
