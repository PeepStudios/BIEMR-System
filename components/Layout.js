import React from 'react';
import {Container, Header, Icon, Segment} from 'semantic-ui-react';
import Head from 'next/head';
import MenuBar from './MenuBar';
import HeaderComponent from "./header-component";

//Layout properly the Header at the top of every page and then the content come afterwards

export default props => {
    return (
        <div style={{ fontFamily: "sans-serif" }}>

            <MenuBar/>
            <HeaderComponent />
            <Container style={{ paddingTop: '5%', paddingBottom: '5%' }}>
                {props.children}
            </Container>
            <footer style={{
                padding: "2%",
                background: "gray",
            }}>
                <Container>
                    <p style={{
                        color: 'white',
                    }}>Blockchain Integrated EMR System.</p>
                </Container>
            </footer>
        </div>
    );
};