// pages/_app.js
// import "../styles/globals.css";
import {useEffect, useState} from "react";

export default function MyApp({Component, pageProps}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        return () => {
            setIsClient(false);
        }
    }, []);

    return isClient ? <Component  {...pageProps}/> : null;
}