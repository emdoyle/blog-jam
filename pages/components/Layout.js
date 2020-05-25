import React from 'react';
import Head from "next/head";

export default function Layout(props) {
    return (
        <div className="container">
            <Head>
                <title>Figures</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                { props.children }
            </main>
            <footer>
                <p>Last updated at: { props.lastUpdated }</p>
            </footer>
            <style jsx>{`
                .container {
                  min-height: 100vh;
                  padding: 0 0.5rem;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                }
                
                main {
                  padding: 5rem 0;
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                }
                
                footer {
                  width: 100%;
                  height: 100px;
                  border-top: 1px solid #eaeaea;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                
                footer img {
                  margin-left: 0.5rem;
                }
                
                footer a {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                
                a {
                  color: inherit;
                  text-decoration: none;
                }
                
                .title a {
                  color: #0070f3;
                  text-decoration: none;
                }
                
                .title a:hover,
                .title a:focus,
                .title a:active {
                  text-decoration: underline;
                }
                
                .title {
                  margin: 0;
                  line-height: 1.15;
                  font-size: 4rem;
                }
                
                .title,
                .description {
                  text-align: center;
                }
                
                .description {
                  line-height: 1.5;
                  font-size: 1.5rem;
                }
                
                code {
                  background: #fafafa;
                  border-radius: 5px;
                  padding: 0.75rem;
                  font-size: 1.1rem;
                  font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
                }
                
                .logo {
                  height: 1em;
                }
                
                @media (max-width: 600px) {
                  .grid {
                    width: 100%;
                    flex-direction: column;
                  }
                }
            `}</style>
    </div>
)}
