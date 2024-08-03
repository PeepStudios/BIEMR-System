// pages/_app.js
import React, { useState, useEffect } from 'react'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const timerId = setTimeout(() => {
            setIsLoading(false)
        }, 5000);

        return () => {
            setIsClient(false);
            clearTimeout(timerId);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Blockchain-Integrated EMR System</title>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"></link>
            </Head>

            {isLoading ? (
                <div className="ui" style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "90vh",
                }}>
                    <div className="ui active inverted dimmer">
                        <div className="ui large text loader"></div>
                    </div>
                </div>
            ) : <Component {...pageProps} />}
        </>
    );
}

export default MyApp;