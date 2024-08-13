import React from "react";
import MenuBar from "../components/MenuBar";
import Head from "next/head";
import { Container, Header, Segment } from "semantic-ui-react";
import HeaderComponent from "../components/header-component";
import web3 from "web3";

const Index = () => {
  const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new web3(window.ethereum);
      return true;
    } else if (window.web3) {
      window.web3 = new web3(window.web3.currentProvider);
      return true;
    }
    return false;
  };

  try {
    ethEnabled();
  } catch (error) {}

  return (
    <>
      <Head>
        <title>Home | Blockchain-Integrated EMR System</title>
      </Head>
      <MenuBar />
      <HeaderComponent />
      <Container style={{ paddingTop: "50px", paddingBottom: "40px" }}>
        <div
          style={{
            width: "100%",
            paddingTop: "20px",
            paddingBottom: "40px",
            fontSize: "34px",
            fontWeight: "bold",
          }}
        >
          <p>Technologies Used</p>
        </div>
        <div className="ui two column grid">
          <div className="column">
            <div
              style={{
                padding: "5px",
                fontSize: "20px",
              }}
            >
              Next.js
            </div>
            <div
              className="ui segment"
              style={{
                display: "flex",
                height: "300px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={"/images/nextjs.png"}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
          <div className="column">
            <div
              style={{
                padding: "5px",
                fontSize: "20px",
              }}
            >
              Hardhat
            </div>
            <div
              className="ui segment"
              style={{
                display: "flex",
                height: "300px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={"/images/hardhat.png"}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
          <div className="column">
            <div
              style={{
                padding: "5px",
                fontSize: "20px",
              }}
            >
              Ethers.js
            </div>
            <div
              className="ui segment"
              style={{
                display: "flex",
                height: "300px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={"/images/ethers.jpeg"}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
          <div className="column">
            <div
              style={{
                padding: "5px",
                fontSize: "20px",
              }}
            >
              Ethereum
            </div>
            <div
              className="ui segment"
              style={{
                display: "flex",
                height: "300px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={"/images/ethereum.jpeg"}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </Container>
      <footer
        style={{
          padding: "2%",
          background: "gray",
        }}
      >
        <Container>
          <p
            style={{
              color: "white",
            }}
          >
            Blockchain-Integrated EMR System
          </p>
        </Container>
      </footer>
    </>
  );
};

export default Index;
