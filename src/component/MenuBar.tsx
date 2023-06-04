import { NavLink } from 'react-router-dom';

const paths = ['dashboard', 'sync', 'config'] as const;

export function MenuBar() {
  return (
    <footer className="fixed  bottom-0 z-10 mt-2 h-16 w-full pr-4">
      <nav className="flex justify-around">
        {paths.map(path => (
          <NavLink
            to={path}
            key={path}
            className={({ isActive }) =>
              `flex w-1/3 justify-center ${isActive ? 'text-green-600' : ''}`
            }>
            {path.charAt(0).toLocaleUpperCase() + path.substring(1)}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
}
