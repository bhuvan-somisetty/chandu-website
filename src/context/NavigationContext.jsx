import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const navigate = useNavigate();
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const navigateWithHeart = (path) => {
    setShowHeartBurst(true);
    setTimeout(() => {
      setShowHeartBurst(false);
      navigate(path);
    }, 800);
  };

  const triggerBurst = () => {
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 1000);
  };

  return (
    <NavigationContext.Provider value={{ navigateWithHeart, triggerBurst, showHeartBurst }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useHeartNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useHeartNavigation must be used within a NavigationProvider');
  }
  return context;
}
