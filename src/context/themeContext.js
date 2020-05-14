import React, {useContext, createContext} from 'react';

export const ThemeContext = createContext({});

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => {
  return useContext(ThemeContext);
};
