import classNames from 'classnames';
import { SVGAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, GearIcon, SyncIcon } from '.';

export function MenuBar() {
  const options = [
    {
      path: 'dashboard',
      icon: (props: SVGAttributes<SVGElement>) => (
        <DashboardIcon
          viewBox="-8 -8 40 40"
          {...props}
        />
      ),
    },
    {
      path: 'sync',
      icon: (props: SVGAttributes<SVGElement>) => (
        <SyncIcon
          {...props}
          viewBox="-6 -6 28 28"
        />
      ),
    },
    {
      path: 'config',
      icon: (props: SVGAttributes<SVGElement>) => (
        <GearIcon
          {...props}
          viewBox="-5 -4 32 32"
        />
      ),
    },
  ] as const;

  return (
    <footer className="z-2 fixed bottom-0 h-16 w-full bg-slate-200 py-2">
      <nav className="flex w-full justify-around">
        {options.map(({ path, icon }) => (
          <NavLink
            to={path}
            key={path}
            className="flex w-1/3">
            {({ isActive }) => {
              return (
                <div className="flex w-full flex-col items-center">
                  <span
                    className={classNames('text-xs', {
                      'font-semibold text-slate-700': isActive,
                      'text-slate-500': !isActive,
                    })}>
                    {path.charAt(0).toLocaleUpperCase() + path.substring(1)}
                  </span>
                  {icon({
                    className: classNames('w-8', {
                      'fill-slate-700': isActive,
                      'fill-slate-500': !isActive,
                    }),
                  })}
                </div>
              );
            }}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
}
