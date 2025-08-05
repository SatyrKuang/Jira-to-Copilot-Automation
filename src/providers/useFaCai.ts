import { useContext } from 'react';
import { FaCaiContext } from './FaCaiContext';
import type { FaCaiContextType } from './FaCaiContext';

// Custom hook to use the FaCai context
export function useFaCai(): FaCaiContextType {
  const context = useContext(FaCaiContext);
  if (context === undefined) {
    throw new Error('useFaCai must be used within a FaCaiProvider');
  }
  return context;
}