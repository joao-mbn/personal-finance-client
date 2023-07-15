import { QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { Page } from '../component';
import { Registry } from '../models';
import { RegistryService } from '../services';

export function registriesLoader(queryClient: QueryClient) {
  return queryClient.fetchQuery({ queryKey: ['all'], queryFn: RegistryService.getAll });
}

export default function RegistriesPage() {
  const registries = useLoaderData() as Registry[];

  console.log(registries);

  return (
    <Page title="Let's config ⚙️">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam sed quisquam ducimus nam
      cupiditate suscipit illum neque omnis hic totam! Sint similique nemo alias! Quo magnam
      obcaecati fugit quaerat quidem!
    </Page>
  );
}
