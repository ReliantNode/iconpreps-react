import React from 'react';
import { createGlobalStyle } from 'styled-components';
import PReps from 'components/PReps';
import Projects from 'components/Projects';
import Router from 'components/Router';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%; /* reset base font size to 10px */
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: 'Muli', sans-serif;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 2.2rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img {
    width: auto;
    height: auto;
    max-width: 100%;
  }
`;

function App() {
  return (
    <PReps>
      <Projects>
        <GlobalStyle />
        <Router />
      </Projects>
    </PReps>
  );
}

export default App;
