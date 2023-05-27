import { NavLink } from 'react-router-dom';

const paths = ['home', 'dashboard', 'sync', 'config'] as const;
type path = (typeof paths)[number];

export function MenuBar() {
  return (
    <footer className="w-full flex justify-around h-16 z-10 bottom-0 fixed mt-2 pr-4">
      {paths.map(path => (
        <NavLink
          to={path}
          key={path}
          className={({ isActive }) =>
            `flex justify-center w-[25%] ${isActive ? 'text-green-600' : ''}`
          }>
          {path.charAt(0).toLocaleUpperCase() + path.substring(1)}
        </NavLink>
      ))}
    </footer>
  );
}
