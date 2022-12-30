import React, { createContext, useState, useEffect } from "react";

interface ToggleDarkModeInterface {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
interface Props {
  children: React.ReactNode;
}

export const ToggleDarkMode = createContext({} as ToggleDarkModeInterface);

const initialState: ToggleDarkModeInterface = {
  darkMode: false,
  toggleDarkMode: () => {},
};

const ToggleDarkModeProvider: React.FC<Props> = ({ children }) => {
  const [darkMode, toggleDarkMode] = useState(initialState.darkMode);

  const toggle = () => {
    toggleDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode")
      ? localStorage.getItem("darkMode") === "true"
      : false;
    toggleDarkMode(darkMode);
  }, []);

  return (
    <ToggleDarkMode.Provider
      value={{
        darkMode,
        toggleDarkMode: toggle,
      }}
    >
      {children}
    </ToggleDarkMode.Provider>
  );
};

export default ToggleDarkModeProvider;
