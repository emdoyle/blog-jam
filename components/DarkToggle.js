import { ThemeContext } from "./ThemeContext";
import React from "react";

export default function DarkToggle() {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);

  if (!colorMode) {
    return null;
  }

  const svgSource =
    colorMode === "light" ? "/moon_empty.svg" : "/moon_filled.svg";

  const toggleColorMode = () => {
    if (colorMode === "light") {
      setColorMode("dark");
    } else {
      setColorMode("light");
    }
  };

  return (
    <button className="dark-mode-button" onClick={toggleColorMode}>
      <img src={svgSource} height="16px" width="16px" alt="dark-mode" />
    </button>
  );
}
