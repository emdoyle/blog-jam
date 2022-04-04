import React from "react";
import Head from "next/head";
import DarkMode from "./DarkMode";
import DarkToggle from "./DarkToggle";
import { BackHomeBar } from "./BackHomeBar";
import { SITE_TITLE, SITE_SUBTITLE } from "../utils/constants";
import { EmailForm } from "./EmailForm";

export default function Layout(props) {
  return (
    <div className="container">
      <Head>
        <title>{SITE_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack-subset.css"
        />
        <DarkMode />
      </Head>
      {props.titlePage ? (
        <main className="title-page-content">
          <h1 className="title">{SITE_TITLE}</h1>
          <p className="description">{SITE_SUBTITLE}</p>
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
        {props.emailForm && <EmailForm />}
        <div className="footer-items">
          <DarkToggle />
          <p>Last updated at: {props.lastUpdated}</p>
        </div>
      </footer>
    </div>
  );
}
