import React from 'react';
import { createGlobalStyle } from 'styled-components';
import PReps from 'components/PReps';
import Router from 'components/Router';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%; /* reset base font size to 10px */
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
      'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1.5rem;
    line-height: 2.2rem;
  }

  img {
    width: auto;
    max-width: 100%;
  }
`;

function App() {
  return (
    <PReps>
      <GlobalStyle />
      <Router />
    </PReps>
  );
}

export default App;
