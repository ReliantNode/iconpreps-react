import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { breakpoints, palette } from 'utils/designTokens';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-size: 1.5rem;
  line-height: 2.2rem;
  background: ${palette.background};
  color: ${palette.black};
`;

const Content = styled.main`
  flex: 1;
  width: 100%;
  max-width: ${breakpoints.desktop}px;
  margin: 0 auto;
  padding: 50px 0;
`;

function Layout({ children }) {
  return (
    <Container>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
