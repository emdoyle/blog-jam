import React from "react";
import { ThemeContext, ThemeProvider } from "../components/ThemeContext";
import "../styles/main.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <ThemeContext.Consumer>
        {({ colorMode: theme }) => (
          <>
            <ToastContainer
              position="bottom-left"
              theme={theme === "light" ? "dark" : "light"} // inverted intentionally
            />
          </>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
