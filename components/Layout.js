import React from "react";
import Head from "next/head";

export default function Layout(props) {
  return (
    <div className="container">
      <Head>
        <title>Figures</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!props.noHeader && (
          <React.Fragment>
            <h1 className="title">{props.siteTitle}</h1>
            <p className="description">{props.siteDescription}</p>
          </React.Fragment>
        )}
        {props.children}
      </main>
      <footer>
        <p>Last updated at: {props.lastUpdated}</p>
      </footer>
    </div>
  );
}
