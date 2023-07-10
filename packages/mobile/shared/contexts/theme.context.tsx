import React, { createContext, useContext } from 'react';

import { themes } from '../themes';

type ThemeContextValue = {
  theme: typeof themes.dark;
};

const ThemeContext = createContext({} as ThemeContextValue);

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = {
    theme: themes.dark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
