import { createContext, useContext } from 'react';
import { contextIsNotNull } from '../utils';

interface ChartWrapperContextProps {
  dimensions: { height: number; width: number };
}

export const ChartWrapperContext = createContext<ChartWrapperContextProps | null>(null);

export function useChartWrapperContext() {
  const context = useContext(ChartWrapperContext);
  return contextIsNotNull(context);
}
