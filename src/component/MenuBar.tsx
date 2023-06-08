import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Logo } from '.';

const paths = ['dashboard', 'sync', 'config'] as const;

export function MenuBar() {
  return (
    <footer className="fixed bottom-0 z-10 h-16 w-full bg-cerulean-100 pt-2">
      <nav className="flex w-full justify-around">
        {paths.map(path => (
          <NavLink
            to={path}
            key={path}
            className="flex w-1/3">
            {({ isActive }) => {
              return (
                <div className="flex flex-col items-center">
                  <span
                    className={classNames('text-xs', {
                      'text-cerulean-900': isActive,
                      'text-cerulean-200': !isActive,
                    })}>
                    {path.charAt(0).toLocaleUpperCase() + path.substring(1)}
                  </span>
                  <Logo
                    className={classNames('flex w-1/3 justify-center', {
                      'fill-cerulean-900': isActive,
                      'fill-cerulean-200': !isActive,
                    })}
                    viewBox="-100 -50 650 650"
                  />
                </div>
              );
            }}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
}
