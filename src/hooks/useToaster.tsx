import { useEffect, useState } from 'react';
import { Toaster, ToasterProps, ToasterRef } from '../component';

export function useToaster() {
  const [_ref, setRef] = useState<ToasterRef>(null);
  const [toasterProps, setToasterProps] = useState<ToasterProps>({
    message: '',
    title: '',
  });

  const invoke = (props: ToasterProps) => setToasterProps(props);

  useEffect(() => {
    !!toasterProps.message && _ref?.invoke();
  }, [toasterProps, _ref]);

  const _Toaster = (
    <Toaster
      {...toasterProps}
      ref={setRef}
    />
  );

  return {
    Toaster: toasterProps.message ? _Toaster : null,
    invoke,
  };
}
