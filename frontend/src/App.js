import React from 'react';
import DroneState from '../src/components/DroneState';
import Commands from '../src/components/Commands';

import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: white;
    /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
    font-family: 'Operator Mono', monospace;
    font-weight: 900;
    font-size: 1rem;
    background:#fff;
    color: white;
  }
  * {
    font-family: 'Operator Mono', monospace;
    box-sizing: border-box;
  }
  h2 {
    text-align: center;
    font-style: italic;
    color: black
  }
`;

const PageStyles = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const IndexPage = () => (
  <PageStyles>
    <h2>Tello Controller</h2>
    <GlobalStyle />
    <Commands />
    <DroneState />
  </PageStyles>
);

export default IndexPage;