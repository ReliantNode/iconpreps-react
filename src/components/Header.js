import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import logoIconPReps from 'assets/logo-icon-preps.png';
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
  width: 100%;
  max-width: ${breakpoints.desktop}px;
  margin: 0 auto;
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
      </Inner>
    </Container>
  );
}

export default Header;
