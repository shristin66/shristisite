import { createContext, useContext } from 'react';

export const ActiveSectionContext = createContext(null);

export const useActiveSection = () => {
  const context = useContext(ActiveSectionContext);
  if (context === null) {
    throw new Error('useActiveSection must be used within an ActiveSectionProvider');
  }
  return context;
};
