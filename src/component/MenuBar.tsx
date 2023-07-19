import classNames from 'classnames';
import { SVGAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUpAndDownIcon, DashboardIcon, SyncIcon } from '.';
import { ptBR } from '../languages';
import { MENU_BAR_HEIGHT } from '../utils';

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
    path: 'registers',
    name: ptBR.registers,
    icon: (props: SVGAttributes<SVGElement>) => (
      <ArrowUpAndDownIcon
        {...props}
        viewBox="-6 -6 36 36"
      />
    ),
  },
] as const;

export function MenuBar() {
  const height = `h-[${MENU_BAR_HEIGHT}rem]`;

  return (
    <footer
      className={classNames(
        'z-2 fixed bottom-0 w-full bg-cerulean-100 py-2 shadow shadow-cerulean-950',
        height
      )}>
      <nav className="flex w-full justify-around">
        {options.map(({ path, name, icon }) => (
          <NavLink
            key={path}
            to={path}>
            {({ isActive }) => {
              return (
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={classNames(
                      'text-xs font-semibold text-cerulean-900 transition-colors duration-300',
                      { 'opacity-40': !isActive }
                    )}>
                    {name}
                  </span>
                  <div
                    className={classNames(
                      'w-10 rounded-full fill-cerulean-900 stroke-cerulean-900 p-1 duration-300',
                      { 'bg-cerulean-200': isActive, 'opacity-40': !isActive }
                    )}>
                    {icon({})}
                  </div>
                </div>
              );
            }}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
}
