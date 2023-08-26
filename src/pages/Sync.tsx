import { useEffect, useRef, useState } from 'react';
import { Page } from '../component';
import Toaster, { ToasterRef } from '../component/Base/Toaster';

export default function SyncPage() {
  const [ref1, setRef1] = useState<ToasterRef>(null);
  const [ref2, setRef2] = useState<ToasterRef>(null);
  const [ref3, setRef3] = useState<ToasterRef>(null);
  const hasInvoked = useRef(false);

  useEffect(() => {
    if (ref1 && ref2 && ref3 && !hasInvoked.current) {
      hasInvoked.current = true;
      ref1?.invoke();
      ref2?.invoke();
      ref3?.invoke();
    }
  }, [ref1, ref2, ref3, hasInvoked]);

  return (
    <Page>
      <Toaster
        className="top-0 !translate-y-5"
        duration={5000}
        ref={setRef1}
        title={'A title'}
        type="error">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </Toaster>
      <Toaster
        className="top-0 !translate-y-40"
        duration={5000}
        ref={setRef2}
        title={'A title'}
        type="info">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </Toaster>
      <Toaster
        className="top-0 !translate-y-80"
        duration={5000}
        ref={setRef3}
        title={'A title'}
        type="success">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </Toaster>
    </Page>
  );
}
