import classNames from 'classnames';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../contexts';
import { useRect } from '../hooks';
import { MENU_BAR_HEIGHT, REM_PX_RATIO } from '../utils';
import { MenuBar } from './MenuBar';

interface PageWrapperProps {
  isAtBase: boolean;
}

export function PageWrapper({ isAtBase }: PageWrapperProps) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const rect = useRect(ref);
  const {
    viewport: { vh },
  } = useAppContext();

  const willScroll = rect?.height && rect.height > vh - MENU_BAR_HEIGHT * REM_PX_RATIO;

  return (
    <div className={classNames('h-full w-screen')}>
      <div
        ref={setRef}
        className={classNames('h-full bg-hoki-50', {
          'pb-20': willScroll && !isAtBase,
          'h-screen': isAtBase,
        })}>
        <Outlet />
      </div>
      {!isAtBase && <MenuBar />}
    </div>
  );
}
