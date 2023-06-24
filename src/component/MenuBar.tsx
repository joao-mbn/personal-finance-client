import classNames from 'classnames';
import { SVGAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, GearIcon, SyncIcon } from '.';
import { ptBR } from '../languages';
import { MENU_BAR_HEIGHT } from '../utils';

export function MenuBar() {
  const options = [
    {
      path: 'dashboard',
      name: ptBR.dashboard,
      icon: (props: SVGAttributes<SVGElement>) => (
        <DashboardIcon
          viewBox="-8 -8 40 40"
          {...props}
        />
      ),
    },
    {
      path: 'sync',
      name: ptBR.sync,
      icon: (props: SVGAttributes<SVGElement>) => (
        <SyncIcon
          {...props}
          viewBox="-6 -6 28 28"
        />
      ),
    },
    {
      path: 'config',
      name: ptBR.configuration,
      icon: (props: SVGAttributes<SVGElement>) => (
        <GearIcon
          {...props}
          viewBox="-4 -4 32 32"
        />
      ),
    },
  ] as const;

  const height = `h-[${MENU_BAR_HEIGHT}rem]`;

  return (
    <footer className={classNames('z-2 fixed bottom-0 w-full bg-slate-200 py-2', height)}>
      <nav className="flex w-full justify-around">
        {options.map(({ path, name, icon }) => (
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
                    {name}
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
