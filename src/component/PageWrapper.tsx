import classNames from 'classnames';
import { useContext, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import AppContext from '../context';
import { useRect } from '../hooks';
import { MenuBar } from './MenuBar';

interface PageWrapperProps {
  isAtBase: boolean;
}

export function PageWrapper({ isAtBase }: PageWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRect(ref.current);
  const {
    viewportDimensions: { height: vh },
  } = useContext(AppContext);
  const willScroll = rect?.height && rect.height > vh - 64;

  return (
    <div className="h-full w-screen">
      <div
        ref={ref}
        className={classNames('h-full', {
          'pb-16': willScroll && !isAtBase,
          'h-screen': isAtBase,
        })}>
        <Outlet />
      </div>
      {!isAtBase && <MenuBar />}
    </div>
  );
}
