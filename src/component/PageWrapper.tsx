import classNames from 'classnames';
import { useContext, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { AppContext } from '../contexts';
import { useRect } from '../hooks';
import { MENU_BAR_HEIGHT, REM_PX_RATIO } from '../utils';
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
  const willScroll = rect?.height && rect.height > vh - MENU_BAR_HEIGHT * REM_PX_RATIO;

  return (
    <div className="h-full w-screen">
      <div
        ref={ref}
        className={classNames('h-full bg-cerulean-50', {
          'pb-20': willScroll && !isAtBase,
          'h-screen': isAtBase,
        })}>
        <Outlet />
      </div>
      {!isAtBase && <MenuBar />}
    </div>
  );
}
