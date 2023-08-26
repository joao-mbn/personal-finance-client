import { Button, Page } from '../component';
import { useToaster } from '../hooks/useToaster';

export default function SyncPage() {
  const { Toaster, invoke } = useToaster();

  return (
    <Page>
      <div>
        <Button
          importance="primary"
          label="Click me!"
          onClick={() =>
            invoke({
              title: 'A Title',
              message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
              type: 'error',
            })
          }
        />
        {Toaster}
      </div>
    </Page>
  );
}
