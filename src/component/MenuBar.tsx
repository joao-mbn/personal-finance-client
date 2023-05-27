import { NavLink } from 'react-router-dom';

const paths = ['dashboard', 'sync', 'config'] as const;

export function MenuBar() {
  return (
    <footer className="w-full  h-16 z-10 bottom-0 fixed mt-2 pr-4">
      <nav className="flex justify-around">
        {paths.map(path => (
          <NavLink
            to={path}
            key={path}
            className={({ isActive }) =>
              `flex justify-center w-1/3 ${isActive ? 'text-green-600' : ''}`
            }>
            {path.charAt(0).toLocaleUpperCase() + path.substring(1)}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
}
