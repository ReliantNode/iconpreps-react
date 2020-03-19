import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Auth from 'components/Auth';
import PReps from 'components/PReps';
import Projects from 'components/Projects';
import Router from 'components/Router';
import { breakpoints } from 'utils/designTokens';

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

  /* Responsive utilities */
  .sm-show,
  .md-show,
  .lg-show {
    display: none !important;
  }
  @media screen and (min-width: ${breakpoints.min.sm}) {
    .sm-show { display: inherit !important; }
    .sm-hide { display: none !important; }
  }
  @media screen and (min-width: ${breakpoints.min.md}) {
    .md-show { display: inherit !important; }
    .md-hide { display: none !important; }
  }
  @media screen and (min-width: ${breakpoints.min.lg}) {
    .lg-show { display: inherit !important; }
    .lg-hide { display: none !important; }
  }
`;

function App() {
  return (
    <PReps>
      <Projects>
        <Auth>
          <GlobalStyle />
          <Router />
        </Auth>
      </Projects>
    </PReps>
  );
}

export default App;
