import React from "react";
import { ThemeProvider } from "../components/ThemeContext";
import "../styles/main.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
