import { ThemeContext } from "./ThemeContext";
import React from "react";

export default function DarkToggle() {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);

  if (!colorMode) {
    return null;
  }

  const isDarkMode = colorMode === "dark";
  const svgSource = isDarkMode ? "/sun.svg" : "/moon_filled.svg";

  const toggleColorMode = (event) => {
    if (event.target.checked) {
      setColorMode("dark");
    } else {
      setColorMode("light");
    }
  };

  return (
    <label className="dark-mode-button">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={toggleColorMode}
        hidden
      />
      <img src={svgSource} height="16px" width="16px" alt="dark-mode" />
    </label>
  );
}
