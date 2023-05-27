import { Link } from '@tanstack/router';
import { useState } from 'react';

const paths = ['/', '/dashboard', '/sync', '/config'] as const;
type path = (typeof paths)[number];

export function MenuBar() {
  const [active, setActive] = useState<path>(paths[0]);

  const handleChange = (newValue: path) => {
    setActive(newValue);
  };

  return (
    <footer className="bottom-0 fixed">
      <div className="flex h-16 w-full z-10 mt-2 mr-2 ">
        {paths.map(path => (
          <Link
            to={path}
            key={path}
            className={`${active === path ? 'text-green-600' : ''}`}>
            {path.substring(1)}
          </Link>
        ))}
      </div>
    </footer>
  );
}
