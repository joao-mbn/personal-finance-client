import { createContext } from 'react';

interface ChartWrapperContextProps {
  dimensions: { height: number; width: number };
}

export const ChartWrapperContext = createContext<ChartWrapperContextProps>({
  dimensions: { height: 0, width: 0 },
});
