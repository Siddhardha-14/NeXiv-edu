import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext({
  screen: 'home',
  navigate: () => {},
  goBack: () => {},
  params: {},
});

export function NavigationProvider({ children }) {
  const [screen, setScreen] = useState('home');
  const [history, setHistory] = useState(['home']);
  const [params, setParams] = useState({});

  const navigate = (newScreen, newParams = {}) => {
    setHistory(prev => [...prev, newScreen]);
    setScreen(newScreen);
    setParams(newParams);
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goBack = () => {
    setHistory(prev => {
      if (prev.length <= 1) return prev;
      const updated = prev.slice(0, -1);
      setScreen(updated[updated.length - 1]);
      setParams({});
      return updated;
    });
  };

  return (
    <NavigationContext.Provider value={{ screen, navigate, goBack, params }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
