import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import logoIconPReps from 'assets/logo-icon-preps.png';
import Navigation from 'components/Navigation';
import { breakpoints, palette } from 'utils/designTokens';

const Container = styled.header`
  height: 7rem;
  background: ${palette.brand.primary};
  color: ${palette.white};
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7rem;
  margin: 0 2rem;

  @media screen and (min-width: ${breakpoints.xl}) {
    width: 100%;
    max-width: ${breakpoints.xl};
    margin: 0 auto;
  }
`;

const Logo = styled.img`
  width: auto;
  height: 3.5rem;
`;

function Header() {
  return (
    <Container>
      <Inner>
        <Link to="/" style={{ display: 'inline-flex' }}>
          <Logo src={logoIconPReps} alt="ICON P-Reps logo" />
        </Link>
        <Navigation />
      </Inner>
    </Container>
  );
}

export default Header;
