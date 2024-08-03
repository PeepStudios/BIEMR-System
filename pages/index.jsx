import React from 'react';
import MenuBar from "../components/MenuBar";
import Head from "next/head";
import {Header} from "semantic-ui-react";
import HeaderComponent from "../components/header-component";

const Index = () => {
    return (
        <>
            <Head>
                <title>Home | Blockchain-Integrated EMR System</title>
            </Head>
            <MenuBar/>
            <HeaderComponent />
        </>
    );
};

export default Index;