import { useEffect, useState } from 'react';

/**
 * @param element The {@link Element} to be checked against.
 * @returns whether the {@link element} was clicked or not.
 */
export const useClickPath = (element: Element | null) => {
  const [isInPath, setIsInPath] = useState(false);

  const getPath = (event: MouseEvent) => {
    if (!element) return setIsInPath(false);

    const path = event.composedPath();
    const _isInPath = path.includes(element);

    setIsInPath(_isInPath);
  };

  useEffect(() => {
    window.addEventListener('click', getPath);

    return () => window.removeEventListener('click', getPath);
  }, [element]);

  return isInPath;
};
