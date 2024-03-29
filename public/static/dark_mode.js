/*
 * Taken from the awesome article by Josh Comeau here: https://joshwcomeau.com/gatsby/dark-mode/
 * */
(function () {
  const COLORS = {
    light: {
      text: "#333",
      background: "#fff",
    },
    dark: {
      text: "#bbbbbb",
      background: "#1a1919",
    },
  };
  function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem("color-mode");
    const hasPersistedPreference = typeof persistedColorPreference === "string";
    // If the user has explicitly chosen light or dark,
    // let's use it. Otherwise, this value will be null.
    if (hasPersistedPreference) {
      return persistedColorPreference;
    }
    // If they haven't been explicit, let's check the media
    // query
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof mql.matches === "boolean";
    if (hasMediaQueryPreference) {
      return mql.matches ? "dark" : "light";
    }
    // If they are using a browser/OS that doesn't support
    // color themes, let's default to 'light'.
    return "light";
  }

  const colorMode = getInitialColorMode();

  const root = document.documentElement;

  root.style.setProperty(
    "--color-text",
    colorMode === "light" ? COLORS.light.text : COLORS.dark.text
  );

  root.style.setProperty(
    "--color-background",
    colorMode === "light" ? COLORS.light.background : COLORS.dark.background
  );

  root.style.setProperty("--initial-color-mode", colorMode);
})();
