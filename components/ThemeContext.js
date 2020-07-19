import React from "react";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  // TODO: resolve duplication of COLORS
  const COLORS = {
    light: {
      text: "#333",
      background: "#fff",
    },
    dark: {
      text: "#999",
      background: "#1a1919",
    },
  };
  const [colorMode, rawSetColorMode] = React.useState(undefined);

  React.useEffect(() => {
    const root = window.document.documentElement;

    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );

    rawSetColorMode(initialColorValue);
  }, []);

  const setColorMode = (value) => {
    const root = window.document.documentElement;
    rawSetColorMode(value);
    localStorage.setItem("color-mode", value);
    root.style.setProperty(
      "--color-text",
      value === "light" ? COLORS.light.text : COLORS.dark.text
    );

    root.style.setProperty(
      "--color-background",
      value === "light" ? COLORS.light.background : COLORS.dark.background
    );
  };

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
