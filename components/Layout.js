import React from "react";
import Head from "next/head";
import DarkMode from "./DarkMode";
import DarkToggle from "./DarkToggle";
import { BackHomeBar } from "./BackHomeBar";

export default function Layout(props) {
  return (
    <div className="container">
      <Head>
        <title>Figures</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack-subset.css"
        />
        <DarkMode />
      </Head>
      {props.titlePage ? (
        <main className="title-page-content">
          <h1 className="title">{props.siteTitle}</h1>
          <p className="description">{props.siteDescription}</p>
          {props.children}
        </main>
      ) : (
        <>
          <BackHomeBar />
          <hr />
          <main>{props.children}</main>
        </>
      )}
      <hr />
      <footer>
        <div className="footer-item">
          <DarkToggle />
        </div>
        <p className="footer-item">Last updated at: {props.lastUpdated}</p>
      </footer>
    </div>
  );
}
