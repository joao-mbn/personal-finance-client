import { useEffect, useRef, useState } from 'react';
import { Page } from '../component';
import Toaster, { ToasterRef } from '../component/Base/Toaster';

export default function SyncPage() {
  const [ref, setRef] = useState<ToasterRef>(null);
  const [translation, setTranslation] = useState<string>('');
  const hasInvoked = useRef(false);

  useEffect(() => {
    if (ref && !hasInvoked.current) {
      hasInvoked.current = true;
      ref?.invoke();
    }
  }, [ref, hasInvoked]);

  return (
    <Page>
      <Toaster
        duration={5000}
        header={'A title'}
        ref={setRef}></Toaster>
    </Page>
  );
}
