import React from 'react';
import { Header, Link, Logo, Main } from './App.styles';
import logo from './logo.svg';

function App() {
  return (
    <Main>
      <Header>
        <Logo src={logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </Link>
      </Header>
    </Main>
  );
}

export default App;
