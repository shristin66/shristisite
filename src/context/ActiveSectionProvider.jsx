import { useMemo, useState } from 'react';
import { ActiveSectionContext } from './activeSection';

const ActiveSectionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('Home');
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);

  const value = useMemo(
    () => ({ activeSection, setActiveSection, timeOfLastClick, setTimeOfLastClick }),
    [activeSection, timeOfLastClick],
  );

  return <ActiveSectionContext.Provider value={value}>{children}</ActiveSectionContext.Provider>;
};

export default ActiveSectionProvider;
