import React from 'react';
import {Container, Header, Icon, Segment} from 'semantic-ui-react';
import Head from 'next/head';
import MenuBar from './MenuBar';
import HeaderComponent from "./header-component";

//Layout properly the Header at the top of every page and then the content come afterwards

export default props => {
    return (
        <div style={{ fontFamily: "sans-serif" }}>
            <Head>
                <title>Blockchain-Integrated EMR System</title>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"></link>
            </Head>

            <MenuBar/>
            <HeaderComponent />
            <Container style={{ paddingTop: '5%', paddingBottom: '5%' }}>
                {props.children}
            </Container>
        </div>
    );
};